import React, { useState } from "react";
import {
    LayoutAnimation,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

import { colors } from "../theme/colors";
import AppCard from "./AppCard";

export default function HistorySection({
  section,
}: any) {
  const [open, setOpen] = useState(true);

  const taskCount =
    section.data.length;

  const savings =
    taskCount * 8;

  return (
    <View>
      <TouchableOpacity
        onPress={() =>{
                LayoutAnimation.configureNext(
                    LayoutAnimation.Presets.easeInEaseOut
                );
                return setOpen(!open)
            }
        }
      >
        <Text>
          {section.title} - {taskCount} tasks · ${savings} saved {open ? "▾" : "▸"}
        </Text>

      </TouchableOpacity>

      {open &&
        section.data.map((item: any) => (
          <AppCard key={item.id} style={{ marginTop: 12 }}>
            <Text style={styles.task}>
                {item.taskName}
              </Text>

              <Text style={styles.appliance}>
                {item.applianceName}
              </Text>

              <Text style={styles.date}>
                {new Date(
                  item.completedAt
                ).toLocaleDateString()}
              </Text>

          </AppCard>
        ))}
    </View>
  );
}


const styles = StyleSheet.create({
    appliance: {
        color: colors.subText,
        fontSize: 12,
    },

    task: {
        color: colors.text,
        fontSize: 20,
        fontWeight: "bold",
    },

    date: {
        color: colors.primary,
    },
    historyItem: {
        backgroundColor: colors.card,
        borderRadius: 12,
    }
});