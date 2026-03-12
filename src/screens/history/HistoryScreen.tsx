import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View
} from "react-native";

import EmptyState from "@/src/components/EmptyState";
import AppCard from "../../components/AppCard";
import HistorySection from "../../components/HistorySection";
import Screen from "../../components/Screen";
import { useApp } from "../../context/AppContext";
import {
  calculateHistoryInsights,
} from "../../services/historyInsightsService";
import { colors } from "../../theme/colors";
import { HistoryItem } from "../../types/types";



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
  const insights = calculateHistoryInsights(history);
  
  const renderHeader = () => (
    <View style={styles.insightsWrap}>
      <Text style={styles.small}>MAINTENANCE LOG</Text>

      <AppCard style={styles.insightCard}>
        <Text style={styles.value}>
          {insights.streak}
        </Text>
        <Text style={styles.label}>
          Maintenance Streak
        </Text>
      </AppCard>

      <AppCard style={styles.insightCard}>
        <Text style={styles.value}>
          ${insights.savings}
        </Text>
        <Text style={styles.label}>
          Estimated Savings
        </Text>
      </AppCard>
      <AppCard>
        <Text style={styles.label}>
          Most Maintained Appliance
        </Text>

        <Text style={styles.value}>
          {insights.reliability}
        </Text>
      </AppCard>
      <Text style={styles.title}>History</Text>
    </View>    
  );

  const sortedHistory = [...history].sort(
    (a, b) =>
      new Date(
        b.completedAt
      ).getTime() -
      new Date(
        a.completedAt
      ).getTime()
  );
  const groupedHistory = sortedHistory.reduce(
    ( 
      acc: Record<string, HistoryItem[]>,
      item: HistoryItem
    ) => {
      const date = new Date(
        item.completedAt
      );

      const monthYear =
        date.toLocaleString("default", {
          month: "long",
          year: "numeric",
        });

      if (!acc[monthYear]) {
        acc[monthYear] = [];
      }

      acc[monthYear].push(item);

      return acc;
    },
    {}
  );

  const sections = Object.entries(
    groupedHistory
  ).map(([title, data]) => ({
    title,
    data: data as HistoryItem[],
  }));

  return (
    <Screen className={styles.container} scroll={false}>
      <FlatList
        data={sections}
        ListEmptyComponent={<EmptyState title="No completed tasks right now"
                                      subtitle="History appear automatically after completing tasks."
                                    />}
        ListHeaderComponent={renderHeader}
        keyExtractor={(item) => item.title}
        contentContainerStyle={{ gap: 14, paddingHorizontal: 20, paddingBottom: 120 }}
        renderItem={({ item }) => (
          <HistorySection section={item} />
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
    marginTop: 20,
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
  insightsWrap: {
    
    gap: 12,
    marginBottom: 20,
  },

  insightCard: {
    flex: 1,
  },

  value: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
  },

  label: {
    color: colors.subText,
    marginTop: 4,
  },
  monthHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 12,
  },
  monthMeta: {
    color: colors.subText,
    fontSize: 14,
  },
  monthHeaderWrap: {
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  expandIcon: {
    fontSize: 18,
    color: colors.subText,
  },
});