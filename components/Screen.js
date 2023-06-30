import React from "react";
import Constants from "expo-constants";
import { StyleSheet, SafeAreaView, View } from "react-native";
import colors from "../config/colors";
import MusicPlayer from "./music player/MusicPlayer";
import { useSelector } from "react-redux";

function Screen({ children, style }) {
  var isVisible = useSelector((state) => state.playerVisibility);

  return (
    <SafeAreaView style={[styles.screen]}>
      <View style={[styles.view, style]}>{children}</View>
      {isVisible && <MusicPlayer />}
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
    marginHorizontal: 15,
  },
});

export default Screen;
