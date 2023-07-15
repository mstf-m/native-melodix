import * as React from "react";
import { View, StyleSheet } from "react-native";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import AppNavigator from "./navigation/AppNavigator";
import colors from "./config/colors";
import { StatusBar } from "expo-status-bar";
import Theme from "./navigation/Theme";
import { ReduxProvider } from "./store/provider";
import MusicPlayer from "./components/music player/MusicPlayer";
import { ApolloProvider } from "@apollo/client";
import client from "./graphql/client";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    Quicksand: require("./assets/fonts/Quicksand/Quicksand-Regular.ttf"),
    QuicksandBold: require("./assets/fonts/Quicksand/Quicksand-Bold.ttf"),
    Designer: require("./assets/fonts/DESIGNER/DESIGNER.otf"),
  });

  const hideSplashScreen = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ApolloProvider client={client}>
      <ReduxProvider>
        <View style={styles.app} onLayout={hideSplashScreen}>
          <NavigationContainer theme={DarkTheme}>
            <AppNavigator />
          </NavigationContainer>
          <StatusBar style="light"></StatusBar>
          <MusicPlayer />
        </View>
      </ReduxProvider>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
