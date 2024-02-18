import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import Text from "../Text";
import colors from "../../config/colors";
import { useNavigation } from "@react-navigation/native";
import routes from "../../navigation/routes";

export default function ChartCard({ data, index }) {
  const navigation = useNavigation();

  const isFirstCard = index === 0;

  return (
    <TouchableOpacity
      style={[styles.container, isFirstCard && styles.firstCardMarginLeft]}
      onPress={() => navigation.navigate(routes.CHART)}
    >
      <View style={styles.group}>
        <View>
          <Image source={{ uri: data.imageUri }} style={styles.image}></Image>
        </View>
        <View>
          <Text style={styles.title}>{data.title}</Text>
          <Text style={styles.subTitle}>{data.subTitle}</Text>
          <Text style={styles.duration}>{data.duration}</Text>
        </View>
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
  firstCardMarginLeft: {
    marginLeft: 15,
  },
  group: {
    margin: 15,
    flexDirection: "row", //change
    gap: 20, //change
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  title: {
    marginBottom: 5,
    fontFamily: "Quicksand",
    fontSize: 17,
  },
  subTitle: {
    marginBottom: 15,
    fontSize: 12,
    color: colors.text500,
  },
  duration: {
    fontSize: 14,
  },
});
