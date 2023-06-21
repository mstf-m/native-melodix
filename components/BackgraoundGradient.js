import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../config/colors";

export default function BackgraoundGradient({ uri, children }) {
  return (
    <ImageBackground
      source={require("../assets/images/Lead-image.png")}
      style={styles.image}
    >
      <LinearGradient
        colors={["transparent", colors.background]}
        start={[0, -1.5]}
        end={[0, 0.6]}
        style={styles.gradient}
      >
        {children}
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
});
