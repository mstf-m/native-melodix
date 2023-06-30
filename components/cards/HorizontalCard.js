import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
import Text from "../Text";
import More from "../../assets/SVGs/More";
import colors from "../../config/colors";
import { useDispatch } from "react-redux";
import { toggleVisibility } from "../../store/Slices/playerVisibilitySlice";

export default function HorizontalCard({ data }) {
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      onPress={() => dispatch(toggleVisibility())}
      style={styles.container}
    >
      <Image source={data.imageUri} style={styles.image}></Image>
      <View style={styles.details}>
        <View style={styles.titleBox}>
          <Text style={styles.title}>{data.title}</Text>
          <Text style={styles.type}>{data.type}</Text>
        </View>
        <View style={styles.moreBox}>
          <More color={colors.primary}></More>
          <Text style={styles.duration}>{data.duration}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.button,
    padding: 10,
    borderRadius: 12,
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  details: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleBox: {
    height: 50,
    justifyContent: "space-around",
  },
  moreBox: {
    height: 50,
    alignItems: "flex-end",
    justifyContent: "space-around",
  },
  title: {
    fontSize: 14,
  },
  type: {
    fontSize: 12,
  },
  duration: {
    fontSize: 14,
  },
});
