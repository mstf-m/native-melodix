import { StyleSheet, View, FlatList, Image } from "react-native";
import Screen from "../components/Screen";
import colors from "../config/colors";
import MainLogo from "../assets/SVGs/MainLogo";
import FeaturedList from "../components/FeaturedList";
import ChartCard from "../components/cards/ChartCard";
import SongCart from "../components/cards/SongCard";
import Text from "../components/Text";
import MyCarousel from "../components/Carousel";
import Button from "../components/Button";

import MusicData from "../graphql/GetMusic";
import { useQuery } from "@apollo/client";
import { NetworkStatus } from "@apollo/client";
import ActivityIndicator from "../components/ActivityIndicator";

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

  musics: {
    nodes: [
      {
        title: "ja dare",
        afmusicfields: {
          musicArtistRelationship: [
            {
              id: "123",
              title: "javad",
            },
          ],
          track: {
            id: "456",
            mediaItemUrl: require("../assets/madahi.mp3"),
          },
        },
        featuredImage: {
          node: {
            mediaItemUrl: require("../assets/profilePic.jpg"),
          },
        },
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
  // const { loading, error, data, refetch, networkStatus } = useQuery(MusicData, {
  //   notifyOnNetworkStatusChange: true,
  // });

  // if (loading || networkStatus === NetworkStatus.refetch)
  //   return <ActivityIndicator />;
  // if (error) {
  //   console.log(error);
  //   return (
  //     <View style={styles.errorContainer}>
  //       <Text>Error : {error.message}</Text>
  //       <Button style={styles.retry} onPress={() => refetch()}>
  //         <Text style={styles.retryText}>Retry</Text>
  //       </Button>
  //     </View>
  //   );
  // }

  return (
    <Screen>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={[""]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={() => (
          <>
            <MainLogo color={colors.primary} style={styles.logo}></MainLogo>

            <MyCarousel></MyCarousel>
            <FeaturedList title={staticData.topCharts.title}>
              <>
                {staticData.topCharts.items.map((item, index) => (
                  <ChartCard key={item.id} data={item} index={index} />
                ))}
              </>
            </FeaturedList>
            <FeaturedList title={"New Releases"}>
              <>
                {staticData.musics.nodes.map((item, index) => (
                  <SongCart
                    key={item.afmusicfields.track.id}
                    data={item}
                    ListData={staticData.musics.nodes}
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
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  retry: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  retryText: {
    color: colors.background,
  },
  logo: {
    marginVertical: 15,
    marginLeft: 15,
  },
});
