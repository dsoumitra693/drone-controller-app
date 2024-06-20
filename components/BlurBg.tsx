import { StyleProp, StyleSheet, ViewStyle } from 'react-native'
import React from 'react'
import { BlurView } from 'expo-blur'

interface BlurBgProps {
    children:React.ReactNode;
    blur?:number;
    style?:StyleProp<ViewStyle>
}


const BlurBg:React.FC<BlurBgProps> = ({children, blur=20, style}) => {
    return (
        <BlurView intensity={blur} style={[styles.blurBg, style]} tint='systemThinMaterialLight'>
            {children}
        </BlurView>
    )
}

export default BlurBg

const styles = StyleSheet.create({
    blurBg: {
        padding: 15,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        borderRadius: 40,
        flexDirection: "row",
        columnGap: 10
    },
})