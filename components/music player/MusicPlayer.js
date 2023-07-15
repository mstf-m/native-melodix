// import React, { useState, useEffect } from "react";
// import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
// import { Audio } from "expo-av";
// import { MaterialIcons } from "@expo/vector-icons";
// import { Slider } from "@miblanchard/react-native-slider";
// import colors from "../../config/colors";

// const MusicPlayer = () => {
//   const [sound, setSound] = useState(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [volume, setVolume] = useState(1.0);
//   const [position, setPosition] = useState(0);
//   const [duration, setDuration] = useState(0);

//   useEffect(() => {
//     return sound
//       ? () => {
//           sound.unloadAsync();
//         }
//       : undefined;
//   }, [sound]);

//   const loadSound = async () => {
//     const { sound } = await Audio.Sound.createAsync(
//       require("../../assets/music.mp3")
//     );
//     setSound(sound);
//     sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
//   };

// const onPlaybackStatusUpdate = (status) => {
//   setIsPlaying(status.isPlaying);
//   setPosition(status.positionMillis);
//   setDuration(status.durationMillis);
// };

//   const playPause = async () => {
//     if (!sound) {
//       await loadSound();
//     } else {
//       if (isPlaying) {
//         await sound.pauseAsync();
//       } else {
//         await sound.playAsync();
//       }
//     }
//   };

//   const handleVolumeChange = (value) => {
//     setVolume(value);
//     if (sound) {
//       sound.setVolumeAsync(value);
//     }
//   };

//   const formatTime = (timeInMillis) => {
//     const minutes = Math.floor(timeInMillis / 60000);
//     const seconds = ((timeInMillis % 60000) / 1000).toFixed(0);
//     return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
//   };

//   return (
//     <View style={styles.container}>
//       {/* Display music information */}
//       <Image
//         source={require("../../assets/images/img1.png")}
//         style={styles.cover}
//       />
//       <Text style={styles.title}>Song Title</Text>
//       <Text style={styles.artist}>Artist Name</Text>

//       {/* Music controls */}
//       <View style={styles.controls}>
//         <TouchableOpacity onPress={playPause}>
//           <MaterialIcons
//             name={isPlaying ? "pause-circle-filled" : "play-circle-filled"}
//             size={50}
//             color="black"
//           />
//         </TouchableOpacity>
//       </View>

//       {/* Volume control */}
//       <Slider
//         style={styles.volumeSlider}
//         value={volume}
//         minimumValue={0.0}
//         maximumValue={1.0}
//         onValueChange={handleVolumeChange}
//         thumbTintColor="#000000"
//         minimumTrackTintColor="#000000"
//         maximumTrackTintColor="rgba(0, 0, 0, 0.3)"
//       />

//       {/* Music progress */}
//       <View style={styles.progress}>
//         <Text>{formatTime(position)}</Text>
//         <Slider
//           style={styles.progressSlider}
//           value={position}
//           maximumValue={duration}
//           thumbTintColor="#000000"
//           minimumTrackTintColor="#000000"
//           maximumTrackTintColor="rgba(0, 0, 0, 0.3)"
//         />
//         <Text>{formatTime(duration)}</Text>
//       </View>

//       {/* Mode changer (shuffle, repeat, etc.) */}
//       {/* Add your mode changer component here */}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: colors.primary,
//   },
//   cover: {
//     width: 50,
//     height: 50,
//     borderRadius: 100,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   artist: {
//     fontSize: 16,
//   },
//   controls: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   volumeSlider: {
//     width: 200,
//   },
//   progress: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     width: 300,
//   },
//   progressSlider: {
//     flex: 1,
//     marginLeft: 10,
//     marginRight: 10,
//   },
// });

// export default MusicPlayer;

import { useState, useEffect } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import Text from "../Text";
import { Audio } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "../Icon";
import colors from "../../config/colors";
import { useSelector, useDispatch } from "react-redux";
import { setMusicindex } from "../../store/Slices/playerVisibilitySlice";

export default function MusicPlayer() {
  const [Sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);

  const dispatch = useDispatch();
  var isVisible = useSelector((state) => state.playerVisibility.isVisible);
  var ListData = useSelector((state) => state.playerVisibility.MusicList);
  var index = useSelector((state) => state.playerVisibility.index);

  const onPlaybackStatusUpdate = (status) => {
    setIsPlaying(status.isPlaying);
  };

  const NextMusic = () => {
    if (index == ListData.length - 1) {
      dispatch(setMusicindex(0));
    } else {
      dispatch(setMusicindex(index + 1));
    }
    console.log(index);
  };

  const PreviousMusic = () => {
    if (index == 0) {
      dispatch(setMusicindex(ListData.length - 1));
    } else {
      dispatch(setMusicindex(index - 1));
    }
    console.log(index);
  };

  async function Pause() {
    await Sound.pauseAsync();
  }

  async function Play() {
    const { sound } = await Audio.Sound.createAsync({
      uri: ListData[index].afmusicfields.track.mediaItemUrl,
    });

    setSound(sound);
    sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);

    console.log("playing");
    await sound.playAsync();
  }

  useEffect(() => {
    if (isVisible) Play();
  }, [index]);

  useEffect(() => {
    return Sound
      ? () => {
          console.log("Unloading Sound");
          Sound.unloadAsync();
        }
      : undefined;
  }, [Sound]);

  return isVisible ? (
    <LinearGradient
      colors={["rgba(0, 255, 208, 0.7)", "rgba(126, 47, 255, 0.6)"]}
      start={[0, 0]}
      end={[1, 0]}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <View style={styles.info}>
          <Image
            style={styles.image}
            source={{ uri: ListData[index].featuredImage.node.mediaItemUrl }}
          ></Image>
          <View>
            <Text style={styles.title} numberOfLines={1}>
              {ListData[index].title}
            </Text>
            <Text style={styles.subTitle}>
              {ListData[index].afmusicfields.musicArtistRelationship[0].title}
            </Text>
          </View>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={PreviousMusic}>
            <Icon
              name={"stepbackward"}
              iconColor={colors.primary}
              size={40}
            ></Icon>
          </TouchableOpacity>
          <TouchableOpacity onPress={isPlaying ? Pause : Play}>
            <Icon
              name={isPlaying ? "pausecircle" : "play"}
              iconColor={colors.primary}
              size={60}
            ></Icon>
          </TouchableOpacity>
          <TouchableOpacity onPress={NextMusic}>
            <Icon
              name={"stepforward"}
              iconColor={colors.primary}
              size={40}
            ></Icon>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  ) : null;
}

const styles = StyleSheet.create({
  gradient: {
    flex: 0.1,
    width: "100%",
    position: "absolute",
    bottom: 50,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    width: 150,
  },
  subTitle: {
    fontSize: 14,
  },
  // fixedElement: {
  //   height: 100,
  //   position: "absolute",
  //   bottom: 2,
  // },
  // absoluteFill: {
  //   ...StyleSheet.absoluteFillObject,
  //   bottom: 0,
  // },
});
