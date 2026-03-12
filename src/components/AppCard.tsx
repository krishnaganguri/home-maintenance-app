import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../theme/colors";

export default function AppCard({ children, style, onPress }: any) {
  return <TouchableOpacity style={[styles.card, style]} onPress={onPress} activeOpacity={0.7}>{children}</TouchableOpacity>;
}

const styles = StyleSheet.create({
  card: {
  backgroundColor: colors.card,
  borderRadius: 16,
  borderWidth: 1,
  borderColor: colors.border,
  padding: 16,

  shadowColor: "#000",
  shadowOpacity: 0.05,
  shadowRadius: 8,
  shadowOffset: {
    width: 0,
    height: 2,
  },

  elevation: 2,
},
});