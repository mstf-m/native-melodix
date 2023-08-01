import { StyleSheet, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";

const { height: screenHeight } = Dimensions.get("window");

export default function GesturePlayer({ children }) {
  const offset = useSharedValue({ y: screenHeight - 80, h: 80 });
  const animatedStyles = useAnimatedStyle(() => {
    return {
      height: withSpring(offset.value.h, { mass: 0.03 }),
      transform: [
        {
          translateY: withSpring(offset.value.y, { mass: 0.03 }),
        },
      ],
    };
  });

  const start = useSharedValue({ y: screenHeight - 80, h: 80 });
  const gesture = Gesture.Pan()
    // .onBegin(() => {
    //   isPressed.value = true;
    // })
    .onUpdate((e) => {
      offset.value = {
        y: e.translationY + start.value.y,
        h: -e.translationY + start.value.h + 200,
      };
    })
    .onEnd(() => {
      if (start.value.y === screenHeight - 80) {
        offset.value.y < 750
          ? (offset.value = {
              y: 0,
              h: screenHeight + 200,
            })
          : (offset.value = { y: screenHeight - 80, h: 80 });
      } else if (start.value.y === 0) {
        offset.value.y < 10
          ? (offset.value = {
              y: 0,
              h: screenHeight + 200,
            })
          : (offset.value = { y: screenHeight - 80, h: 80 });
      }

      start.value = {
        y: offset.value.y,
        h: offset.value.h,
      };
    });
  // .onFinalize(() => {
  //   isPressed.value = false;
  // });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.ball, animatedStyles]}>
        {children}
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  ball: {
    position: "absolute",
    width: "100%",
  },
});
