import React from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import AppCard from "../../components/AppCard";
import Screen from "../../components/Screen";

import EmptyState from "@/src/components/EmptyState";
import { useApp } from "../../context/AppContext";
import { calculateApplianceHealth } from "../../services/historyInsightsService";
import { colors } from "../../theme/colors";


export default function ApplianceDetailsScreen({
  route, navigation
}: any) {
  const { appliance } = route.params;

  const { tasks, history, deleteAppliance } = useApp();
  

  const applianceTasks = tasks.filter(
    (task) => task.applianceId === appliance.id
  );

  const applianceHistory = history.filter(
    (item) => item.applianceId === appliance.id
  );

  const overdue = applianceTasks.filter(
    (task) =>
      new Date(task.dueDate) < new Date()
  );

  const health = calculateApplianceHealth(
    appliance,
    tasks,
    history
  );

  const handleDelete = () => {
    Alert.alert(
      "Delete Appliance",
      "This will remove linked tasks.",
      [
        {
          text: "Cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await deleteAppliance(appliance.id);

            navigation.goBack();
          },
        },
      ]
    );
  };

  const score =
    Math.max(
      100 - overdue.length * 10,
      0
    );

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <View style={styles.textContainer}>
            <Text style={styles.brand}>
              {appliance.brand}
            </Text>

            <Text style={styles.model}>
              {appliance.model}
            </Text>

            <Text style={styles.type}>
              {appliance.type}
            </Text>
          </View>
          <View style={styles.textContainer}>
            <TouchableOpacity
              style={styles.editBtn}
              onPress={() =>
                navigation.navigate("EditAppliance", {
                  appliance,
                })
              }
            >
              <Text style={styles.editText}>Edit Appliance</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={handleDelete}
            >
              <Text style={styles.deleteText}>
                Delete Appliance
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <AppCard style={styles.healthCard}>
          <Text style={styles.label}>
            Appliance Health
          </Text>

          <Text style={styles.score}>
            {health.score}
          </Text>

          <Text style={styles.trend}>
            {health.trend}
          </Text>

          <Text style={styles.meta}>
            {health.overdueCount} overdue · {health.completedCount} completed
          </Text>
        </AppCard>

        <Text style={styles.section}>
          Upcoming Tasks
        </Text>

        <FlatList
          data={applianceTasks}
          scrollEnabled={false}
          ListEmptyComponent={<EmptyState
                                icon="🔧"
                                title="No upcoming tasks"
                                subtitle="Maintenance tasks will appear automatically."
                              />}
          keyExtractor={(item) =>
            item.id.toString()
          }
          renderItem={({ item }) => (
            <AppCard style={styles.taskCard}>
              <Text style={styles.task}>
                {item.taskName}
              </Text>

              <Text style={styles.due}>
                {new Date(
                  item.dueDate
                ).toLocaleDateString()}
              </Text>
            </AppCard>
          )}
        />

        <Text style={styles.section}>
          Maintenance History
        </Text>

        <FlatList
          data={applianceHistory}
          scrollEnabled={false}
          ListEmptyComponent={<EmptyState
                              icon="📄"
                              title="No maintenance history"
                              subtitle="Complete tasks to build service history."
                            />}
          keyExtractor={(item) =>
            item.id.toString()
          }
          renderItem={({ item }) => (
            <AppCard style={styles.taskCard}>
              <Text style={styles.task}>
                {item.taskName}
              </Text>

              <Text style={styles.due}>
                {new Date(
                  item.completedAt
                ).toLocaleDateString()}
              </Text>
            </AppCard>
          )}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
    gap: 12,
  },

  textContainer: {
    flex: 1,
  },

  brand: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.text,
  },

  model: {
    fontSize: 16,
    color: colors.subText,
    marginBottom: 4,
  },

  type: {
    color: colors.primary,
    marginBottom: 0,
  },

  /* score: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
  },

  meta: {
    color: colors.subText,
    marginTop: 4,
  }, */

  section: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 24,
    marginBottom: 12,
    color: colors.text,
  },

  taskCard: {
    marginBottom: 10,
  },

  task: {
    color: colors.text,
    fontWeight: "600",
  },

  due: {
    color: colors.subText,
    marginTop: 4,
  },
  editBtn: {
    backgroundColor: colors.primarySoft,
    padding: 12,
    borderRadius: 12,
    justifyContent: "center",
  },

  editText: {
    color: colors.primary,
    fontWeight: "600",
  },
  deleteBtn: {
    backgroundColor: "#FDECEC",
    padding: 12,
    borderRadius: 12,
    marginTop: 10,
  },

  deleteText: {
    color: colors.danger,
    fontWeight: "600",
  },
  score: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.text,
    marginTop: 8,
  },

  trend: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.primary,
    marginTop: 4,
  },

  meta: {
    fontSize: 14,
    color: colors.subText,
    marginTop: 6,
  },
  healthCard: {
    marginTop: 16,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
  },
});