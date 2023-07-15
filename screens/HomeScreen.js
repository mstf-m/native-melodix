import { StyleSheet, View, FlatList, Image } from "react-native";
import Screen from "../components/Screen";
import colors from "../config/colors";
import MainLogo from "../assets/SVGs/MainLogo";
import FeaturedList from "../components/FeaturedList";
import ChartCard from "../components/cards/ChartCard";
import SongCart from "../components/cards/SongCard";
import Text from "../components/Text";
import MyCarousel from "../components/Carousel";

import MusicData from "../graphql/GetMusic";
import { useQuery } from "@apollo/client";

const staticData = {
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

  // newReleases: {
  //   title: "New Releases",
  //   items: [
  //     {
  //       id: 1,
  //       imageUri: require("../assets/images/img2.png"),
  //       title: "Life in a bubble",
  //       subTitle: "The van",
  //     },
  //     {
  //       id: 2,
  //       imageUri: require("../assets/images/img3.png"),
  //       title: "Life in a bubble",
  //       subTitle: "The van",
  //     },
  //     {
  //       id: 3,
  //       imageUri: require("../assets/images/img4.png"),
  //       title: "Life in a bubble",
  //       subTitle: "The van",
  //     },
  //     {
  //       id: 4,
  //       imageUri: require("../assets/images/img5.png"),
  //       title: "Life in a bubble",
  //       subTitle: "The van",
  //     },
  //     {
  //       id: 5,
  //       imageUri: require("../assets/images/img6.png"),
  //       title: "Life in a bubble",
  //       subTitle: "The van",
  //     },
  //   ],
  // },
};

export default function HomeScreen() {
  const { loading, error, data } = useQuery(MusicData);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error : {error.message}</Text>;

  return (
    <Screen>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={[""]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={() => (
          <>
            <MainLogo color={colors.primary} style={styles.logo}></MainLogo>
            {/* <Image
              style={styles.mainPic}
              source={require("../assets/images/img1.png")}
            ></Image> */}
            <MyCarousel></MyCarousel>
            <FeaturedList title={staticData.topCharts.title}>
              <>
                {staticData.topCharts.items.map((item) => (
                  <ChartCard key={item.id} data={item} />
                ))}
              </>
            </FeaturedList>
            <FeaturedList title={"New Releases"}>
              <>
                {data.musics.nodes.map((item, index) => (
                  <SongCart
                    key={item.afmusicfields.track.id}
                    data={item}
                    ListData={data.musics.nodes}
                    index={index}
                  />
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
    marginLeft: 15,
  },
  mainPic: {
    width: "100%",
    borderRadius: 20,
  },
});
