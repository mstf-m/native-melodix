import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";

const Pause = ({ color, ...otherProps }) => (
  <LinearGradient
    colors={["rgb(0, 255, 208)", "rgba(126, 47, 255, 0.8)"]}
    start={[0, 0]}
    end={[1, 0]}
    style={styles.gradient}
  >
    <Svg
      width="10"
      height="15"
      viewBox="0 0 10 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <G clip-path="url(#clip0_1699_2741)">
        <Path
          d="M9.58644 7.82751C9.58644 9.74001 9.58644 11.6572 9.58644 13.5791C9.58644 13.8509 9.53488 14.0924 9.43175 14.3033C9.32863 14.5142 9.15519 14.6853 8.91144 14.8166C8.81769 14.8728 8.71691 14.9174 8.60909 14.9502C8.50128 14.983 8.38644 14.9994 8.26456 14.9994C7.92706 14.9994 7.63409 14.8845 7.38566 14.6549C7.13722 14.4252 6.99425 14.1416 6.95675 13.8041C6.95675 13.7666 6.95675 13.7338 6.95675 13.7056C6.95675 13.6775 6.95675 13.6447 6.95675 13.6072C6.95675 9.73532 6.95675 5.86813 6.95675 2.00563C6.95675 1.77126 6.99894 1.55563 7.08331 1.35876C7.16769 1.16188 7.30831 0.993133 7.50519 0.852508C7.71144 0.711883 7.92706 0.629852 8.15206 0.606415C8.37706 0.582977 8.60206 0.627508 8.82706 0.740008C9.05206 0.843133 9.22784 0.986102 9.35441 1.16891C9.48097 1.35173 9.55363 1.56501 9.57238 1.80876C9.58175 1.85563 9.58644 1.90485 9.58644 1.95642C9.58644 2.00798 9.58644 2.0572 9.58644 2.10407C9.58644 4.0072 9.58644 5.91501 9.58644 7.82751ZM3.03331 7.79938C3.03331 9.73063 3.03331 11.6619 3.03331 13.5931C3.03331 13.9025 2.963 14.1697 2.82238 14.3947C2.68175 14.6197 2.48488 14.7838 2.23175 14.8869C1.8005 15.065 1.39738 15.0322 1.02238 14.7884C0.647376 14.5447 0.441125 14.1884 0.403625 13.7197C0.403625 13.7009 0.403625 13.6775 0.403625 13.6494C0.403625 13.6213 0.403625 13.5978 0.403625 13.5791C0.403625 9.71657 0.403625 5.85876 0.403625 2.00563C0.403625 1.67751 0.483313 1.39626 0.642688 1.16188C0.802063 0.927508 1.02706 0.763446 1.31769 0.669696C1.73019 0.529071 2.11456 0.580634 2.47081 0.824384C2.82706 1.06813 3.01456 1.40563 3.03331 1.83688C3.04269 2.09001 3.04503 2.34079 3.04034 2.58923C3.03566 2.83766 3.03331 3.08376 3.03331 3.32751C3.03331 4.81813 3.03331 6.30876 3.03331 7.79938Z"
          fill="white"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1699_2741">
          <Rect
            width="9.19"
            height="14.4072"
            fill="white"
            transform="matrix(1 0 0 -1 0.400024 14.9997)"
          />
        </ClipPath>
      </Defs>
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

export default Pause;