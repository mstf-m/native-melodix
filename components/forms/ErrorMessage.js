import { StyleSheet } from "react-native";
import Text from "../Text";
import colors from "../../config/colors";

export default function ErrorMessage({ error, visible }) {
  if (!error || !visible) return null;
  return <Text style={styles.error}>{error}</Text>;
}

const styles = StyleSheet.create({
  error: {
    color: colors.danger,
    fontSize: 14,
  },
});
