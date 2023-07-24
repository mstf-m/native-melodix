import { Image, ScrollView, StyleSheet, View } from "react-native";
import Screen from "../components/Screen";
import MainLogo from "../assets/SVGs/MainLogo";
import colors from "../config/colors";
import Text from "../components/Text";
import GradientText from "../components/GradientText";
import ChartButton from "../components/buttons/ChartButton";

import PlayAll from "../assets/SVGs/PlayAll";
import Playlist from "../assets/SVGs/Playlist";
import Like from "../assets/SVGs/Like";
import HorizontalCard from "../components/cards/HorizontalCard";
import BackgraoundGradient from "../components/BackgraoundGradient";

const data = {
  items: [
    {
      id: 1,
      imageUri: require("../assets/images/img2.png"),
      title: "Let me love you",
      type: "Single",
      duration: "4:17",
    },
    {
      id: 2,
      imageUri: require("../assets/images/img3.png"),
      title: "Let me love you",
      type: "Single",
      duration: "4:17",
    },
    {
      id: 3,
      imageUri: require("../assets/images/img4.png"),
      title: "Let me love you",
      type: "Single",
      duration: "4:17",
    },
    {
      id: 4,
      imageUri: require("../assets/images/img5.png"),
      title: "Let me love you",
      type: "Single",
      duration: "4:17",
    },
    {
      id: 5,
      imageUri: require("../assets/images/img6.png"),
      title: "Let me love you",
      type: "Single",
      duration: "4:17",
    },
  ],
};

export default function ChartScreen() {
  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        <BackgraoundGradient>
          <View style={styles.container}>
            <MainLogo color={colors.primary} style={styles.logo}></MainLogo>

            <Image
              source={require("../assets/images/Lead-image.png")}
              style={styles.image}
            ></Image>

            <GradientText style={styles.title}>Tomorrow’s tunes</GradientText>
            <Text style={styles.discription}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit ut
              aliquam, purus sit amet luctus venenatis
            </Text>
            <Text style={styles.details}>64 songs ~ 16 hrs+</Text>

            <View style={styles.buttonBox}>
              <ChartButton
                title="Play all"
                icon={<PlayAll color={colors.primary}></PlayAll>}
              ></ChartButton>
              <ChartButton
                title="Add to collection"
                icon={<Playlist color={colors.primary}></Playlist>}
              ></ChartButton>
              <ChartButton
                title="Like"
                icon={<Like color={colors.primary}></Like>}
              ></ChartButton>
            </View>

            <View style={styles.musicsBox}>
              {data.items.map((item) => (
                <HorizontalCard key={item.id} data={item}></HorizontalCard>
              ))}
            </View>
          </View>
        </BackgraoundGradient>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  logo: {
    marginVertical: 15,
  },
  image: {
    width: "100%",
    marginVertical: 20,
    borderRadius: 20,
  },
  title: {
    fontFamily: "Designer",
    fontSize: 42,
    height: 42,
    marginBottom: 10,
  },
  discription: {
    fontSize: 14,
    marginBottom: 10,
  },
  details: {
    fontSize: 14,
  },
  buttonBox: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  musicsBox: {
    gap: 15,
  },
});
