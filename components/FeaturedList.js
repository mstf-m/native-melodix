import { ScrollView, StyleSheet, View } from "react-native";
import Text from "./Text";
import colors from "../config/colors";

export default function FeaturedList({ title, isLoad = false, children }) {
  return (
    <View style={[styles.container]}>
      <Text style={styles.title}>{title}</Text>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.group}
      >
        {children}
      </ScrollView>
      {isLoad && <Text style={styles.load}>Load more...</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
  title: {
    marginBottom: 15,
    fontWeight: "bold",
    fontSize: 20,
  },
  group: {},
  load: {
    fontSize: 15,
    width: 100,
    marginHorizontal: "38%",
    color: colors.medium,
  },
});
