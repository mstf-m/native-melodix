import { ImageBackground, StyleSheet, View } from "react-native";
import Text from "../components/Text";
import TextInput from "../components/TextInput";
import Screen from "../components/Screen";
import MainLogo from "../assets/SVGs/MainLogo";
import { LinearGradient } from "expo-linear-gradient";

export default function LoginScreen() {
  return (
    <Screen style1={styles.screen}>
      <LinearGradient
        colors={["#010101", "#544171"]}
        start={[0, 0]}
        end={[0, 1]}
        style={styles.gradient}
      >
        <ImageBackground
          source={require("../assets/images/falling-girl.png")}
          style={styles.image}
        >
          <View style={styles.brand}>
            <MainLogo></MainLogo>
            <Text style={styles.name}>melodix</Text>
          </View>
          <View style={styles.form}>
            <TextInput icon={"profile"}></TextInput>
            <TextInput icon={"profile"}></TextInput>
            <TextInput icon={"profile"}></TextInput>
            <TextInput icon={"profile"}></TextInput>
          </View>
        </ImageBackground>
      </LinearGradient>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#010101",
  },
  image: {
    flex: 0.4,
  },
  gradient: {
    flex: 1,
  },
  brand: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginLeft: 20,
    marginTop: 20,
  },
  name: {
    fontFamily: "QuicksandBold",
    fontSize: 24,
  },
  form: {
    marginTop: "50%",
  },
});
