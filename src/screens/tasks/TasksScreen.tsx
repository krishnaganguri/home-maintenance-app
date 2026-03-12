import EmptyState from "@/src/components/EmptyState";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AppCard from "../../components/AppCard";
import Screen from "../../components/Screen";
import { useApp } from "../../context/AppContext";
import { colors } from "../../theme/colors";
import { formatTaskDueLabel } from "../../utils/dateUtils";

const filters = ["Active", "Overdue", "Upcoming", "Done"];

const tasks1 = [
  {
    id: "1",
    appliance: "Samsung Kitchen Fridge",
    task: "Clean condenser coils",
    status: "Overdue",
    due: "3 days overdue",
  },
  {
    id: "2",
    appliance: "Carrier HVAC System",
    task: "Replace air filter",
    status: "Upcoming",
    due: "Due in 2 days",
  },
  {
    id: "3",
    appliance: "LG Washer",
    task: "Clean drum with tub cleaner",
    status: "Upcoming",
    due: "Due in 8 days",
  },
];

export default function TasksScreen({ navigation }: any) {
  const [activeFilter, setActiveFilter] = useState("Active");
  const { tasks, completeTask } = useApp();

  const today = new Date();

  const next30Days = new Date();
  next30Days.setDate(
    next30Days.getDate() + 30
  );

  const overdueTasks = tasks.filter(
    (task) =>
      new Date(task.dueDate) < today &&
      task.status !== "done"
  );

  const next30DayTasks = tasks.filter(
    (task) => {
      const due = new Date(task.dueDate);

      return (
        due >= today &&
        due <= next30Days &&
        task.status !== "done"
      );
    }
  );
  const mostUrgentTask =
    overdueTasks.sort(
      (a, b) =>
        new Date(a.dueDate).getTime() -
        new Date(b.dueDate).getTime()
    )[0];

  const urgencySummary =
    tasks.length === 0
      ? "No maintenance tasks yet"
      : overdueTasks.length > 0
      ? `${overdueTasks.length} overdue · ${
          mostUrgentTask?.applianceName ||
          "Appliance"
        } needs attention`
      : `${next30DayTasks.length} tasks in next 30 days`;

  const filteredTasks = useMemo(() => {
    const today = new Date();
    const filtered = tasks.filter((task) => {
      const due = new Date(task.dueDate);

      if (activeFilter === "Active") {
        return task.status !== "done";
      }

      if (activeFilter === "Overdue") {
        return due < today && task.status !== "done";
      }

      if (activeFilter === "Upcoming") {
        return due >= today && task.status !== "done";
      }

      if (activeFilter === "Done") {
        return task.status === "done";
      }

      return true;
    });
    return filtered.sort((a, b) => {
      const aDue =
        new Date(a.dueDate).getTime();

      const bDue =
        new Date(b.dueDate).getTime();

      const aOverdue =
        aDue < today.getTime();

      const bOverdue =
        bDue < today.getTime();

      if (aOverdue && !bOverdue) return -1;
      if (!aOverdue && bOverdue) return 1;

      return aDue - bDue;
    });
  }, [tasks, activeFilter]);

  const renderHeader = () => (
    <View style={styles.container}>
      <Text style={styles.small}>MAINTENANCE</Text>
      <Text style={styles.title}>Tasks</Text>
      <Text
        style={[
          styles.sub,
          overdueTasks.length > 0 && {
            color: colors.danger,
          },
        ]}
      >
        {urgencySummary}
      </Text>

      <View style={styles.filterRow}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterBtn,
              activeFilter === filter && styles.activeFilter,
            ]}
            onPress={() => setActiveFilter(filter)}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === filter && styles.activeText,
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <Screen scroll={false}>
      <FlatList
        ListHeaderComponent={renderHeader}
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<EmptyState
                              icon="🛠️"
                              title="No tasks right now"
                              subtitle="Tasks appear automatically after adding appliances."
                              buttonLabel="Add Appliance"
                              onPress={() =>
                                navigation.navigate("AddAppliance")
                              }
                            />}
        contentContainerStyle={{ gap: 14, paddingHorizontal: 20, paddingBottom: 120 }}
        renderItem={({ item }) => (
            <AppCard style={styles.taskCard}>
              <View style={styles.topRow}>
                <View>
                  <Text style={styles.appliance}>{item.applianceName}</Text>
                  <Text style={styles.task}>{item.taskName}</Text>
                  <Text style={styles.due}>
                    {formatTaskDueLabel(item.dueDate)}
                  </Text>
                </View>

                <View
                  style={[
                    styles.badge,
                    item.status === "Overdue"
                      ? styles.badgeRed
                      : styles.badgeOrange,
                  ]}
                >
                  <Text style={styles.badgeText}>{item.status}</Text>
                </View>
              </View>

              <View style={styles.actionRow}>
                <TouchableOpacity
                  style={styles.secondaryBtn}
                  onPress={() =>
                    navigation.navigate("StepGuide", {
                      task: item,
                    })
                  }
                >
                  <Text style={styles.secondaryText}>📋 View Steps</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.primaryBtn} onPress={() => completeTask(item.id)}>
                  <Text style={styles.primaryText}>Mark Done ✓</Text>
                </TouchableOpacity>
              </View>
            </AppCard>
          )}
        />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  small: {
    color: colors.primary,
    fontSize: 12,
    letterSpacing: 2,
  },

  title: {
    color: colors.text,
    fontSize: 30,
    fontWeight: "bold",
  },

  sub: {
    color: colors.subText,
    marginBottom: 20,
  },

  filterRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 20,
  },

  filterBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.card,
  },

  activeFilter: {
    backgroundColor: colors.primary,
  },

  filterText: {
    color: colors.subText,
    fontSize: 13,
  },

  activeText: {
    color: "#000",
    fontWeight: "bold",
  },

  taskCard: {
    marginBottom: 2,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  appliance: {
    color: colors.subText,
    fontSize: 12,
  },

  task: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "bold",
  },

  due: {
    color: colors.warning,
    marginTop: 4,
  },

  badge: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: "flex-start",
  },

  badgeRed: {
    backgroundColor: "#341717",
  },

  badgeOrange: {
    backgroundColor: "#3A2A16",
  },

  badgeText: {
    color: "#fff",
    fontSize: 12,
  },

  actionRow: {
    flexDirection: "row",
    gap: 10,
  },

  secondaryBtn: {
    flex: 1,
    backgroundColor: "#172018",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },

  secondaryText: {
    color: colors.secondaryText,
  },

  primaryBtn: {
    flex: 1,
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },

  primaryText: {
    fontWeight: "bold",
  },
});