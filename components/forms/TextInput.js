import { useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from "react-native-reanimated";
import colors from "../../config/colors";
import defaultStyles from "../../config/styles";
import GradientText from "../GradientText";
import { LinearGradient } from "expo-linear-gradient";
import Text from "../Text";
import Eye from "../../assets/SVGs/Eye";
import { useDispatch } from "react-redux";
import {
  opacityFull,
  opacityZero,
} from "../../store/Slices/playerVisibilitySlice";

function AppTextInput({ icon, placeholder, width, haveEye, ...otherProps }) {
  const offsetX = useSharedValue(43);
  const offsetY = useSharedValue(42);

  const [isFocused, setIsFocused] = useState(false);
  const [isSecure, setIsSecure] = useState(true);

  const dispatch = useDispatch();

  const style = useAnimatedStyle(() => {
    return {
      // transform: [
      //   {
      //     translateX: withSpring(offsetX.value),
      //     translateY: withSpring(offsetX.value),
      //   },
      // ],
      top: withSpring(offsetY.value),
      left: withSpring(offsetX.value),
    };
  });

  return (
    <View style={[styles.component, { width }]}>
      <View style={styles.placeholder}>
        <Animated.Text style={style}>
          <GradientText
            style={styles.placeholderGradient}
            colors={
              isFocused
                ? ["rgb(0, 255, 208)", "rgba(126, 47, 255, 0.8)"]
                : ["#E5FFFD", "#E5FFFD"]
            }
          >
            {placeholder}
          </GradientText>
        </Animated.Text>
      </View>

      <LinearGradient
        colors={
          isFocused
            ? ["rgb(0, 255, 208)", "rgba(126, 47, 255, 0.8)"]
            : [colors.grayDark, colors.grayDark]
        }
        start={[0, 0]}
        end={[1, 0]}
        style={styles.gradient}
      >
        <View style={[styles.container]}>
          {icon && icon}
          <TextInput
            style={[defaultStyles.text, styles.input]}
            onFocus={() => {
              dispatch(opacityZero());
              setIsFocused(true);
              offsetX.value = 0;
              offsetY.value = 0;
            }}
            onEndEditing={(native) => {
              dispatch(opacityFull());
              setIsFocused(false);
              if (!native.nativeEvent.text) {
                offsetX.value = 43;
                offsetY.value = 42;
              }
            }}
            secureTextEntry={isSecure ? true : false}
            {...otherProps}
          />
          {haveEye && (
            <TouchableOpacity onPress={() => setIsSecure(!isSecure)}>
              <Eye />
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  component: {
    marginTop: 20,
  },
  gradient: {
    borderRadius: 15,
  },
  container: {
    backgroundColor: colors.grayDark,
    borderRadius: 15,
    flexDirection: "row",
    padding: 12,
    alignItems: "center",
    margin: 1,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    width: "80%",
    height: "170%",
    marginLeft: 10,
    fontSize: 16,
    marginRight: 8,
  },
  placeholder: {
    zIndex: 10,
    marginBottom: 5,
    pointerEvents: "none",
  },
  placeholderGradient: {
    fontSize: 14,
  },
});

export default AppTextInput;
