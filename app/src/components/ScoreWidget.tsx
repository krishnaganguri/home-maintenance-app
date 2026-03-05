import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ScoreWidget({ score }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Home Health Score</Text>
      <Text style={styles.score}>{score}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#f0f4f8",
    alignItems: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#555",
  },
  score: {
    fontSize: 36,
    fontWeight: "bold",
  },
});