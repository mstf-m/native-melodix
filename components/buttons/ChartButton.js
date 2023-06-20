import { StyleSheet, TouchableOpacity, View } from "react-native";
import Text from "../Text";
import colors from "../../config/colors";
export default function ChartButton({ icon, title }) {
  return (
    <TouchableOpacity style={styles.container}>
      {icon}
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.button,
    borderRadius: 40,
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 11,
    marginVertical: 25,
    gap: 11,
  },
  title: {
    fontSize: 12,
  },
});
