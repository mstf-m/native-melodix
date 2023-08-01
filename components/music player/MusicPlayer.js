import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector, useDispatch } from "react-redux";
import { BlurView } from "expo-blur";
import { setMusicindex } from "../../store/Slices/playerVisibilitySlice";
import Slider from "@react-native-community/slider";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";

import colors from "../../config/colors";
import Icon from "../Icon";
import Text from "../Text";
import ActivityIndicator from "../ActivityIndicator";

const { height: screenHeight } = Dimensions.get("window");
const LOOPING_TYPE_ALL = 0;
const LOOPING_TYPE_ONE = 1;
const RATE_SCALE = 3.0;
const LOADING_STRING = "... loading ...";
const BUFFERING_STRING = "...buffering...";

export default function MusicPlayer() {
  const [isLarge, setIsLarge] = useState(false);

  const offset = useSharedValue({
    y: screenHeight - 80,
    h: 80,
    imageY: 0,
    imageX: 0,
    imageWidth: 60,
    imageHeight: 60,
  });
  const start = useSharedValue({
    y: screenHeight - 80,
    h: 80,
    imageY: 0,
    imageX: 0,
    imageWidth: 60,
    imageHeight: 60,
  });

  const containerAnimatedStyles = useAnimatedStyle(() => {
    return {
      height: withSpring(offset.value.h, { mass: 0.03 }),
      transform: [
        {
          translateY: withSpring(offset.value.y, { mass: 0.03 }),
        },
      ],
    };
  });

  const imageAnimatedStyles = useAnimatedStyle(() => {
    return {
      width: withSpring(offset.value.imageWidth, { mass: 0.03 }),
      height: withSpring(offset.value.imageHeight, { mass: 0.03 }),
      // transform: [
      //   {
      //     translateX: withSpring(offset.value.imageX, { mass: 0.03 }),
      //   },
      //   {
      //     translateY: withSpring(offset.value.imageY, { mass: 0.03 }),
      //   },
      // ],
    };
  });

  const toggleIsLarge = () =>
    offset.value.y === 0 ? setIsLarge(true) : setIsLarge(false);

  const gesture = Gesture.Pan()
    // .onBegin(() => {
    //   isPressed.value = true;
    // })
    .onUpdate((e) => {
      offset.value = {
        y: e.translationY + start.value.y,
        h: -e.translationY + start.value.h,
        imageHeight: -e.translationY + start.value.imageHeight,
        imageWidth: -e.translationY + start.value.imageWidth,
        // imageX: 0,
        // imageY: start.value.imageY,
      };
    })
    .onEnd(() => {
      if (start.value.y === screenHeight - 80) {
        offset.value.y < 750
          ? (offset.value = {
              y: 0,
              h: screenHeight + 200,
              imageHeight: 360,
              imageWidth: 360,
              imageY: 0,
              imageX: 0,
            })
          : (offset.value = {
              y: screenHeight - 80,
              h: 80,
              imageHeight: 60,
              imageWidth: 60,
              imageY: 0,
              imageX: 0,
            });
      } else if (start.value.y === 0) {
        offset.value.y < 10
          ? (offset.value = {
              y: 0,
              h: screenHeight + 200,
              imageHeight: 360,
              imageWidth: 360,
              imageY: 0,
              imageX: 0,
            })
          : (offset.value = {
              y: screenHeight - 80,
              h: 80,
              imageHeight: 60,
              imageWidth: 60,
              imageY: 0,
              imageX: 0,
            });
      }

      start.value = {
        y: offset.value.y,
        h: offset.value.h,
        imageHeight: 60,
        imageWidth: 60,
        imageX: 10,
        imageY: screenHeight - 70,
      };
    })
    .onFinalize(() => {
      runOnJS(toggleIsLarge)();
    });

  ///////////////////////////////////////////////////// Up for Animation ///////////////////////////////////////////////////////////

  const [Sound, setSound] = useState();

  const [playbackInstanceName, setPlaybackInstanceName] =
    useState(LOADING_STRING);
  const [loopingType, setLoopingType] = useState(0);
  const [muted, setMuted] = useState(false);
  const [position, setPosition] = useState(null);
  const [duration, setDuration] = useState(null);
  const [shouldPlay, setShouldPlay] = useState(true);
  const [isSeeking, setIsSeeking] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [shouldCorrectPitch, setShouldCorrectPitch] = useState(true);
  const [volume, setVolume] = useState(1.0);
  const [rate, setRate] = useState(1.0);
  const [throughEarpiece, setThroughEarpiece] = useState(true);
  const [shouldPlayAtEndOfSeek, setShouldPlayAtEndOfSeek] = useState(false);

  const dispatch = useDispatch();
  var isVisible = useSelector((state) => state.playerVisibility.isVisible);
  var ListData = useSelector((state) => state.playerVisibility.MusicList);
  var index = useSelector((state) => state.playerVisibility.index);
  var opacity = useSelector((state) => state.playerVisibility.opacity);

  useEffect(() => {
    Audio.setAudioModeAsync({
      staysActiveInBackground: true,
      interruptionModeIOS: InterruptionModeIOS.DoNotMix,
      interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: false,
      // playThroughEarpieceAndroid: true,
    });
  }, []);

  useEffect(() => {
    if (isVisible) _loadNewPlaybackInstance(shouldPlay);
  }, [isVisible]);

  const _loadNewPlaybackInstance = async (playing) => {
    if (Sound != null) {
      await Sound.unloadAsync();
      setSound(null);
    }

    const source = ListData[index].afmusicfields.track.mediaItemUrl; // server needs change
    const initialStatus = {
      shouldPlay: playing,
      rate,
      shouldCorrectPitch: true,
      volume,
      isMuted: muted,
      isLooping: loopingType === LOOPING_TYPE_ONE,
    };

    const { sound, status } = await Audio.Sound.createAsync(
      source,
      initialStatus,
      _onPlaybackStatusUpdate
    );
    setSound(sound);

    _updateScreenForLoading(false);
  };

  const _updateScreenForLoading = (isLoading) => {
    if (isLoading) {
      setIsPlaying(false);
      setPlaybackInstanceName(LOADING_STRING);
      setDuration(null);
      setPosition(null);
      setIsLoading(true);
    } else {
      setPlaybackInstanceName(
        ListData[index].afmusicfields.musicArtistRelationship[0].title
      ); // ????
      setIsLoading(false);
    }
  };

  const _onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis);
      setDuration(status.durationMillis);
      setShouldPlay(status.shouldPlay);
      setIsPlaying(status.isPlaying);
      setIsBuffering(status.isBuffering);
      setRate(status.rate);
      setMuted(status.isMuted);
      setVolume(status.volume);
      setLoopingType(status.isLooping ? LOOPING_TYPE_ONE : LOOPING_TYPE_ALL);
      setShouldCorrectPitch(shouldCorrectPitch);
      if (status.didJustFinish && !status.isLooping) {
        _advanceIndex(true);
        _updatePlaybackInstanceForIndex(true);
      }
    } else {
      if (status.error) {
        console.log(`FATAL PLAYER ERROR: ${status.error}`);
      }
    }
  };

  const _advanceIndex = (forward) => {
    if (forward) {
      if (index == ListData.length - 1) {
        dispatch(setMusicindex(0));
      } else {
        dispatch(setMusicindex(index + 1));
      }
    } else {
      if (index == 0) {
        dispatch(setMusicindex(ListData.length - 1));
      } else {
        dispatch(setMusicindex(index - 1));
      }
    }
  };

  const _updatePlaybackInstanceForIndex = (playing) => {
    _updateScreenForLoading(true);
    _loadNewPlaybackInstance(playing);
  };

  const _onPlayPausePressed = () => {
    if (Sound != null) {
      if (isPlaying) {
        Sound.pauseAsync();
      } else {
        Sound.playAsync();
      }
    }
  };

  const _onStopPressed = () => {
    if (Sound != null) {
      Sound.stopAsync();
    }
  };

  const _onForwardPressed = () => {
    if (Sound !== null) {
      _advanceIndex(true);
      _updatePlaybackInstanceForIndex(shouldPlay);
    }
  };

  const _onBackPressed = () => {
    if (Sound !== null) {
      _advanceIndex(false);
      _updatePlaybackInstanceForIndex(shouldPlay);
    }
  };

  const _onMutePressed = () => {
    if (Sound !== null) {
      Sound.setIsMutedAsync(!muted);
    }
  };

  const _onLoopPressed = () => {
    if (Sound !== null) {
      Sound.setIsLoopingAsync(loopingType !== LOOPING_TYPE_ONE);
    }
  };

  const _onVolumeSliderValueChange = (value) => {
    if (Sound !== null) {
      Sound.setVolumeAsync(value);
    }
  };

  const _trySetRate = async (rate, shouldCorrectPitch) => {
    if (Sound !== null) {
      try {
        await Sound.setRateAsync(rate, shouldCorrectPitch);
      } catch (error) {
        // Rate changing could not be performed, possibly because the client's Android API is too old.
      }
    }
  };

  const _onRateSliderSlidingComplete = async (value) => {
    _trySetRate(value * RATE_SCALE, shouldCorrectPitch);
  };

  const _onPitchCorrectionPressed = async (value) => {
    _trySetRate(rate, !shouldCorrectPitch);
  };

  const _onSeekSliderValueChange = () => {
    if (Sound != null && !isSeeking) {
      setIsSeeking(true);
      setShouldPlayAtEndOfSeek(shouldPlay);
      Sound.pauseAsync();
    }
  };

  const _onSeekSliderSlidingComplete = async (value) => {
    if (Sound != null) {
      setIsSeeking(false);
      const seekPosition = value * duration;
      if (shouldPlayAtEndOfSeek) {
        Sound.playFromPositionAsync(seekPosition);
      } else {
        Sound.setPositionAsync(seekPosition);
      }
    }
  };

  const _getSeekSliderPosition = () => {
    if (Sound != null && position != null && duration != null) {
      return position / duration;
      console.log("first");
    }
    return 0;
  };

  const _getMMSSFromMillis = (millis) => {
    const totalSeconds = millis / 1000;
    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor(totalSeconds / 60);

    const padWithZero = (number) => {
      const string = number.toString();
      if (number < 10) {
        return "0" + string;
      }
      return string;
    };
    return padWithZero(minutes) + ":" + padWithZero(seconds);
  };

  const _getTimestamp = () => {
    if (Sound != null && position != null && duration != null) {
      return `${_getMMSSFromMillis(position)} / ${_getMMSSFromMillis(
        duration
      )}`;
    }
    return "";
  };

  const _onSpeakerPressed = () => {
    setThroughEarpiece(!throughEarpiece);
    Audio.setAudioModeAsync({
      staysActiveInBackground: true,
      interruptionModeIOS: InterruptionModeIOS.DoNotMix,
      interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
      playsInSilentModeIOS: true,
      // shouldDuckAndroid: false,
      playThroughEarpieceAndroid: throughEarpiece,
    });
  };

  // const handleSliderValueChange = async (value) => {
  //   setSliderValue(value);
  //   if (Sound) {
  //     // await Sound.setPositionAsync(value * Sound.getDurationMillis());
  //     await Sound.playFromPositionAsync(value * duration);
  //   }
  // };

  // const NextMusic = () => {
  //   if (index == ListData.length - 1) {
  //     dispatch(setMusicindex(0));
  //   } else {
  //     dispatch(setMusicindex(index + 1));
  //   }
  //   console.log(index);
  // };

  // const PreviousMusic = () => {
  //   if (index == 0) {
  //     dispatch(setMusicindex(ListData.length - 1));
  //   } else {
  //     dispatch(setMusicindex(index - 1));
  //   }
  //   console.log(index);
  // };

  // async function Pause() {
  //   await Sound.pauseAsync();
  // }

  // async function Play() {
  //   console.log(opacity);
  //   const { sound } = await Audio.Sound.createAsync(
  //     ListData[index].afmusicfields.track.mediaItemUrl // server needs change
  //   );

  //   setSound(sound);
  //   sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);

  //   console.log("playing");
  //   await sound.playAsync();
  // }

  // useEffect(() => {
  //   return Sound
  //     ? () => {
  //         console.log("Unloading Sound");
  //         Sound.unloadAsync();
  //       }
  //     : undefined;
  // }, [Sound]);

  return isVisible ? (
    <>
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.ball, containerAnimatedStyles]}>
          <BlurView
            intensity={6}
            blurReductionFactor={0.5}
            tint="light"
            style={{ flex: 1 }}
          >
            <LinearGradient
              colors={["rgba(0, 255, 208, 0.2)", "rgba(126, 47, 255, 0.2)"]}
              start={[0, 0]}
              end={[1, 0]}
              style={[styles.gradient, { opacity: opacity }]}
            >
              <View style={isLarge ? styles.LargeContainer : styles.container}>
                <View style={isLarge ? styles.infoVertical : styles.info}>
                  <Animated.Image
                    style={[styles.image, imageAnimatedStyles]}
                    source={ListData[index].featuredImage.node.mediaItemUrl} // server needs change
                  ></Animated.Image>
                  <View>
                    <Text style={styles.title} numberOfLines={1}>
                      {ListData[index].title}
                    </Text>
                    <Text style={styles.subTitle}>
                      {
                        ListData[index].afmusicfields.musicArtistRelationship[0]
                          .title
                      }
                    </Text>
                  </View>
                </View>

                <View style={styles.iconContainer}>
                  <TouchableOpacity onPress={_onBackPressed}>
                    <Icon
                      name={"stepbackward"}
                      iconColor={colors.white}
                      size={40}
                    ></Icon>
                  </TouchableOpacity>
                  {isLoading ? (
                    <View style={styles.animation}>
                      <ActivityIndicator isLarge={false} />
                    </View>
                  ) : (
                    <TouchableOpacity
                      onPress={_onPlayPausePressed}
                      disabled={isLoading}
                    >
                      <Icon
                        name={isPlaying ? "pausecircle" : "play"}
                        iconColor={colors.white}
                        size={60}
                      ></Icon>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity onPress={_onForwardPressed}>
                    <Icon
                      name={"stepforward"}
                      iconColor={colors.white}
                      size={40}
                    ></Icon>
                  </TouchableOpacity>
                </View>
              </View>
            </LinearGradient>
          </BlurView>
        </Animated.View>
      </GestureDetector>
      {isLarge ? (
        <Slider
          style={{
            bottom: 270,
            marginHorizontal: 16,
            height: 40,
            alignSelf: "stretch",
          }}
          value={_getSeekSliderPosition()}
          onValueChange={_onSeekSliderSlidingComplete}
          onSlidingComplete={_onSeekSliderSlidingComplete}
          disabled={isLoading}
          thumbTintColor="#000"
          minimumTrackTintColor="#000"
          maximumTrackTintColor="#999"
        />
      ) : null}
    </>
  ) : null;
}

const styles = StyleSheet.create({
  ball: {
    position: "absolute",
    width: "100%",
  },
  gradient: {
    height: "100%",
    width: "100%",
    position: "absolute",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  LargeContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 16,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoVertical: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: screenHeight * 0.1,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    // width: 60,
    // height: 60,
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
  animation: {
    marginHorizontal: 30,
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
