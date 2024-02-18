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
import { setMusicindex ,noneVisibility } from "../../store/Slices/playerVisibilitySlice";
import Slider from "@react-native-community/slider";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";

import colors from "../../config/colors";
import Text from "../Text";
import ActivityIndicator from "../ActivityIndicator";
import Play from "../../assets/SVGs/Play";
import Pause from "../../assets/SVGs/Pause";
import Forward from "../../assets/SVGs/Forward";
import Back from "../../assets/SVGs/Back";

const { height: screenHeight, width: screenWidth } = Dimensions.get("window");
const LOOPING_TYPE_ALL = 0;
const LOOPING_TYPE_ONE = 1;
const RATE_SCALE = 3.0;
const LOADING_STRING = "... loading ...";
const BUFFERING_STRING = "...buffering...";

export default function MusicPlayer() {

  const [Sound, setSound] = useState();

  const [playbackInstanceName, setPlaybackInstanceName] =
    useState(LOADING_STRING);
  const [loopingType, setLoopingType] = useState(LOOPING_TYPE_ALL);
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

  // useEffect(() => {
  //   return Sound
  //     ? () => {
  //         console.log("Unloading Sound");
  //         Sound.unloadAsync();
  //         Sound.setOnPlaybackStatusUpdate(null);
  //         setSound(null);
  //       }
  //     : undefined;
  // }, [Sound]);

  const _loadNewPlaybackInstance = async (playing) => {
    if (Sound != null) {
      await Sound.unloadAsync();
      Sound.setOnPlaybackStatusUpdate(null);
      setSound(null);
    }

    console.log(index);

    const source = { uri: ListData[index].track }; // server needs change
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
        ListData[index].title
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
    dispatch(
      setMusicindex(
        (index + (forward ? 1 : ListData.length - 1)) % ListData.length
      )
    );
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


 ///////////////////////////////////////////////////// Below for Animation ///////////////////////////////////////////////////////////

  const [isLarge, setIsLarge] = useState(false);

  const offset = useSharedValue({
    y: screenHeight - 80,
    x: 0,
    h: 80,
    opacity: 1,
  });
  const start = useSharedValue({
    y: screenHeight - 80,
    h: 80,
  });

  const playerAnimatedStyles = useAnimatedStyle(() => {
    return {
      height: withSpring(offset.value.h, { mass: 0.3 }),
      transform: [
        {
          translateY: withSpring(offset.value.y, { mass: 0.3 }),
        },
        {
          translateX: withSpring(offset.value.x, { mass: 0.3 })
        }
      ],
    };
  });

  const containerAnimatedStyles = useAnimatedStyle(() => {
    return {
      opacity: offset.value.opacity,
    };
  });

  const toggleIsLarge = () =>
    offset.value.y === 0 ? setIsLarge(true) : setIsLarge(false);

    const deleteMusic = async () =>{
      if (Sound != null) {
        await Sound.unloadAsync();
        Sound.setOnPlaybackStatusUpdate(null);
        setSound(null);
      }
      // console.log(isVisible);
      dispatch(noneVisibility());
      console.log(isVisible);
    }

  const dragGesture = Gesture.Pan().minDistance(20)
    .onUpdate((e) => {
      offset.value = {
        x:0,
        y: e.translationY + start.value.y,
        h: -e.translationY + start.value.h,
        opacity:
          start.value.y === 0
            ? 1 - e.translationY / 300
            : 1 + e.translationY / 300,
      };
    })
    .onEnd(() => {
      if (start.value.y === screenHeight - 80) {
        offset.value.y < 700
          ? (offset.value = {
              x:0,
              y: 0,
              h: screenHeight + 200,
              opacity:1
            })
          : (offset.value = {
              x:0,
              y: screenHeight - 80,
              h: 80,
              opacity:1
            });
      } else if (start.value.y === 0) {
        offset.value.y < 10
          ? (offset.value = {
              x:0,
              y: 0,
              h: screenHeight + 200,
              opacity:1
            })
          : (offset.value = {
              x:0,
              y: screenHeight - 80,
              h: 80,
              opacity:1
            });
      }

      start.value = {
        y: offset.value.y,
        h: offset.value.h,
      };
    })
    .onFinalize(() => {
      runOnJS(toggleIsLarge)();
    });


    const deleteGesture = Gesture.Pan().activeOffsetX(5)
    .onUpdate((e) => {
      console.log(e.absoluteX)
      offset.value = {
        x: e.translationX,
        y: screenHeight - 80,
        h: 80,
        opacity:  50 / Math.abs(e.translationX)
      };
    })
    .onEnd(() => {
        offset.value.x < screenWidth/3
          ? (offset.value = {
              x: 0, 
              y: screenHeight - 80,
              h: 80,
              opacity: 1,
            })
          : ((offset.value = {
            x: screenWidth +100, 
            y: screenHeight - 80,
            h: 80,
            opacity: 1,
          }),
          runOnJS(deleteMusic)()
          );
    })

    const composed = Gesture.Race(dragGesture, deleteGesture);

  return isVisible ? (
    <>
      <Animated.View style={[styles.ball, playerAnimatedStyles]}>
        <GestureDetector gesture={composed}>
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
              <Animated.View
                style={[
                  isLarge ? styles.LargeContainer : styles.container,
                  containerAnimatedStyles,
                ]}
              >
                <View style={isLarge ? styles.infoVertical : styles.info}>
                  <Image
                    style={isLarge ? styles.largeImage : styles.image}
                    source={{
                      uri: ListData[index].cover,
                    }} // server needs change
                  ></Image>
                  <View style={isLarge ? styles.textContainer : null}>
                    <Text style={styles.title} numberOfLines={1}>
                      {ListData[index].title}
                    </Text>
                    <Text style={styles.subTitle}>
                      {
                        ListData[index].title
                      }
                    </Text>
                  </View>
                </View>

                <View
                  style={
                    isLarge ? styles.largeIconContainer : styles.iconContainer
                  }
                >
                  <TouchableOpacity onPress={_onBackPressed}>
                    <View style={styles.svgBox}>
                      <Back />
                    </View>
                  </TouchableOpacity>
                  {isLoading ? (
                    <View style={styles.animation}>
                      <ActivityIndicator isLarge={isLarge ? true : false} />
                    </View>
                  ) : (
                    <TouchableOpacity
                      onPress={_onPlayPausePressed}
                      disabled={isLoading}
                    >
                      {isPlaying ? <Pause /> : <Play />}
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity onPress={_onForwardPressed}>
                    <View style={styles.svgBox}>
                      <Forward />
                    </View>
                  </TouchableOpacity>
                </View>
              </Animated.View>
            </LinearGradient>
          </BlurView>
        </GestureDetector>

        {isLarge ? (
          <Animated.View
            style={[styles.sliderContainer, containerAnimatedStyles]}
          >
            <Text style={styles.timeStamp}>{_getTimestamp()}</Text>
            <Slider
              style={styles.soundSlider}
              value={_getSeekSliderPosition()}
              onValueChange={_onSeekSliderSlidingComplete}
              onSlidingComplete={_onSeekSliderSlidingComplete}
              disabled={isLoading}
              thumbTintColor={colors.primary}
              minimumTrackTintColor={colors.primary}
              maximumTrackTintColor="rgba(255, 255, 255, 1)"
            />
          </Animated.View>
        ) : null}
      </Animated.View>
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
    gap: 10,
  },
  infoVertical: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: screenHeight * 0.1,
  },
  textContainer: {
    alignItems: "center",
    marginTop: 16,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginRight: 10,
  },
  largeIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: screenHeight * 0.15,
    gap: screenWidth * 0.08,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  largeImage: {
    width: screenWidth * 0.88,
    height: screenWidth * 0.88,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    // width: 150,
  },
  subTitle: {
    fontSize: 14,
  },
  animation: {
    marginHorizontal: 30,
  },
  svgBox: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  sliderContainer: {
    position: "absolute",
    top: screenHeight * 0.84,
    width: screenWidth * 0.85,
    height: 40,
    alignSelf: "center",
  },
  timeStamp: {
    alignSelf: "flex-end",
    fontSize: 12,
    marginRight: 15,
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
