import Screen from "../components/Screen";
import { StyleSheet, View, Image } from "react-native";
import Text from "../components/Text";
import colors from "../config/colors";
import Button from "../components/Button";

import SeparatorLine from "../components/SeparatorLine";
import AcountSection from "../components/AcountSection";
import useAuth from "../auth/useAuth";

const sections = [
  {
    title: "General",
    items: ["Edit Profile", "Notifications", "Wishlist"],
  },
  {
    title: "Legal",
    items: ["Terms of Use", "Privacy Policy"],
  },
  {
    title: "Personal",
    items: ["Report a Bug"],
  },
];

export default function AccountScreen() {
  const { user, logOut } = useAuth();

  return (
    <Screen>
      <View style={styles.profileContainer}>
        <Image style={styles.image} source={{ uri: user.user.photo }}></Image>
        <View style={styles.info}>
          <Text style={styles.profileName}>{user.user.name}</Text>
          <Text style={styles.email}>{user.user.email}</Text>
        </View>
      </View>
      <SeparatorLine></SeparatorLine>
      {sections.map((item, index) => (
        <AcountSection data={item} key={index}></AcountSection>
      ))}
      <Button onPress={() => logOut()} style={{ margin: 20 }}>
        <Text style={{ color: colors.background }}>logout</Text>
      </Button>
    </Screen>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    marginTop: 50,
    marginHorizontal: 30,
    flexDirection: "row",
    marginBottom: 30,
  },
  image: {
    borderRadius: 50,
    width: 85,
    height: 85,
  },
  info: {
    justifyContent: "center",
    marginLeft: 20,
  },
  profileName: {
    fontSize: 17,
    marginBottom: 5,
  },
  email: {
    fontSize: 14,
    color: colors.textLight,
  },
});
