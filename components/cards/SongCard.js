import { Image, StyleSheet, TouchableOpacity } from "react-native";
import Text from "../Text";
import colors from "../../config/colors";
import { useDispatch } from "react-redux";
import {
  toggleVisibility,
  setMusicData,
  setMusicindex,
} from "../../store/Slices/playerVisibilitySlice";

export default function SongCart({ data, ListData, index }) {
  const dispatch = useDispatch();

  const isFirstCard = index === 0;

  return (
    <TouchableOpacity
      onPress={() => {
        dispatch(toggleVisibility());
        dispatch(setMusicData(ListData));
        dispatch(setMusicindex(index));
      }}
      style={[styles.container, isFirstCard && styles.firstCardMarginLeft]}
    >
      <Image
        source={data.featuredImage.node.mediaItemUrl} // server needs change
        style={styles.image}
      ></Image>
      <Text style={styles.title} numberOfLines={1}>
        {data.title}
      </Text>
      <Text style={styles.subTitle}>
        {data.afmusicfields.musicArtistRelationship[0].title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: 20,
    width: 150,
    overflow: "hidden",
  },
  firstCardMarginLeft: {
    marginLeft: 15,
  },
  image: {
    marginBottom: 10,
    width: 150,
    height: 150,
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
