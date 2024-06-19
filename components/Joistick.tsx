import React from 'react'
import { StyleSheet, View } from 'react-native'

const Joistick = () => {
  return (
    <View style={styles.container}></View>
  )
}

export default Joistick

const styles = StyleSheet.create({
  container:{
    backgroundColor:"white",
    aspectRatio:1,
    width:200,
  }
})