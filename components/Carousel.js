import { useRef, useState, useEffect } from "react";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import { View, Dimensions, StyleSheet, Platform } from "react-native";
import axios from "axios";

import MusicData from "../graphql/GetMusic";
import { useQuery } from "@apollo/client";

const { width: screenWidth } = Dimensions.get("window");

const MyCarousel = (props) => {
  const [entries, setEntries] = useState([]);
  const carouselRef = useRef(null);
  const { loading, error, data } = useQuery(MusicData);

  useEffect(() => {
    // const ENTRIES1 = data.musics.nodes.map((node) => {
    //   return {
    //     illustration: node.featuredImage.node.mediaItemUrl,
    //   };
    // });
    // setEntries(ENTRIES1);

    const coverArray = [];

    axios
      .get("http://melodixapi.afarineshweb.ir/api/music?per_page=10")
      .then(function (response) {
        response.data.music.data.map((element, i) => {
          coverArray.push(element.cover);
        });

        setEntries([
          {
            illustration: coverArray[0],
          },
          {
            illustration: coverArray[1],
          },
          {
            illustration: coverArray[2],
          },
        ]);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  const renderItem = ({ item, index }, parallaxProps) => {
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={{ uri: item.illustration }}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          showSpinner={true}
          {...parallaxProps}
        />
      </View>
    );
  };

  const handleLoop = () => {
    if (carouselRef.current.currentIndex === entries.length - 1) {
      setTimeout(() => {
        carouselRef.current.snapToItem(0);
      }, 5000);
    } else return;
  };

  return (
    <View style={styles.container}>
      <Carousel
        inactiveSlideScale={1}
        ref={carouselRef}
        sliderWidth={screenWidth}
        sliderHeight={screenWidth}
        itemWidth={screenWidth - 60}
        data={entries}
        renderItem={renderItem}
        hasParallaxImages={true}
        autoplay={true}
        autoplayInterval={5000}
        loop={true}
        // useScrollView={true}
        // loopClonesPerSide={5}
      />
    </View>
  );
};

export default MyCarousel;

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    marginBottom: 15,
  },
  item: {
    width: screenWidth - 60,
    height: screenWidth - 180,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: "white",
    borderRadius: 8,
    marginHorizontal: 10,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "contain",
  },
});

// import * as React from "react";
// import { View, Image, Dimensions } from "react-native";
// import Animated, {
//   Extrapolate,
//   interpolate,
//   useAnimatedStyle,
//   useSharedValue,
// } from "react-native-reanimated";
// import Carousel from "react-native-reanimated-carousel";

// // import { ElementsText, window } from "../../constants";
// const { width: screenWidth } = Dimensions.get("window");
// import Colors from "../config/colors";

// const PAGE_WIDTH = screenWidth;
// const colors = [
//   "#26292E",
//   "#899F9C",
//   "#B3C680",
//   "#5C6265",
//   "#F5D399",
//   "#F1F1F1",
// ];

// function Item({ index }) {
//   return (
//     <View>
//       <Image
//         style={{ width: 400, height: PAGE_WIDTH * 0.7, borderRadius: 10 }}
//         source={{ uri: `https://loremflickr.com/400/300?lock=${index}` }}
//       ></Image>
//     </View>
//   );
// }

// function Index() {
//   const [isVertical, setIsVertical] = React.useState(false);
//   const [autoPlay, setAutoPlay] = React.useState(false);
//   const [pagingEnabled, setPagingEnabled] = React.useState(true);
//   const [snapEnabled, setSnapEnabled] = React.useState(true);
//   const progressValue = useSharedValue(0);
//   const baseOptions = isVertical
//     ? {
//         vertical: true,
//         width: PAGE_WIDTH * 0.66,
//         height: PAGE_WIDTH * 0.6,
//       }
//     : {
//         vertical: false,
//         width: PAGE_WIDTH,
//         height: PAGE_WIDTH * 0.7,
//       };

//   return (
//     <View
//       style={{
//         alignItems: "center",
//         backgroundColor: Colors.background,
//       }}
//     >
//       <Carousel
//         {...baseOptions}
//         style={{
//           width: PAGE_WIDTH,
//         }}
//         loop
//         pagingEnabled={pagingEnabled}
//         snapEnabled={snapEnabled}
//         autoPlay={autoPlay}
//         autoPlayInterval={1500}
//         onProgressChange={(_, absoluteProgress) =>
//           (progressValue.value = absoluteProgress)
//         }
//         mode="parallax"
//         modeConfig={{
//           parallaxScrollingScale: 0.9,
//           parallaxScrollingOffset: 50,
//         }}
//         data={colors}
//         renderItem={({ index }) => <Item index={index} />}
//       />
{
  /* {!!progressValue && (
        <View
          style={
            isVertical
              ? {
                  flexDirection: "column",
                  justifyContent: "space-between",
                  width: 10,
                  alignSelf: "center",
                  position: "absolute",
                  right: 5,
                  top: 40,
                }
              : {
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: 100,
                  alignSelf: "center",
                }
          }
        >
          {colors.map((backgroundColor, index) => {
            return (
              <PaginationItem
                backgroundColor={backgroundColor}
                animValue={progressValue}
                index={index}
                key={index}
                isRotate={isVertical}
                length={colors.length}
              />
            );
          })}
        </View>
      )}
      <SButton
        onPress={() => setAutoPlay(!autoPlay)}
      >{`${ElementsText.AUTOPLAY}:${autoPlay}`}</SButton>
      <SButton
        onPress={() => {
          setIsVertical(!isVertical);
        }}
      >
        {isVertical ? "Set horizontal" : "Set Vertical"}
      </SButton>
      <SButton
        onPress={() => {
          setPagingEnabled(!pagingEnabled);
        }}
      >
        {`pagingEnabled:${pagingEnabled}`}
      </SButton>
      <SButton
        onPress={() => {
          setSnapEnabled(!snapEnabled);
        }}
      >
        {`snapEnabled:${snapEnabled}`}
      </SButton> */
}
//     </View>
//   );
// }

// const PaginationItem = (props) => {
//   const { animValue, index, length, backgroundColor, isRotate } = props;
//   const width = 10;

//   const animStyle = useAnimatedStyle(() => {
//     let inputRange = [index - 1, index, index + 1];
//     let outputRange = [-width, 0, width];

//     if (index === 0 && animValue?.value > length - 1) {
//       inputRange = [length - 1, length, length + 1];
//       outputRange = [-width, 0, width];
//     }

//     return {
//       transform: [
//         {
//           translateX: interpolate(
//             animValue?.value,
//             inputRange,
//             outputRange,
//             Extrapolate.CLAMP
//           ),
//         },
//       ],
//     };
//   }, [animValue, index, length]);
//   return (
//     <View
//       style={{
//         backgroundColor: "white",
//         width,
//         height: width,
//         borderRadius: 50,
//         overflow: "hidden",
//         transform: [
//           {
//             rotateZ: isRotate ? "90deg" : "0deg",
//           },
//         ],
//       }}
//     >
//       <Animated.View
//         style={[
//           {
//             borderRadius: 50,
//             backgroundColor,
//             flex: 1,
//           },
//           animStyle,
//         ]}
//       />
//     </View>
//   );
// };

// export default Index;
