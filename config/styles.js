import { Platform } from "react-native";
import { useState } from "react";
import { useFonts } from "expo-font";
import colors from "./colors";

// export default function useTextStyles() {
//   const [defaultFontFamily, setDefaultFontFamily] = useState(
//     Platform.OS === "android" ? "Roboto" : "Avenir"
//   );

//   const [fontsLoaded] = useFonts({
//     Quicksand: require("../assets/fonts/Quicksand-Medium.ttf"),
//   });

//   if (!fontsLoaded) {
//     return {
//       text: {
//         color: colors.textLight,
//         fontSize: 18,
//         fontFamily: defaultFontFamily,
//       },
//     };
//   }

//   return {
//     text: {
//       color: colors.textLight,
//       fontSize: 18,
//       fontFamily: "Quicksand",
//     },
//   };
// }

export default {
  text: {
    color: colors.textLight,
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
};
