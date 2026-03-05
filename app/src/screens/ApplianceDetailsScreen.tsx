import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import storageService from "../services/storageService";

export default function ApplianceDetailsScreen({ route }: any) {
  const { appliance } = route.params;

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const allTasks = await storageService.getTasks();

    const applianceTasks = allTasks.filter(
      (task: any) => task.applianceName === appliance.name
    );

    setTasks(applianceTasks);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{appliance.name}</Text>
      <Text>{appliance.brand}</Text>
      <Text>{appliance.model}</Text>

      <Text style={styles.section}>Maintenance Tasks</Text>

      <FlatList
        data={tasks}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskCard}>
            <Text style={styles.task}>{item.taskName}</Text>
            <Text>Due: {new Date(item.dueDate).toDateString()}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },

  title: {
    fontSize: 22,
    fontWeight: "bold",
  },

  section: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
  },

  taskCard: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 10,
  },

  task: {
    fontWeight: "bold",
  },
});