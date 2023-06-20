import { Platform } from "react-native";
import colors from "./colors";

export default {
  text: {
    color: colors.textLight,
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Quicksand" : "Quicksand",
  },
};
