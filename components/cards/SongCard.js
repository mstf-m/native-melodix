import { Image, StyleSheet, TouchableOpacity } from "react-native";
import Text from "../Text";
import colors from "../../config/colors";
import { useDispatch } from "react-redux";
import { toggleVisibility } from "../../store/Slices/playerVisibilitySlice";

export default function SongCart({ data }) {
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      onPress={() => dispatch(toggleVisibility())}
      style={styles.container}
    >
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
    color: colors.text500,
  },
});
