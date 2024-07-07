import React, { useCallback, useMemo, useRef } from 'react';
import { View, StyleSheet, Platform, StyleProp, ViewStyle, Animated } from 'react-native';
import { Gesture, GestureDetector, GestureTouchEvent } from 'react-native-gesture-handler';
import { COLORS } from '../theme';

export interface IJoystickEvent {
  position: {
    x: number;
    y: number;
  };
  angle:number;
  type: 'move' | 'start' | 'stop';
}

interface JoystickProps {
  onStart?: (event: IJoystickEvent) => void;
  onMove?: (event: IJoystickEvent) => void;
  onStop?: (event: IJoystickEvent) => void;
  color?: string;
  radius?: number;
  style?: StyleProp<ViewStyle>;
  isFixedX?:boolean;
  isFixedY?:boolean;
}

const Joystick: React.FC<JoystickProps> = ({
  onStart,
  onMove,
  onStop,
  color = COLORS.yellow,
  radius = 60,
  style,
  isFixedX,
  isFixedY
}) => {
  const wrapperRadius = radius;
  const nippleRadius = wrapperRadius / 2.7;

  const position = useRef(new Animated.ValueXY({ x: wrapperRadius - nippleRadius, y: wrapperRadius - nippleRadius })).current;

  const handleTouchMove = useCallback(
    (event: GestureTouchEvent) => {
      const e = event.changedTouches[0];
      const fingerX = e.x;
      const fingerY = Platform.OS === 'web' ? wrapperRadius * 2 - e.y : e.y;
      let coordinates = {
        x: fingerX - nippleRadius,
        y: fingerY - nippleRadius,
      };

      const angle = Math.atan2(fingerY - wrapperRadius, fingerX - wrapperRadius);
      let dist = Math.sqrt((fingerX - wrapperRadius) ** 2 + (fingerY - wrapperRadius) ** 2);

      dist = Math.min(dist, wrapperRadius);

      if (dist === wrapperRadius) {
        coordinates = {
          x: wrapperRadius + dist * Math.cos(angle) - nippleRadius,
          y: wrapperRadius + dist * Math.sin(angle) - nippleRadius,
        };
      }

      // Clamp coordinates within the circle
      coordinates.x = Math.max(0, Math.min(coordinates.x, wrapperRadius * 2 - nippleRadius * 2));
      coordinates.y = Math.max(0, Math.min(coordinates.y, wrapperRadius * 2 - nippleRadius * 2));

      position.setValue(coordinates);

      const mappedCoordinates = {
        x: 1000 + (coordinates.x / (wrapperRadius * 2 - nippleRadius * 2)) * 1000,
        y: 1000 + (coordinates.y / (wrapperRadius * 2 - nippleRadius * 2)) * 1000,
      };

      onMove &&
        onMove({
          position: mappedCoordinates,
          type: 'move',
          angle,
        });
    },
    [nippleRadius, onMove, position, wrapperRadius]
  );

  const handleTouchEnd = () => {
    // Only reset x position, keep y position where it ended
    Animated.spring(position, {
      toValue: { 
        x: isFixedX ? position.x._value : wrapperRadius - nippleRadius, 
        y: isFixedY ? position.y._value : wrapperRadius - nippleRadius
      },
      useNativeDriver: true,
      speed:20,
    }).start();
    onStop &&
      onStop({
        position: {
          x: 1500, 
          y: 1500
        },
        type: 'stop',
        angle:0,
      });
  };

  const handleTouchStart = () => {
    onStart &&
      onStart({
        position: {
          x: 1000,
          y: 1000,
        },
        angle:0,
        type: 'start',
      });
  };

  const panGesture = Gesture.Pan().onStart(handleTouchStart).onEnd(handleTouchEnd).onTouchesMove(handleTouchMove);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        wrapper: {
          width: 2 * radius,
          height: 2 * radius,
          borderRadius: radius,
          borderWidth: 2,
          borderColor: '#fff',
          transform: [{ rotateX: '180deg' }],
          ...(style && typeof style === 'object' ? style : {}),
        },
        nipple: {
          height: 2 * nippleRadius,
          width: 2 * nippleRadius,
          borderRadius: nippleRadius,
          backgroundColor: color,
          position: 'absolute',
        },
      }),
    [radius, color, nippleRadius, style]
  );

  const animatedStyles = {
    transform: position.getTranslateTransform(),
  };

  return (
    <GestureDetector gesture={panGesture}>
      <View style={styles.wrapper}>
        <Animated.View pointerEvents="none" style={[styles.nipple, animatedStyles]} />
      </View>
    </GestureDetector>
  );
};

export default Joystick;
