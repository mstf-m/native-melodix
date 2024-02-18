import Svg, { Path } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";

const Play = ({ color, ...otherProps }) => (
  <LinearGradient
    colors={["rgb(0, 255, 208)", "rgba(126, 47, 255, 0.8)"]}
    start={[0, 0]}
    end={[1, 0]}
    style={styles.gradient}
  >
    <Svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M0.923096 6.9375V4.40215C0.923096 1.14847 3.38373 -0.182497 6.38612 1.44434L8.73381 2.71195L11.0816 3.97956C14.0839 5.6064 14.0839 8.2686 11.0816 9.89544L8.73381 11.163L6.38612 12.4307C3.38373 14.0575 0.923096 12.7265 0.923096 9.47285V6.9375Z"
        fill="#EFEEE0"
      />
    </Svg>
  </LinearGradient>
);

const styles = StyleSheet.create({
  gradient: {
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 999,
  },
});

export default Play;
