import React from "react";
import {
    StyleSheet,
    Text,
    View,
} from "react-native";

import { useError } from "../context/ErrorContext";
import { colors } from "../theme/colors";

export default function ErrorBanner() {
  const { error } = useError();

  if (!error) return null;

  return (
    <View style={styles.banner}>
      <Text style={styles.text}>
        {error}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    position: "absolute",
    top: 60,
    left: 20,
    right: 20,
    backgroundColor: "#FDECEC",
    padding: 14,
    borderRadius: 14,
    zIndex: 999,
  },

  text: {
    color: colors.danger,
    fontWeight: "600",
    textAlign: "center",
  },
});