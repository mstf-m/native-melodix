import { Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";

const GradientText = (props) => {
  return (
    <MaskedView maskElement={<Text {...props} />}>
      <LinearGradient
        colors={["rgb(0, 255, 208)", "rgba(126, 47, 255, 0.8)"]}
        start={[0, 0]}
        end={[1, 0]}
        style={{ flex: 1 }}
      >
        <Text {...props} style={[props.style, { opacity: 0 }]}>
          {props.children}
        </Text>
      </LinearGradient>
    </MaskedView>
  );
};

export default GradientText;
