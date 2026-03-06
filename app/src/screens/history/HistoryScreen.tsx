import React from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    View,
} from "react-native";

import AppCard from "../../components/AppCard";
import Screen from "../../components/Screen";
import { useApp } from "../../context/AppContext";
import { colors } from "../../theme/colors";


const historyData = [
  {
    id: "1",
    appliance: "Samsung Kitchen Fridge",
    task: "Replaced water filter",
    date: "Feb 28, 2026",
    saved: "$6 energy savings",
  },
  {
    id: "2",
    appliance: "Carrier HVAC",
    task: "Replaced air filter",
    date: "Feb 14, 2026",
    saved: "$10 efficiency gain",
  },
  {
    id: "3",
    appliance: "LG Washer",
    task: "Cleaned drum cycle",
    date: "Jan 22, 2026",
    saved: "Prevented odor buildup",
  },
];

export default function HistoryScreen() {
  const { history } = useApp();
  
  const renderHeader = () => (
    <View style={styles.container}>
      <Text style={styles.small}>MAINTENANCE LOG</Text>
      <Text style={styles.title}>History</Text>
      <Text style={styles.sub}>3 completed tasks this month</Text>

      <AppCard style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Savings This Month</Text>
        <Text style={styles.summaryValue}>$16</Text>
        <Text style={styles.summarySub}>
          Estimated efficiency gains from completed maintenance
        </Text>
      </AppCard>

      <Text style={styles.section}>February 2026</Text>
    </View>
  );

  return (
    <Screen scroll={false}>
      <FlatList
        ListHeaderComponent={renderHeader}
        data={history}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 14, paddingHorizontal: 20, paddingBottom: 120 }}
        renderItem={({ item }) => (
            <AppCard>
              <Text style={styles.appliance}>{item.appliance}</Text>

              <Text style={styles.task}>{item.task}</Text>

              <Text style={styles.date}>✓ Completed on {item.date}</Text>

              <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.saved}</Text>
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

  summaryCard: {
    backgroundColor: "#102818",
    marginBottom: 20,
  },

  summaryTitle: {
    color: colors.subText,
    fontSize: 14,
  },

  summaryValue: {
    color: colors.primary,
    fontSize: 34,
    fontWeight: "bold",
    marginTop: 6,
  },

  summarySub: {
    color: colors.subText,
    marginTop: 6,
    lineHeight: 20,
  },

  section: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "bold",
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
    marginTop: 6,
  },

  date: {
    color: colors.primary,
    marginTop: 8,
  },

  badge: {
    marginTop: 12,
    alignSelf: "flex-start",
    backgroundColor: "#1A241D",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
  },

  badgeText: {
    color: colors.primary,
    fontSize: 12,
  },
});