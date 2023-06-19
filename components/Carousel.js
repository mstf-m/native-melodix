import React, { useRef, useState, useEffect } from "react";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import { View, Dimensions, StyleSheet, Platform } from "react-native";

const ENTRIES1 = [
  {
    illustration:
      "https://dkstatics-public.digikala.com/digikala-adservice-banners/bad6f72fc55d6b73830ea2e4e933d090c8022f7b_1684909188.jpg?x-oss-process=image/quality,q_95/format,webp",
  },
  {
    illustration:
      "https://dkstatics-public.digikala.com/digikala-adservice-banners/283c552e485df2e567a09ceac4a2b1443e141c88_1684926127.jpg?x-oss-process=image/quality,q_95/format,webp",
  },
  {
    illustration:
      "https://dkstatics-public.digikala.com/digikala-adservice-banners/d49179fa3475f6d27a91e43e8e46e09e191bf2a1_1667980460.jpg?x-oss-process=image/quality,q_95/format,webp",
  },
  {
    illustration:
      "https://dkstatics-public.digikala.com/digikala-adservice-banners/8e00ff9276973d09fefb81d814b9a88bf7de9d4d_1677323290.jpg?x-oss-process=image/quality,q_95/format,webp",
  },
  {
    illustration:
      "https://dkstatics-public.digikala.com/digikala-adservice-banners/0aa91809f34e862a6cb5ed46eca4bb4d434088d0_1665866601.jpg?x-oss-process=image/quality,q_95",
  },
];
const { width: screenWidth } = Dimensions.get("window");

const MyCarousel = (props) => {
  const [entries, setEntries] = useState([]);
  const carouselRef = useRef(null);

  useEffect(() => {
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
