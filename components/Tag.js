import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import colors from "../config/colors";

export default function Tag({ label, isSelected = false, onSelect, style }) {
  return (
    <TouchableOpacity
      style={[
        styles.common,
        isSelected ? styles.Selected : styles.notSelected,
        style,
      ]}
      onPress={() => onSelect(label)}
    >
      <Text style={[{color: isSelected?colors.primary: colors.text500}]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  common: {
    borderWidth: 2,
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight:10,
    marginTop:10,
    marginBottom:20
  },
  notSelected: {
    borderColor: colors.text500,
  },
  Selected: {
    borderColor:colors.primary,
    backgroundColor: colors.surface700
  },
});
