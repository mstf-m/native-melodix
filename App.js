import "expo-dev-client";

import { View, StyleSheet } from "react-native";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import AppNavigator from "./navigation/AppNavigator";
import colors from "./config/colors";
import { StatusBar } from "expo-status-bar";
import Theme from "./navigation/Theme";
import { ReduxProvider } from "./store/provider";
import MusicPlayer from "./components/music player/MusicPlayer";
import { ApolloProvider } from "@apollo/client";
import apollo from "./graphql/apollo";

import { AppLoading } from "expo-app-loading";
import AuthContext from "./auth/context";
import authStorage from "./auth/storage";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [user, setUser] = useState(null);
  const [isReady, setIsReady] = useState(false);

  const restoreUser = async () => {
    const user = await authStorage.getToken();
    if (user) setUser(user);
  };

  useEffect(() => {
    restoreUser;
  }, []);

  // if (!isReady)
  //   return (
  //     <AppLoading startAsync={restoreUser} onFinish={() => setIsReady(true)} />
  //   );

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
    <ApolloProvider client={apollo}>
      <AuthContext.Provider value={{ user, setUser }}>
        <ReduxProvider>
          <View style={styles.app} onLayout={hideSplashScreen}>
            <NavigationContainer theme={DarkTheme}>
              <AppNavigator />
            </NavigationContainer>
            <StatusBar style="light"></StatusBar>
            <MusicPlayer />
          </View>
        </ReduxProvider>
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
