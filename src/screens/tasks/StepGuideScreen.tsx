import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import EmptyState from "@/src/components/EmptyState";
import completeTask from "@/src/services/taskLifecycle";
import AppCard from "../../components/AppCard";
import Screen from "../../components/Screen";
import { getTaskSteps } from "../../services/stepEngine";
import { colors } from "../../theme/colors";
import { formatTaskDueLabel } from "../../utils/dateUtils";

const stepsData = [
  "Unplug the refrigerator from the wall outlet",
  "Pull the fridge carefully away from the wall",
  "Locate condenser coils on the back or bottom panel",
  "Use a coil brush to remove all dust buildup",
  "Vacuum loose debris with a soft brush attachment",
];

export default function StepGuideScreen({
  route, navigation,
}: any) {
  const [completed, setCompleted] = useState<number[]>([]);
  const { task } = route.params;

  const toggleStep = (index: number) => {
    if (completed.includes(index)) {
      setCompleted(completed.filter((i) => i !== index));
    } else {
      setCompleted([...completed, index]);
    }
  };

  const steps = getTaskSteps(task);

  const renderHeader = () => (
    <View style={styles.container}>
      <Text style={styles.header}>Step-by-Step Guide</Text>

      <AppCard style={styles.taskCard}>
        <Text style={styles.appliance}>{task.applianceName}</Text>
        <Text style={styles.task}>{task.taskName}</Text>

        <View style={styles.badges}>
          <Text style={styles.badge}>⏱ 20 min</Text>
          <Text style={styles.badge}>📅 {formatTaskDueLabel(task.dueDate)}</Text>
          <Text style={styles.badgeDanger}>High priority</Text>
        </View>
      </AppCard>

      <AppCard style={styles.tipCard}>
        <Text style={styles.tip}>
          💡 Clean coils reduce energy use by up to 30%, saving around $18/year.
        </Text>
      </AppCard>

      <View style={styles.stepsHeader}>
        <Text style={styles.section}>STEPS</Text>
        <Text style={styles.progress}>
          {completed.length}/{stepsData.length} done
        </Text>
      </View>
    </View>
  );

  return (
    <Screen scroll={false}>
      <FlatList
        ListHeaderComponent={renderHeader}
        data={steps}
        ListEmptyComponent={<EmptyState
                            icon="📋"
                            title="No detailed guide available"
                            subtitle="Follow manufacturer instructions carefully."
                          />}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{ gap: 12, paddingHorizontal: 20, paddingBottom: 120 }}
        renderItem={({ item, index }) => (
            <TouchableOpacity
              style={[
                styles.stepCard,
                completed.includes(index) && styles.stepDone,
              ]}
              onPress={() => toggleStep(index)}
            >
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{index + 1}</Text>
              </View>

              <Text
                style={[
                  styles.stepText,
                  completed.includes(index) && styles.stepTextDone,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />

        <View style={styles.bottomRow}>
          <TouchableOpacity style={styles.secondaryBtn}>
            <Text style={styles.secondaryText}>📅 Add to Calendar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.primaryBtn}>
            <Text style={styles.primaryText} onPress={() => {
                completeTask(task.id);
                navigation.goBack();
              }}>Mark Complete ✓</Text>
          </TouchableOpacity>
        </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },

  header: {
    color: colors.text,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  taskCard: {
    marginBottom: 14,
  },

  appliance: {
    color: colors.subText,
    fontSize: 12,
  },

  task: {
    color: colors.text,
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 6,
  },

  badges: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
    flexWrap: "wrap",
  },

  badge: {
    backgroundColor: "#1A241D",
    color: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
    fontSize: 12,
  },

  badgeDanger: {
    backgroundColor: "#341717",
    color: "#FF7A7A",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
    fontSize: 12,
  },

  tipCard: {
    backgroundColor: "#102818",
    marginBottom: 20,
  },

  tip: {
    color: colors.primary,
    lineHeight: 22,
  },

  stepsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  section: {
    color: colors.subText,
    fontSize: 12,
    letterSpacing: 2,
  },

  progress: {
    color: colors.subText,
  },

  stepCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },

  stepDone: {
    borderColor: colors.primary,
  },

  stepNumber: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#16231B",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  stepNumberText: {
    color: colors.primary,
    fontWeight: "bold",
  },

  stepText: {
    color: colors.text,
    flex: 1,
    lineHeight: 22,
  },

  stepTextDone: {
    color: colors.primary,
  },

  bottomRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
  },

  secondaryBtn: {
    flex: 1,
    backgroundColor: "#172018",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  secondaryText: {
    color: colors.secondaryText,
  },

  primaryBtn: {
    flex: 1,
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  primaryText: {
    fontWeight: "bold",
  },
});