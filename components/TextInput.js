import { View, TextInput, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../config/colors";
import defaultStyles from "../config/styles";

function AppTextInput({ icon, width, ...otherProps }) {
  return (
    <View style={[styles.container, { width }]}>
      {icon && (
        <AntDesign
          name={icon}
          size={25}
          color={colors.white}
          style={styles.icon}
        />
      )}
      <TextInput
        placeholderTextColor={colors.white}
        style={defaultStyles.text}
        {...otherProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.grayDark,
    borderRadius: 15,
    borderColor: colors.primary,
    borderWidth: 1,
    flexDirection: "row",
    padding: 12,
    marginVertical: 10,
    marginHorizontal: 20,
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },
});

export default AppTextInput;
