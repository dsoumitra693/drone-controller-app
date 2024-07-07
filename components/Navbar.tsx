import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { COLORS } from '../theme'
import { MaterialIcons, Fontisto } from '@expo/vector-icons';
import { batteryConfig, networkConfig } from '../utils';
import { useSocket } from '../providers/SocketProvider';
import BlurBg from './BlurBg';


const Navbar = () => {
    let { receivedData: {
        battery_level, rssi, name
    }, isConnected } = useSocket();


    const batter_status = batteryConfig.filter(config => {
        battery_level = Number.isNaN(Number(battery_level)) ? 0 : battery_level
        return (config.max >= battery_level && config.min <= battery_level)
    })[0]
    const rssi_status = networkConfig.filter(config => {
        rssi = Number.isNaN(Number(rssi)) ? 0 : rssi
        return (config.max >= rssi && config.min <= rssi)
    })[0]

    return (
        <View style={styles.navbar}>
            <Text style={styles.text}>{name}</Text>
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
                <BlurBg style={{width:100, justifyContent:"space-between"
                }}>
                    <Fontisto name={batter_status.iconName} size={24} color={batter_status?.color} />
                    <Text style={styles.text}>{battery_level}%</Text>
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