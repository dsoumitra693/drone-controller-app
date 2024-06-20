import React, { useState, useCallback, useMemo } from 'react';
import { View, StyleSheet, Platform, StyleProp, ViewStyle } from 'react-native';
import { Gesture, GestureDetector, GestureTouchEvent } from 'react-native-gesture-handler';
import { COLORS } from '../theme';

export interface IJoystickEvent {
  position: {
    x: number;
    y: number
  };
  angle: {
    radian: number;
    degree: number;
  },
  force: number;
  type: 'move' | 'start' | 'stop',
}


interface JoystickProps {
  onStart?: (event: IJoystickEvent) => void;
  onMove?: (event: IJoystickEvent) => void;
  onStop?: (event: IJoystickEvent) => void;
  color?: string;
  radius?: number;
  style?: StyleProp<ViewStyle>;
}

const Joystick: React.FC<JoystickProps> = ({ onStart, onMove, onStop, color = COLORS.yellow, radius = 90, style }) => {
  const wrapperRadius = radius;
  const nippleRadius = wrapperRadius / 2.5;

  const [x, setX] = useState(wrapperRadius - nippleRadius);
  const [y, setY] = useState(wrapperRadius - nippleRadius);

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

      const force = dist / (nippleRadius * 2);
      dist = Math.min(dist, wrapperRadius);

      if (dist === wrapperRadius) {
        coordinates = {
          x: wrapperRadius + dist * Math.cos(angle) - nippleRadius,
          y: wrapperRadius + dist * Math.sin(angle) - nippleRadius,
        };
      }

      setX(coordinates.x);
      setY(coordinates.y);

      onMove &&
        onMove({
          position: coordinates,
          angle: {
            radian: angle,
            degree: (angle * 180) / Math.PI,
          },
          force,
          type: 'move',
        });
    },
    [nippleRadius, wrapperRadius]
  );

  const handleTouchEnd = () => {
    setX(wrapperRadius - nippleRadius);
    setY(wrapperRadius - nippleRadius);
    onStop &&
      onStop({
        force: 0,
        position: {
          x: 0,
          y: 0,
        },
        angle: {
          radian: 0,
          degree: 0,
        },
        type: 'stop',
      });
  };

  const handleTouchStart = () => {
    onStart &&
      onStart({
        force: 0,
        position: {
          x: 0,
          y: 0,
        },
        angle: {
          radian: 0,
          degree: 0,
        },
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
          borderColor: "#fff",
          transform: [{ rotateX: '180deg' }],
          ...(style && typeof style === 'object' ? style : {}),
        },
        nipple: {
          height: 2 * nippleRadius,
          width: 2 * nippleRadius,
          borderRadius: nippleRadius,
          backgroundColor: color,
          position: 'absolute',
          transform: [{ translateX: x }, { translateY: y }],
        },
      }),
    [radius, color, nippleRadius, x, y]
  );

  return (
    <GestureDetector gesture={panGesture}>
      <View style={styles.wrapper}>
        <View pointerEvents="none" style={styles.nipple}></View>
      </View>
    </GestureDetector>
  );
};

export default Joystick;