import { Image, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import Text from "../Text";
import colors from "../../config/colors";
import { useDispatch } from "react-redux";
import {
  toggleVisibility,
  setMusicData,
  setMusicindex,
} from "../../store/Slices/playerVisibilitySlice";

const { width: screenWidth } = Dimensions.get("window");

export default function SongSearchCard({ data, ListData, index }) {
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      onPress={() => {
        dispatch(toggleVisibility());
        dispatch(setMusicData(ListData));
        dispatch(setMusicindex(index));
      }}
      style={[styles.container]}
    >
      <Image
        source={{ uri: data.cover }} // server needs change
        style={styles.image}
      ></Image>
      <Text style={styles.title} numberOfLines={1}>
        {data.title}
      </Text>
      <Text style={styles.subTitle}>{data.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: 15,
    width: screenWidth / 3 - 25,
    overflow: "hidden",
  },
  image: {
    marginBottom: 10,
    width: screenWidth / 3 - 25,
    height: screenWidth / 3 - 25,
    borderRadius: 15,
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
