import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import storageService from "../services/storageService";

import ScoreWidget from "../components/ScoreWidget";
import { calculateHomeScore } from "../utils/scoreCalculator";

export default function DashboardScreen({ navigation }: any) {
  const [score, setScore] = useState(100);

  useFocusEffect(
    useCallback(() => {
      loadScore();
    }, [])
  );

  const loadScore = async () => {
    const tasks = await storageService.getTasks();

    const homeScore = calculateHomeScore(tasks);
    setScore(homeScore);
  };

  return (
    <View style={styles.container}>
      <ScoreWidget score={score} />

      <Button
        title="Add Appliance"
        onPress={() => navigation.navigate("AddAppliance")}
      />

      <Button
        title="View Tasks"
        onPress={() => navigation.navigate("Tasks")}
      />

      <Button
        title="Task Timeline"
        onPress={() => navigation.navigate("Timeline")}
      />
      <Button
      title="My Appliances"
      onPress={() => navigation.navigate("Appliances")}
    />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});