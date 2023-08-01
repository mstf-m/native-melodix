import "expo-dev-client";

import { View, StyleSheet } from "react-native";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { useCallback, useState, useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { ReduxProvider } from "./store/provider";
import { ApolloProvider } from "@apollo/client";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AppLoading } from "expo-app-loading";

import AppNavigator from "./navigation/AppNavigator";
import colors from "./config/colors";
import Theme from "./navigation/Theme";
import apollo from "./graphql/apollo";
import AuthContext from "./auth/context";
import authStorage from "./auth/storage";
import MusicPlayer from "./components/music player/MusicPlayer";

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
            <GestureHandlerRootView style={styles.gesture}>
              <NavigationContainer theme={DarkTheme}>
                <AppNavigator />
              </NavigationContainer>
              <StatusBar style="light"></StatusBar>

              <MusicPlayer />
            </GestureHandlerRootView>
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
  gesture: {
    flex: 1,
  },
});
