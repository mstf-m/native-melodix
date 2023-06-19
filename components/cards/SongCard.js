import { Image, StyleSheet, TouchableOpacity } from "react-native";
import Text from "../Text";
import colors from "../../config/colors";

export default function SongCart({ data }) {
  return (
    <TouchableOpacity style={styles.container}>
      <Image source={data.imageUri} style={styles.image}></Image>
      <Text style={styles.title}>{data.title}</Text>
      <Text style={styles.subTitle}>{data.subTitle}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: 20,
  },
  image: {
    marginBottom: 10,
  },
  title: {
    marginBottom: 5,
    fontSize: 14,
  },
  subTitle: {
    marginBottom: 15,
    fontSize: 12,
  },
});
