import { StyleSheet, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useSocket } from '../providers/SocketProvider'
import { debounce } from 'lodash';
import Joystick, { IJoystickEvent } from './Joystick'

const JoistickHandler = () => {
    const [roll, setRoll] = useState(0);
    const [pitch, setPitch] = useState(0);
    const [yaw, setYaw] = useState(0);
    const [throttle, setThrottle] = useState(0);


    const { sendData } = useSocket();

    // Handle joystick movement for throttle and yaw
    const handleMove1 = useCallback(
        (e: IJoystickEvent) => {
            setThrottle(e.position.y);
            setYaw(e.position.x);
        }
        , []);

    // Handle joystick movement for roll and pitch
    const handleMove2 = useCallback(
        (e: IJoystickEvent) => {
            setRoll(e.position.x);
            setPitch(e.position.y);
        }
        , []);


    // Set up interval to send data at regular intervals
    useEffect(() => {
        const interval = setInterval(() => {
            const data = {
                roll,
                pitch,
                yaw,
                throttle,
                isLand: false,
                motorOn: false,
            };
            sendData(JSON.stringify(data));
        }, 300); // Adjust the interval (in milliseconds) as needed

        return () => clearInterval(interval);
    }, [roll, pitch, yaw, throttle, sendData]);
    return (
        <View style={styles.joystickWrapper}>
            <Joystick
                onMove={handleMove1}
                onStop={handleMove1}
                key={1} />
            <Joystick
                onStop={handleMove2}
                onMove={handleMove2} />
        </View>
    )
}

export default JoistickHandler

const styles = StyleSheet.create({
    joystickWrapper: {
        position: "absolute",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "50%",
        height: "100%",
        alignItems: "flex-end",
        paddingBottom: 40,
    }
})