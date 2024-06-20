import { View, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import Joystick, { IJoystickEvent } from './Joystick'
import { ResizeMode, Video } from 'expo-av'
import Navbar from './Navbar'
import Bottombar from './Bottombar'

const Home = () => {

  const [roll, setRoll] = useState(0)
  const [pitch, setPitch] = useState(0)
  const [yaw, setYaw] = useState(0)
  const [throttle, setThrottle] = useState(0)

  const handleMove1 = (e:IJoystickEvent)=>{
    setThrottle(e.position.y)
    setYaw(e.position.x)
  }
  const handleMove2 = (e:IJoystickEvent)=>{
    setRoll(e.position.x)
    setPitch(e.position.y)
  }
  return (
    <View style={styles.home}>
      {/* <Image
        source={{ uri: "https://as2.ftcdn.net/v2/jpg/01/48/81/15/1000_F_148811539_ydfZo17ODIKu9flGGt99BxqDFG3hGUD5.jpg" }}
        style={StyleSheet.absoluteFill}/> */}
      <Video
        style={StyleSheet.absoluteFill}
        source={{uri:"https://videos.pexels.com/video-files/6844691/6844691-uhd_2560_1440_24fps.mp4"}}
        resizeMode={ResizeMode.STRETCH}
        shouldPlay
        isLooping
      />
      <Navbar />
      <Bottombar/>
      <View style={styles.joystickWrapper}>
        <Joystick onMove={handleMove1}/>
        <Joystick onMove={handleMove2}/>
      </View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  home: {
    padding: 10,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  joystickWrapper: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
    alignItems: "center",
    padding: 40,
  }
})