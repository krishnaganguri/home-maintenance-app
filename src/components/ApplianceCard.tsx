import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function ApplianceCard({ appliance, onPress }: any) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.name}>{appliance.name}</Text>
      <Text>{appliance.brand}</Text>
      <Text>{appliance.model}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
  },

  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
});