import React from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

import AppCard from "../../components/AppCard";
import Screen from "../../components/Screen";
import { colors } from "../../theme/colors";

import { useApp } from "../../context/AppContext";
import { calculateHomeMetrics } from "../../services/homeMetricsService";

const appliances1 = [
  { id: "1", brand: "Samsung", type: "Refrigerator", overdue: true, tasks: 3 },
  { id: "2", brand: "Carrier", type: "HVAC", overdue: false, tasks: 2 },
  { id: "3", brand: "LG", type: "Washer", overdue: false, tasks: 2 },
  { id: "4", brand: "Whirlpool", type: "Dryer", overdue: false, tasks: 2 },
];


export default function DashboardScreen({ navigation }: any) {
  const { appliances, tasks } = useApp();
  const {
    overdueCount,
    upcomingCount,
    score,
  } = calculateHomeMetrics(tasks);

  const renderHeader = () => (
    <View>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.small}>HOME MAINTENANCE</Text>
          <Text style={styles.title}>My Home 🏠</Text>
          <Text style={styles.sub}>
            {appliances.length} appliances · {overdueCount} overdue task
          </Text>
        </View>

        <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate("AddAppliance")}>
          <Text style={styles.addText}>+ Add</Text>
        </TouchableOpacity>
      </View>

      <AppCard style={styles.healthCard}>
        <View style={styles.healthRow}>
          <AnimatedCircularProgress
            size={90}
            width={8}
            fill={score}
            tintColor={colors.primary}
            backgroundColor="#1A241D"
            rotation={220}
            arcSweepAngle={280}
          >
            {() => (
              <View>
                <Text style={styles.score}>{score}</Text>
                <Text style={styles.scoreLabel}>SCORE</Text>
              </View>
            )}
          </AnimatedCircularProgress>

          <View>
            <Text style={styles.healthTitle}>Good Shape</Text>
            <Text style={styles.healthSub}>
              {overdueCount} overdue task needs attention
            </Text>

            <View style={styles.statsRow}>
              <Text style={styles.stat}>{overdueCount} Overdue</Text>
              <Text style={styles.stat}>{upcomingCount} Upcoming</Text>
              <Text style={styles.stat}>2 Done</Text>
            </View>
          </View>
        </View>
      </AppCard>

      {overdueCount > 0 && (
        <View style={styles.alert}>
          <Text style={styles.alertText}>
            ⚠ {overdueCount} task overdue
          </Text>
        </View>
      )}

      <View style={styles.sectionRow}>
        <Text style={styles.section}>My Appliances</Text>
        <Text style={styles.link}>All tasks →</Text>
      </View>
    </View>
  );

  return (
    <Screen scroll={false}>
      <FlatList
        data={appliances}
        numColumns={2}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={{ gap: 12 }}
        contentContainerStyle={{ gap: 12, padding: 20, paddingBottom: 120 }}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <AppCard style={styles.applianceCard}>
            <Text style={styles.brand}>{item.brand}</Text>
            <Text style={styles.type}>{item.type}</Text>
            <Text style={styles.tasks}>{item.tasks} tasks</Text>

            {item.overdue && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>1 overdue</Text>
              </View>
            )}
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

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
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
  },

  addBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    borderRadius: 14,
    justifyContent: "center",
  },

  addText: {
    fontWeight: "bold",
  },

  healthCard: {
    marginBottom: 16,
  },

  healthRow: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },

  score: {
    color: colors.primary,
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
  },

  scoreLabel: {
    color: colors.subText,
    fontSize: 10,
    textAlign: "center",
  },

  healthTitle: {
    color: colors.primary,
    fontSize: 24,
    fontWeight: "bold",
  },

  healthSub: {
    color: colors.subText,
    marginBottom: 10,
  },

  statsRow: {
    flexDirection: "row",
    gap: 12,
  },

  stat: {
    color: colors.text,
    fontSize: 12,
  },

  alert: {
    backgroundColor: "#341717",
    padding: 14,
    borderRadius: 14,
    marginBottom: 20,
  },

  alertText: {
    color: "#FF7A7A",
    fontWeight: "600",
  },

  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  section: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "bold",
  },

  link: {
    color: colors.primary,
  },

  applianceCard: {
    flex: 1,
    minHeight: 150,
  },

  brand: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "bold",
  },

  type: {
    color: colors.subText,
  },

  tasks: {
    color: colors.subText,
    marginTop: 10,
  },

  badge: {
    marginTop: 12,
    backgroundColor: "#2E1515",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },

  badgeText: {
    color: "#FF6D6D",
    fontSize: 12,
  },
});