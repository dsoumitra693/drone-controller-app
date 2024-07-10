import { StyleSheet, View,StatusBar } from "react-native";
import { Home } from "./components";
import { SocketProvider } from "./providers";
import { COLORS } from "./theme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect } from "react";
import * as ScreenOrientation from "expo-screen-orientation";

export default function App() {

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  }, [])
  

  return (
    <GestureHandlerRootView style={{flex:1}}>
      <SocketProvider>
        <View style={styles.App}>
          <Home />
        </View>
      </SocketProvider>
    </GestureHandlerRootView>

  )
}

const styles = StyleSheet.create({
  App: {
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: COLORS.black,
    position:"absolute"
  }
})

