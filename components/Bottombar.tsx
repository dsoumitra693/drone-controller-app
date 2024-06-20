import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../theme'
import BlurBg from './BlurBg'

const Bottombar = () => {
    return (
        <View style={styles.bottombar}>
            <BlurBg style={{
                paddingVertical: 10
            }}>
                <BlurBg style={{
                    padding: 10
                }}>
                    <Text style={styles.text}>H</Text>
                </BlurBg>
                <Text style={styles.text}>100.5m</Text>
            </BlurBg>
            <BlurBg style={{
                paddingVertical: 10
            }}>
                <BlurBg style={{
                    padding: 10
                }}>
                    <Text style={styles.text}>W</Text>
                </BlurBg>
                <Text style={styles.text}>34.5m</Text>
            </BlurBg>
        </View>
    )
}

export default Bottombar

const styles = StyleSheet.create({
    bottombar: {
        position: "absolute",
        bottom: 10,
        width: "100%",
        padding: 10,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 10
    },
    text: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: '500'
    },
})