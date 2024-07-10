import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Navbar from './Navbar';
import Bottombar from './Bottombar';
import JoistickHandler from './JoistickHandler';

const uri = "https://cdn.dribbble.com/users/10692560/screenshots/18051942/media/532781a52379d839d28826c9f2d96d18.jpg?resize=1200x900&vertical=center";

const Home = () => {
  const [isLand, setIsLand] = useState(false);
  const [motorOn, setMotorOn] = useState(false);

  return (
    <View style={styles.home}>
      <Image
        source={{ uri }}
        style={{ height: "100%", width: "100%" }}
      />
      <Navbar />
      <Bottombar setIsLand={setIsLand} setMotorOn={setMotorOn} motorOn={motorOn} />
      <JoistickHandler/>
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
});



