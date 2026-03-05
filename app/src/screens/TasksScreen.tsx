import React, { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import storageService from "../services/storageService";
import completeTask from "../services/taskLifecycle";

export default function TasksScreen() {
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const storedTasks = await storageService.getTasks();

      setTasks(storedTasks || []);
    } catch (error) {
      console.error("Failed to load tasks:", error);
    }
  };

  const handleComplete = async (taskId: number) => {
    try {
      await completeTask(taskId); 
      await loadTasks();
    } catch (error) {
      console.error("Task completion error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.task}>{item.id}</Text>
            <Text style={styles.task}>{item.taskName}</Text>
            <Text>{item.applianceName}</Text>
            <Text>Due: {new Date(item.dueDate).toDateString()}</Text>
            <Button
              title="Complete"
              onPress={() => handleComplete(item.id)}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  card: {
    padding: 15,
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 8,
  },
  task: {
    fontSize: 16,
    fontWeight: "bold",
  },
});