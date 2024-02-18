import React, { useRef, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";

export default function Splash({ isLarge = true, size = 50 }) {
  const animation = useRef(null);
  useEffect(() => {
    // You can control the ref programmatically, rather than using autoPlay
    // animation.current?.play();
  }, []);

  return (
    <View style={[styles.animationContainer, { flex: isLarge ? 1 : null }]}>
      <LottieView
        autoSize={false}
        autoPlay
        ref={animation}
        // style={
        //   isLarge
        //     ? {
        //         width: 200,
        //         height: 200,
        //       }
        //     : {
        //         width: { size },
        //         height: { size },
        //       }
        // }
        source={require("../assets/animations/melodix.json")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  animationContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
