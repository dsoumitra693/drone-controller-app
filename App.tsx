import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Home } from "./components";
import { SocketProvider } from "./providers";
import { COLORS } from "./theme";
import { GestureHandlerRootView } from "react-native-gesture-handler";


export default function App() {

  return (
    <GestureHandlerRootView>
      <SocketProvider>
        <View style={styles.App}>
          <StatusBar hidden />
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
    backgroundColor: COLORS.black
  }
})

