import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../theme'
import { BlurView } from 'expo-blur'
import { MaterialIcons, Fontisto } from '@expo/vector-icons';
import { batteryConfig, networkConfig } from '../utils';
import { useSocket } from '../providers/SocketProvider';
import BlurBg from './BlurBg';

const BATTERY_LEVEL = 45
const RSSI = -60

const Navbar = () => {
    const batter_status = batteryConfig.filter(config => (config.max >= BATTERY_LEVEL && config.min <= BATTERY_LEVEL))[0]
    const rssi_status = networkConfig.filter(config => (config.max >= RSSI && config.min <= RSSI))[0]

    const { isConnected } = useSocket();

    return (
        <View style={styles.navbar}>
            <Text style={styles.text}>Altitude zone: 120m</Text>
            <View style={styles.network}>
                <BlurBg>
                    <MaterialIcons name={isConnected ? "wifi-tethering" : "wifi-tethering-off"} size={24} color={isConnected ? COLORS.green : `${COLORS.white}60`} />
                </BlurBg>
                <BlurBg>
                    <MaterialIcons
                        name={"signal-cellular-alt"}
                        size={24}
                        color={`${COLORS.white}60`}
                        style={styles.icon} />
                    <MaterialIcons
                        name={rssi_status.iconName}
                        size={24}
                        color={rssi_status.color} />
                </BlurBg>
                <BlurBg>
                    <Fontisto name={batter_status.iconName} size={24} color={batter_status?.color} />
                    <Text style={styles.text}>{BATTERY_LEVEL}%</Text>
                </BlurBg>
            </View>
        </View>
    )
}

export default Navbar

const styles = StyleSheet.create({
    navbar: {
        position: "absolute",
        top: 10,
        width: "100%",
        padding: 10,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "flex-start"
    },
    text: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: '500'
    },
    network: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 5,
        columnGap: 10,
    },
    icon: {
        position: "absolute"
    }
})