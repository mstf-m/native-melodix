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

// import MusicData from "../graphql/GetMusic";
// import { useQuery } from "@apollo/client";
// import { NetworkStatus } from "@apollo/client";
import ActivityIndicator from "../components/ActivityIndicator";
import { useState, useEffect } from "react";
import axios from "axios";

// staticData= {
//   topCharts: {
//     title: "Top Charts",
//     items: [
//       {
//         id: 1,
//         imageUri: require("../assets/images/p1.png"),
//         title: "Golden age of 80s",
//         subTitle: "Sean swadder",
//         duration: "2:34:45",
//         liked: false,
//       },
//       {
//         id: 2,
//         imageUri: require("../assets/images/p2.png"),
//         title: "Golden age of 80s",
//         subTitle: "Sean swadder",
//         duration: "2:34:45",
//         liked: false,
//       },
//       {
//         id: 3,
//         imageUri: require("../assets/images/p3.png"),
//         title: "Golden age of 80s",
//         subTitle: "Sean swadder",
//         duration: "2:34:45",
//         liked: false,
//       },
//     ],
//   },

//   musics: {
//     nodes: [
//       {
//         title: "madahi",
//         afmusicfields: {
//           musicArtistRelationship: [
//             {
//               id: "123",
//               title: "javad0",
//             },
//           ],
//           track: {
//             id: "456",
//             mediaItemUrl: require("../assets/madahi.mp3"),
//           },
//         },
//         featuredImage: {
//           node: {
//             mediaItemUrl: require("../assets/profilePic.jpg"),
//           },
//         },
//       },
//       {
//         title: "madahi",
//         afmusicfields: {
//           musicArtistRelationship: [
//             {
//               id: "123",
//               title: "javad1",
//             },
//           ],
//           track: {
//             id: "456",
//             mediaItemUrl: require("../assets/madahi1.mp3"),
//           },
//         },
//         featuredImage: {
//           node: {
//             mediaItemUrl: require("../assets/profilePic.jpg"),
//           },
//         },
//       },
//       {
//         title: "madahi",
//         afmusicfields: {
//           musicArtistRelationship: [
//             {
//               id: "123",
//               title: "javad2",
//             },
//           ],
//           track: {
//             id: "456",
//             mediaItemUrl: require("../assets/madahi2.mp3"),
//           },
//         },
//         featuredImage: {
//           node: {
//             mediaItemUrl: require("../assets/profilePic.jpg"),
//           },
//         },
//       },
//       {
//         title: "madahi",
//         afmusicfields: {
//           musicArtistRelationship: [
//             {
//               id: "123",
//               title: "javad3",
//             },
//           ],
//           track: {
//             id: "456",
//             mediaItemUrl: require("../assets/madahi3.mp3"),
//           },
//         },
//         featuredImage: {
//           node: {
//             mediaItemUrl: require("../assets/profilePic.jpg"),
//           },
//         },
//       },
//     ],
//   },

//   // newReleases: {
//   //   title: "New Releases",
//   //   items: [
//   //     {
//   //       id: 1,
//   //       imageUri: require("../assets/images/img2.png"),
//   //       title: "Life in a bubble",
//   //       subTitle: "The van",
//   //     },
//   //     {
//   //       id: 2,
//   //       imageUri: require("../assets/images/img3.png"),
//   //       title: "Life in a bubble",
//   //       subTitle: "The van",
//   //     },
//   //     {
//   //       id: 3,
//   //       imageUri: require("../assets/images/img4.png"),
//   //       title: "Life in a bubble",
//   //       subTitle: "The van",
//   //     },
//   //     {
//   //       id: 4,
//   //       imageUri: require("../assets/images/img5.png"),
//   //       title: "Life in a bubble",
//   //       subTitle: "The van",
//   //     },
//   //     {
//   //       id: 5,
//   //       imageUri: require("../assets/images/img6.png"),
//   //       title: "Life in a bubble",
//   //       subTitle: "The van",
//   //     },
//   //   ],
//   // },
// };

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

  const [staticData, setStaticData] = useState(null);
  const [staticData2, setStaticData2] = useState(null);

  useEffect(() => {
    const fetchData2 = async () => {
      try {
        const response = await axios.get(
          "http://melodixapi.afarineshweb.ir/api/album"
        );

        setStaticData2({
          topCharts: {
            title: "Top Charts",
            items: [
              {
                id: 1,
                imageUri: response.data.album.data[0].cover,
                title: response.data.album.data[0].title,
                subTitle: "Sean swadder",
                duration: response.data.album.data[0].release_date,
                liked: false,
              },
              {
                id: 2,
                imageUri: response.data.album.data[1].cover,
                title: response.data.album.data[1].title,
                subTitle: "Sean swadder",
                duration: response.data.album.data[0].release_date,
                liked: false,
              },
              {
                id: 3,
                imageUri: response.data.album.data[2].cover,
                title: response.data.album.data[2].title,
                subTitle: "Sean swadder",
                duration: response.data.album.data[0].release_date,
                liked: false,
              },
            ],
          },
        });
      } catch (error) {
        console.error(error);
      }
    };

    const fetchData1 = async () => {
      try {
        const response = await axios.get(
          "http://melodixapi.afarineshweb.ir/api/music?per_page=10"
        );
        setStaticData(response.data.music.data);

        // setStaticData({
        //   musics: {
        //     nodes: [
        //       {
        //         title: dataArray[0].title,
        //         afmusicfields: {
        //           musicArtistRelationship: [
        //             {
        //               id: "123",
        //               title: dataArray[0].title,
        //             },
        //           ],
        //           track: {
        //             id: "456",
        //             mediaItemUrl: dataArray[0].track,
        //           },
        //         },
        //         featuredImage: {
        //           node: {
        //             mediaItemUrl: dataArray[0].cover,
        //           },
        //         },
        //       },
        //       {
        //         title: dataArray[1].title,
        //         afmusicfields: {
        //           musicArtistRelationship: [
        //             {
        //               id: "123",
        //               title: dataArray[1].title,
        //             },
        //           ],
        //           track: {
        //             id: "456",
        //             mediaItemUrl: dataArray[1].track,
        //           },
        //         },
        //         featuredImage: {
        //           node: {
        //             mediaItemUrl: dataArray[1].cover,
        //           },
        //         },
        //       },
        //       {
        //         title: dataArray[2].title,
        //         afmusicfields: {
        //           musicArtistRelationship: [
        //             {
        //               id: "123",
        //               title: dataArray[2].title,
        //             },
        //           ],
        //           track: {
        //             id: "456",
        //             mediaItemUrl: dataArray[2].track,
        //           },
        //         },
        //         featuredImage: {
        //           node: {
        //             mediaItemUrl: dataArray[2].cover,
        //           },
        //         },
        //       },
        //       {
        //         title: dataArray[3].title,
        //         afmusicfields: {
        //           musicArtistRelationship: [
        //             {
        //               id: "123",
        //               title: dataArray[3].title,
        //             },
        //           ],
        //           track: {
        //             id: "456",
        //             mediaItemUrl: dataArray[3].track,
        //           },
        //         },
        //         featuredImage: {
        //           node: {
        //             mediaItemUrl: dataArray[3].cover,
        //           },
        //         },
        //       },
        //       {
        //         title: dataArray[4].title,
        //         afmusicfields: {
        //           musicArtistRelationship: [
        //             {
        //               id: "123",
        //               title: dataArray[4].title,
        //             },
        //           ],
        //           track: {
        //             id: "456",
        //             mediaItemUrl: dataArray[4].track,
        //           },
        //         },
        //         featuredImage: {
        //           node: {
        //             mediaItemUrl: dataArray[4].cover,
        //           },
        //         },
        //       },
        //       {
        //         title: dataArray[5].title,
        //         afmusicfields: {
        //           musicArtistRelationship: [
        //             {
        //               id: "123",
        //               title: dataArray[5].title,
        //             },
        //           ],
        //           track: {
        //             id: "456",
        //             mediaItemUrl: dataArray[5].track,
        //           },
        //         },
        //         featuredImage: {
        //           node: {
        //             mediaItemUrl: dataArray[5].cover,
        //           },
        //         },
        //       },
        //       {
        //         title: dataArray[6].title,
        //         afmusicfields: {
        //           musicArtistRelationship: [
        //             {
        //               id: "123",
        //               title: dataArray[6].title,
        //             },
        //           ],
        //           track: {
        //             id: "456",
        //             mediaItemUrl: dataArray[6].track,
        //           },
        //         },
        //         featuredImage: {
        //           node: {
        //             mediaItemUrl: dataArray[6].cover,
        //           },
        //         },
        //       },
        //     ],
        //   },
        // });
        
      } catch (error) {
        console.error(error);
      }
    };

    fetchData1();
    fetchData2();
  }, []);

  return (
    <Screen>
      {staticData && staticData2 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={[""]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={() => (
            <>
              <MyCarousel></MyCarousel>
              <FeaturedList title={staticData2.topCharts.title}>
                <>
                  {staticData2.topCharts.items.map((item, index) => (
                    <ChartCard key={item.id} data={item} index={index} />
                  ))}
                </>
              </FeaturedList>
              <FeaturedList title={"New Releases"}>
                <>
                  {staticData.map((item, index) => (
                    <SongCart
                      key={`${item.id} New Releases`}
                      data={item}
                      ListData={staticData}
                      index={index}
                    />
                  ))}
                </>
              </FeaturedList>
              <FeaturedList title={"Trending"}>
                <>
                  {staticData.map((item, index) => (
                    <SongCart
                      key={`${item.id} Trending`}
                      data={item}
                      ListData={staticData}
                      index={index}
                    />
                  ))}
                </>
              </FeaturedList>
              <FeaturedList title={"Popular"}>
                <>
                  {staticData.map((item, index) => (
                    <SongCart
                      key={`${item.id} Popular`}
                      data={item}
                      ListData={staticData}
                      index={index}
                    />
                  ))}
                </>
              </FeaturedList>
            </>
          )}
        />
      ) : (
        <ActivityIndicator />
      )}
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
