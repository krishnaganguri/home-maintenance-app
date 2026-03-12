import React from "react";
import {
  Alert,
  StyleSheet,
  Switch,
  Text,
  View
} from "react-native";

import { useApp } from "@/src/context/AppContext";
import AppCard from "../../components/AppCard";
import Screen from "../../components/Screen";
import { colors } from "../../theme/colors";

export default function SettingsScreen() {
  const {
    appliances,
    settings,
    updateSettings,
    resetAllData
  } = useApp();

  const confirmReset = async() => {
    Alert.alert(
      "Reset App Data",
      "This will remove all appliances, tasks, and history. This cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Reset",
          style: "destructive",
          onPress: async () => {
            await resetAllData();
          },
        },
      ]
    );
  };

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.small}>PREFERENCES</Text>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.sub}>Manage reminders and maintenance preferences</Text>

        <AppCard style={styles.profileCard}>
          <Text style={styles.profileName}>My Home</Text>
          <Text style={styles.profileSub}>{appliances.length} appliances registered</Text>
        </AppCard>

        <Text style={styles.section}>Notifications</Text>

        <AppCard style={styles.rowCard}>
          <Text style={styles.rowText}>Maintenance reminders</Text>
          <Switch
            value={settings.notifications}
            onValueChange={(value) =>
              updateSettings({
                ...settings,
                notifications: value,
              })
            }
          />
        </AppCard>

        <AppCard style={styles.rowCard}>
          <Text style={styles.rowText}>Calendar sync</Text>
          <Switch
            value={settings.calendarSync}
            onValueChange={(value) =>
              updateSettings({
                ...settings,
                calendarSync: value,
              })
            }
          />
        </AppCard>

        <Text style={styles.section}>Data</Text>

        <AppCard style={styles.rowCard}>
          <Text style={styles.rowText}>Export History (coming soon)</Text>
          <Text style={styles.arrow}>→</Text>
        </AppCard>

        <AppCard style={styles.rowCard} onPress={confirmReset}>
          <Text style={styles.rowText}>Reset appliance data</Text>
          <Text style={styles.arrow}>→</Text>
        </AppCard>

        <Text style={styles.section}>About</Text>

        <AppCard style={styles.aboutCard}>
          <Text style={styles.aboutText}>Home Maintenance Assistant</Text>
          <Text style={styles.version}>Version 1.0 MVP</Text>
        </AppCard>
      </View>
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

  profileCard: {
    backgroundColor: colors.card,
    marginBottom: 20,
  },

  profileName: {
    color: colors.text,
    fontSize: 22,
    fontWeight: "bold",
  },

  profileSub: {
    color: colors.subText,
    marginTop: 4,
  },

  section: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    marginTop: 10,
  },

  rowCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  rowText: {
    color: colors.text,
    fontSize: 16,
  },

  arrow: {
    color: colors.primary,
    fontSize: 18,
  },

  aboutCard: {
    marginTop: 8,
  },

  aboutText: {
    color: colors.text,
    fontSize: 16,
  },

  version: {
    color: colors.subText,
    marginTop: 6,
  },
});