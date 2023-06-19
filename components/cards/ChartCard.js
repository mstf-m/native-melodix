import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import Text from "../Text";
import colors from "../../config/colors";

export default function ChartCard({ data }) {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.group}>
        <View>
          <Image source={data.imageUri} style={styles.image}></Image>
          <Image></Image>
        </View>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.subTitle}>{data.subTitle}</Text>
        <Text style={styles.duration}>{data.duration}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 300,
    backgroundColor: colors.surface700,
    marginRight: 20,
    borderRadius: 20,
  },
  group: {
    margin: 15,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  title: {
    marginBottom: 5,
  },
  subTitle: {
    marginBottom: 15,
    fontSize: 12,
  },
  duration: {
    fontSize: 14,
  },
});
