import {
  ImageBackground,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Image,
} from "react-native";

import Text from "../components/Text";
import Screen from "../components/Screen";
import MainLogo from "../assets/SVGs/MainLogo";
import { LinearGradient } from "expo-linear-gradient";
import LoginForm from "../components/forms/LoginForm";

export default function LoginScreen() {
  // const emailRef = useRef(null);
  // const passRef = useRef(null);

  // const handleScreenPress = () => {
  //   if (emailRef.current) {
  //     emailRef.current.blur();
  //   }
  //   if (passRef.current) {
  //     passRef.current.blur();
  //   }
  // };

  return (
    <Screen style1={styles.screen}>
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <LinearGradient
              colors={["#010101", "#544171"]}
              start={[0, 0]}
              end={[0, 1]}
              style={styles.gradient}
            >
              <Image
                source={require("../assets/images/falling-girl.png")}
                style={styles.image}
              ></Image>
              <ImageBackground
                source={require("../assets/images/black-layer.png")}
                style={styles.backgroundImage}
              >
                <View style={styles.details}>
                  <View style={styles.brand}>
                    <MainLogo></MainLogo>
                    <Text style={styles.name}>melodix</Text>
                  </View>
                  <LoginForm></LoginForm>
                </View>
              </ImageBackground>
            </LinearGradient>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#010101",
  },
  container: {
    flex: 1,
    height: 800,
  },
  backgroundImage: {
    height: "100%",
    position: "absolute",
  },
  image: {
    width: "100%",
    height: 300,
  },
  gradient: {
    flex: 1,
  },
  // details: {position: "absolute",},
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
});
