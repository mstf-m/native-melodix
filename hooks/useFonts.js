import { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

export default function useFontLoader() {
  const [fontsLoaded] = useFonts({
    Quicksand: require("../assets/fonts/Quicksand/Quicksand-Regular.ttf"),
    Designer: require("../assets/fonts/DESIGNER/DESIGNER.otf"),
  });

  const hideSplashScreen = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return { fontsLoaded, hideSplashScreen };
}
