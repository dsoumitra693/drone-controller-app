import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Joystick, { IJoystickEvent } from './Joystick';
import Navbar from './Navbar';
import Bottombar from './Bottombar';
import { useSocket } from '../providers/SocketProvider';

const uri = "https://cdn.dribbble.com/users/10692560/screenshots/18051942/media/532781a52379d839d28826c9f2d96d18.jpg?resize=1200x900&vertical=center";

const Home = () => {
  const [roll, setRoll] = useState(0);
  const [pitch, setPitch] = useState(0);
  const [yaw, setYaw] = useState(0);
  const [throttle, setThrottle] = useState(0);
  const [isLand, setIsLand] = useState(false);
  const [motorOn, setMotorOn] = useState(false);

  const { sendData } = useSocket();

  // Handle joystick movement for throttle and yaw
  const handleMove1 = useCallback((e: IJoystickEvent) => {
    setThrottle(e.position.y);
    setYaw(e.position.x);
  }, []);

  // Handle joystick movement for roll and pitch
  const handleMove2 = useCallback((e: IJoystickEvent) => {
    setRoll(e.position.x);
    setPitch(e.position.y);
  }, []);

  // Set up interval to send data at regular intervals
  useEffect(() => {
    const interval = setInterval(() => {
      const data = {
        roll,
        pitch,
        yaw,
        throttle,
        isLand,
        motorOn,
      };
      sendData(JSON.stringify(data));
    }, 300); // Adjust the interval (in milliseconds) as needed

    return () => clearInterval(interval);
  }, [roll, pitch, yaw, throttle, isLand, motorOn, sendData]);

  return (
    <View style={styles.home}>
      <Image
        source={{ uri }}
        style={{ height: "100%", width: "100%" }}
      />
      <Navbar />
      <Bottombar setIsLand={setIsLand} setMotorOn={setMotorOn} motorOn={motorOn} />
      <View style={styles.joystickWrapper}>
        <Joystick onMove={handleMove1} onStop={handleMove1} />
        <Joystick onMove={handleMove2} onStop={handleMove2} />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  home: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  joystickWrapper: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "50%",
    height: "100%",
    alignItems: "flex-end",
    paddingBottom: 40,
  }
});
