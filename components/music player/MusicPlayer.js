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
import {
  View,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import Text from "../Text";
import { Audio } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "../Icon";
import colors from "../../config/colors";

export default function MusicPlayer() {
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);

  const onPlaybackStatusUpdate = (status) => {
    setIsPlaying(status.isPlaying);
  };

  async function PlayPause() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/music.mp3")
    );
    setSound(sound);
    sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);

    console.log("Playing Sound");
    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <LinearGradient
      colors={["rgba(0, 255, 208, 0.4)", "rgba(126, 47, 255, 0.3)"]}
      start={[0, 0]}
      end={[1, 0]}
      style={{ flex: 0.1 }}
    >
      <View style={styles.container}>
        <View style={styles.info}>
          <Image
            style={styles.image}
            source={require("../../assets/images/img6.png")}
          ></Image>
          <View>
            <Text style={styles.title}>You You</Text>
            <Text style={styles.subTitle}>Mahdi Ali</Text>
          </View>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity>
            <Icon
              name={"stepbackward"}
              iconColor={colors.primary}
              size={40}
            ></Icon>
          </TouchableOpacity>
          <TouchableOpacity onPress={PlayPause}>
            <Icon
              name={isPlaying ? "pausecircle" : "play"}
              iconColor={colors.primary}
              size={60}
            ></Icon>
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon
              name={"stepforward"}
              iconColor={colors.primary}
              size={40}
            ></Icon>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
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
    borderRadius: 40,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
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
