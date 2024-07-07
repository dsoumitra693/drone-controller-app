import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../theme'
import BlurBg from './BlurBg'
import { useSocket } from '../providers/SocketProvider'
import { TouchableOpacity } from 'react-native-gesture-handler'

const Bottombar = ({ setIsLand, setMotorOn, motorOn }: { setIsLand: (prev: boolean) => void; setMotorOn: (prev: boolean) => void; motorOn: boolean }) => {
    let { receivedData: {
        height, distance, speed
    } } = useSocket();
    
    return (
        <View style={styles.bottombar}>
            <View style={styles.group}>
                <BlurBg style={{
                    paddingVertical: 10,
                    width: 90,
                }}>
                    <BlurBg style={{
                        padding: 5
                    }}>
                        <Text style={styles.text}>H</Text>
                    </BlurBg>
                    <Text style={styles.text}>{height}m</Text>
                </BlurBg>
                <BlurBg style={{
                    paddingVertical: 10,
                    width: 90,
                }}>
                    <BlurBg style={{
                        padding: 5
                    }}>
                        <Text style={styles.text}>D</Text>
                    </BlurBg>
                    <Text style={styles.text}>{distance}m</Text>
                </BlurBg>
                <BlurBg style={{
                    paddingVertical: 10,
                    width: 90,
                }}>
                    <BlurBg style={{
                        padding: 5
                    }}>
                        <Text style={styles.text}>S</Text>
                    </BlurBg>
                    <Text style={styles.text}>{speed}m/s</Text>
                </BlurBg>
            </View>
            <View style={styles.group}>
                <TouchableOpacity onPress={() => setMotorOn(prev => !prev)}>
                    <BlurBg style={{
                        padding: 10,
                        width: 100,
                        backgroundColor: `${motorOn ? COLORS.yellow : COLORS.red}87`
                    }}>
                        <Text style={styles.text}>{motorOn ? "OFF" : "ON"}</Text>
                    </BlurBg>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsLand(true)}>
                    <BlurBg style={{
                        padding: 10,
                        width: 100
                    }}>
                        <Text style={styles.text}>Land</Text>
                    </BlurBg>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Bottombar

const styles = StyleSheet.create({
    bottombar: {
        position: "absolute",
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    group: {
        width: "13%",
        // height:"70%",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 10
    },
    text: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: '500'
    },
})
