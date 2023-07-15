import React from "react";
import Constants from "expo-constants";
import { StyleSheet, SafeAreaView, View } from "react-native";
import colors from "../config/colors";

function Screen({ children, style1, style2 }) {
  return (
    <SafeAreaView style={[styles.screen, style1]}>
      <View style={[styles.view, style2]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: colors.background,
    flex: 1,
  },
  view: {
    flex: 1,
  },
});

export default Screen;
