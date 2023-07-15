import { useRef, useState, useEffect } from "react";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import { View, Dimensions, StyleSheet, Platform } from "react-native";

import MusicData from "../graphql/GetMusic";
import { useQuery } from "@apollo/client";

const { width: screenWidth } = Dimensions.get("window");

const MyCarousel = (props) => {
  const [entries, setEntries] = useState([]);
  const carouselRef = useRef(null);
  const { loading, error, data } = useQuery(MusicData);

  useEffect(() => {
    const ENTRIES1 = data.musics.nodes.map((node) => {
      return {
        illustration: node.featuredImage.node.mediaItemUrl,
      };
    });
    setEntries(ENTRIES1);
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
        loop={true}
      />
    </View>
  );
};

export default MyCarousel;

const styles = StyleSheet.create({
  container: {
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
    resizeMode: "cover",
  },
});
