import React from "react";
import {
    ScrollView,
    StyleSheet,
    View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "../theme/colors";

export default function Screen({
  children,
  scroll = true,
}: any) {
  if (scroll) {
    return (
      <SafeAreaView style={styles.safe} edges={["top"]}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <View style={styles.full}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.bg,
  },

  scroll: {
    paddingBottom: 120,
  },

  full: {
    flex: 1,
  },
});