import * as React from "react";
import { View, StyleSheet } from "react-native";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import useFontLoader from "./hooks/useFonts";

import AppNavigator from "./navigation/AppNavigator";
import colors from "./config/colors";
import { StatusBar } from "expo-status-bar";
import Theme from "./navigation/Theme";

export default function App() {
  const { fontsLoaded, hideSplashScreen } = useFontLoader();

  return (
    <View style={styles.app} onLayout={hideSplashScreen}>
      <NavigationContainer theme={DarkTheme}>
        <AppNavigator />
      </NavigationContainer>
      <StatusBar style="light"></StatusBar>
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
