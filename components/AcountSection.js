import { View, StyleSheet } from "react-native";
import Text from "./Text";
import SeparatorLine from "./SeparatorLine";
import colors from "../config/colors";

export default function AcountSection({ data }) {
  return (
    <View>
      <Text style={styles.title}>{data.title}</Text>
      {data.items.map((item, index) => (
        <View key={index}>
          <Text style={styles.item}>{item}</Text>
          <SeparatorLine></SeparatorLine>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    color: colors.topIcon,
    marginLeft: 35,
    marginTop: 30,
    marginBottom: 10,
  },
  item: {
    marginLeft: 35,
    marginVertical: 15,
  },
});
