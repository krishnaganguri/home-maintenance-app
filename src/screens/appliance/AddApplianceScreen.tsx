import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import AppCard from "../../components/AppCard";
import ApplianceTypeDropdown from "../../components/ApplianceTypeDropdown";
import Screen from "../../components/Screen";
import { colors } from "../../theme/colors";

import { useLoading } from "@/src/context/LoadingContext";
import { useApp } from "../../context/AppContext";
import generateMaintenanceTasks from "../../services/maintenanceEngine";


export default function AddApplianceScreen({ navigation, route }: any) {
  const { addAppliance } = useApp();

  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [serial, setSerial] = useState("");
  const { showLoading, hideLoading } = useLoading();

  type ScanResult = {
    brand: string;
    model: string;
    type: string;
    serial: string;
  };

  useEffect(() => {
    if (!route?.params) return;

    if (route.params.brand) {
      setBrand(route.params.brand);
      setModel(route.params.model);
      setType(route.params.type || "");
      setSerial(route.params.serial || "");
    }
  }, [route?.params]);

  const handleSave = async () => {
    if (!type || !name) return;
    showLoading();
    
    const appliance = {
      id: Date.now(),
      brand,
      model,
      serial,
      type,
      nickname: name,
      createdAt: new Date().toISOString(),
    };

    const tasks = generateMaintenanceTasks(appliance).map((task) => ({
      ...task,
      applianceName: name,
    }));

    await addAppliance(appliance, tasks);
    hideLoading();

    navigation.goBack();
  };

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.small}>ADD APPLIANCE</Text>
        <Text style={styles.title}>New Appliance</Text>
        <Text style={styles.sub}>
          Add appliance details to generate maintenance tasks
        </Text>

        <AppCard style={styles.card}>
          <ApplianceTypeDropdown selected={type} onSelect={setType} />

          <TextInput
            placeholder="Appliance Name"
            placeholderTextColor={colors.subText}
            style={styles.input}
            value={name}
            onChangeText={setName}
          />

          <TextInput
            placeholder="Brand"
            placeholderTextColor={colors.subText}
            style={styles.input}
            value={brand}
            onChangeText={setBrand}
          />

          <TextInput
            placeholder="Model"
            placeholderTextColor={colors.subText}
            style={styles.input}
            value={model}
            onChangeText={setModel}
          />
          <TextInput
            placeholder="Serial Number"
            placeholderTextColor={colors.subText}
            style={styles.input}
            value={serial}
            onChangeText={setSerial}
          />

          <TouchableOpacity
            style={styles.scanBtn}
            onPress={() =>
              navigation.navigate("ScanAppliance", {
                onScanComplete: (data: ScanResult) => {
                  setBrand(data.brand);
                  setModel(data.model);
                  setType(data.type);
                  setSerial(data.serial);
                },
              })
            }
          >
            <Text style={styles.scanText}>📷 Scan Appliance Label</Text>
          </TouchableOpacity>
        </AppCard>

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveText}>Save Appliance</Text>
        </TouchableOpacity>
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

  card: {
    marginBottom: 20,
  },

  input: {
    backgroundColor: colors.secondaryText,
    borderRadius: 12,
    padding: 14,
    color: colors.text,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },

  scanBtn: {
    backgroundColor: "#172018",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  scanText: {
    color: colors.primary,
    fontWeight: "600",
  },

  saveBtn: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
  },

  saveText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});