import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Home } from "./components";
import { SocketProvider } from "./providers";


export default function App() {

  return (
    <SocketProvider>
      <View style={styles.App}>
        <StatusBar hidden />
        <Home />
      </View>
    </SocketProvider>

  )
}

const styles = StyleSheet.create({
  App: {
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: "#000"
  }
})

