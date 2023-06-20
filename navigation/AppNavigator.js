import HomeNavigator from "./HomeNavigator";
import BrowseNavigator from "./BrowseNavigator";
import TrendingNavigator from "./TrendingNavigator";
import SearchNavigator from "./SearchNavigator";
import ProfileNavigator from "./ProfileNavigator";

import HomeSvg from "../assets/SVGs/Home";
import PalaylistSvg from "../assets/SVGs/Playlist";
import DiscSvg from "../assets/SVGs/Disc";
import SearchSvg from "../assets/SVGs/Search";
import ProfileSvg from "../assets/SVGs/Profile";

import colors from "../config/colors";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarShowLabel: false,
      headerShown: false,
      tabBarIcon: ({ focused, color, size }) => {
        if (route.name === "HomeTab") {
          // return <HomeSvg color={color}></HomeSvg>;
          return <Ionicons name="home-sharp" size={20} color={color} />;
        } else if (route.name === "BrowseTab") {
          return <PalaylistSvg color={color}></PalaylistSvg>;
        } else if (route.name === "TrendingTab") {
          return <DiscSvg color={color}></DiscSvg>;
        } else if (route.name === "SearchTab") {
          // return <SearchSvg color={color}></SearchSvg>;
          return <Ionicons name="md-search" size={20} color={color} />;
        } else if (route.name === "ProfileTab") {
          // return <ProfileSvg color={color}></ProfileSvg>;
          return <Ionicons name="person" size={20} color={color} />;
        }
      },
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.gray,
    })}
  >
    <Tab.Screen name="HomeTab" component={HomeNavigator} />
    <Tab.Screen name="BrowseTab" component={BrowseNavigator} />
    <Tab.Screen name="TrendingTab" component={TrendingNavigator} />
    <Tab.Screen name="SearchTab" component={SearchNavigator} />
    <Tab.Screen name="ProfileTab" component={ProfileNavigator} />
  </Tab.Navigator>
);

export default AppNavigator;
