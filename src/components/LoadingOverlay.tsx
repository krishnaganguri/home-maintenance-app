import React from "react";
import {
    ActivityIndicator,
    StyleSheet,
    View,
} from "react-native";

import { useLoading } from "../context/LoadingContext";
import { colors } from "../theme/colors";

export default function LoadingOverlay() {
  const { loading } = useLoading();

  if (!loading) return null;

  return (
    <View style={styles.overlay}>
      <ActivityIndicator
        size="large"
        color={colors.primary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    backgroundColor: "rgba(255,255,255,0.6)",

    justifyContent: "center",
    alignItems: "center",

    zIndex: 9999,
  },
});