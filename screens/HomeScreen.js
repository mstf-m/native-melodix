import { StyleSheet, View, FlatList, Image } from "react-native";
import Screen from "../components/Screen";
import colors from "../config/colors";
import MainLogo from "../assets/SVGs/MainLogo";
import FeaturedList from "../components/FeaturedList";
import ChartCard from "../components/cards/ChartCard";
import SongCart from "../components/cards/SongCard";

const data = {
  topCharts: {
    title: "Top Charts",
    items: [
      {
        id: 1,
        imageUri: require("../assets/images/p1.png"),
        title: "Golden age of 80s",
        subTitle: "Sean swadder",
        duration: "2:34:45",
        liked: false,
      },
      {
        id: 2,
        imageUri: require("../assets/images/p2.png"),
        title: "Golden age of 80s",
        subTitle: "Sean swadder",
        duration: "2:34:45",
        liked: false,
      },
      {
        id: 3,
        imageUri: require("../assets/images/p3.png"),
        title: "Golden age of 80s",
        subTitle: "Sean swadder",
        duration: "2:34:45",
        liked: false,
      },
    ],
  },

  newReleases: {
    title: "New Releases",
    items: [
      {
        id: 1,
        imageUri: require("../assets/images/img2.png"),
        title: "Life in a bubble",
        subTitle: "The van",
      },
      {
        id: 2,
        imageUri: require("../assets/images/img3.png"),
        title: "Life in a bubble",
        subTitle: "The van",
      },
      {
        id: 3,
        imageUri: require("../assets/images/img4.png"),
        title: "Life in a bubble",
        subTitle: "The van",
      },
      {
        id: 4,
        imageUri: require("../assets/images/img5.png"),
        title: "Life in a bubble",
        subTitle: "The van",
      },
      {
        id: 5,
        imageUri: require("../assets/images/img6.png"),
        title: "Life in a bubble",
        subTitle: "The van",
      },
    ],
  },
};

export default function HomeScreen() {
  return (
    <Screen>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={[""]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={() => (
          <>
            <MainLogo color={colors.primary} style={styles.logo}></MainLogo>
            <Image
              style={styles.mainPic}
              source={require("../assets/images/img1.png")}
            ></Image>
            <FeaturedList title={data.topCharts.title}>
              <>
                {data.topCharts.items.map((item) => (
                  <ChartCard key={item.id} data={item} />
                ))}
              </>
            </FeaturedList>
            <FeaturedList title={data.newReleases.title}>
              <>
                {data.newReleases.items.map((item) => (
                  <SongCart key={item.id} data={item} />
                ))}
              </>
            </FeaturedList>
          </>
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  logo: {
    marginVertical: 15,
  },
  mainPic: {
    width: "100%",
    borderRadius: 20,
  },
});
