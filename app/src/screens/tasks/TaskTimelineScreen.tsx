import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { SectionList, StyleSheet, Text, View } from "react-native";

import storageService from "../../services/storageService";
import timelineUtils from "../../utils/timelineUtils";

export default function TaskTimelineScreen() {
  const [sections, setSections] = useState<any[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [])
  );

  const loadTasks = async () => {
    const tasks = await storageService.getTasks();

    const grouped = timelineUtils.groupTasksByTimeline(tasks);

    const formattedSections = [
      { title: "Overdue", data: grouped.overdue },
      { title: "Today", data: grouped.today },
      { title: "Tomorrow", data: grouped.tomorrow },
      { title: "Upcoming", data: grouped.upcoming },
    ].filter((section) => section.data.length > 0);

    setSections(formattedSections);
  };

  return (
    <View style={styles.container}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.task}>{item.taskName}</Text>
            <Text>{item.applianceName}</Text>
            <Text>{new Date(item.dueDate).toDateString()}</Text>
          </View>
        )}
        renderSectionHeader={({ section }) => (
          <Text style={styles.header}>{section.title}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },

  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },

  card: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
  },

  task: {
    fontWeight: "bold",
    fontSize: 16,
  },
});