import { StyleSheet, TouchableOpacity } from "react-native";

import colors from "../config/colors";

function AppButton({ onPress, color = "primary", children, style }) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors[color] }, style]}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
  },
});

export default AppButton;
