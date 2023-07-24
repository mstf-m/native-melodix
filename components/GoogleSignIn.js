import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import GradientText from "./GradientText";
import Text from "../components/Text";
import Button from "../components/Button";
import useAuth from "../auth/useAuth";

import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";

const GoogleSignIn = () => {
  const auth = useAuth();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "88628668171-09ttc6mldjk0lhdl83om0bobahv9dgd0.apps.googleusercontent.com",
      offlineAccess: true,
    });
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      auth.logIn(userInfo);
      console.log("User Info:", auth.user.idToken);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("User cancelled the sign-in flow.");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("Sign-in is already in progress.");
      } else {
        console.log("Something went wrong:", error.message);
      }
    }
  };

  return (
    <>
      <Button style={styles.google} onPress={signIn} color="grayDark">
        <GradientText style={styles.symbol}>G </GradientText>
        <View style={styles.googleText}>
          <Text style={styles.continue}>CONTINUE WITH </Text>
          <Text style={styles.t1}>G</Text>
          <Text style={styles.t2}>O</Text>
          <Text style={styles.t3}>O</Text>
          <Text style={styles.t1}>G</Text>
          <Text style={styles.t4}>L</Text>
          <Text style={styles.t3}>E</Text>
        </View>
      </Button>
    </>
  );
};

export default GoogleSignIn;

const styles = StyleSheet.create({
  google: {
    marginTop: 25,
    flexDirection: "row",
    height: 60,
    padding: 17,
  },
  symbol: {
    fontFamily: "Designer",
    fontSize: 35,
    height: 35,
  },
  googleText: {
    flexDirection: "row",
    paddingTop: 8,
  },
  continue: {
    fontFamily: "Designer",
    fontSize: 24,
    height: 24,
  },
  t1: {
    fontFamily: "Designer",
    fontSize: 24,
    height: 24,
    color: "#4285F4",
  },
  t2: {
    fontFamily: "Designer",
    fontSize: 24,
    height: 24,
    color: "#F4B400",
  },
  t3: {
    fontFamily: "Designer",
    fontSize: 24,
    height: 24,
    color: "#DB4437",
  },
  t4: {
    fontFamily: "Designer",
    fontSize: 24,
    height: 24,
    color: "#0F9D58",
  },
});
