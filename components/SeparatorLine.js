import { View, StyleSheet } from "react-native";
import colors from "../config/colors";

export default function SeparatorLine({ style }) {
  return <View style={[styles.line, style]}></View>;
}

const styles = StyleSheet.create({
  line: {
    opacity: 0.4,
    width: "100%",
    height: 0.5,
    backgroundColor: colors.primary,
  },
});
