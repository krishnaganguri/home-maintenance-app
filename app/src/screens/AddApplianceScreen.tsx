import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import ApplianceTypeDropdown from "../components/ApplianceTypeDropdown";
import generateMaintenanceTasks from "../services/maintenanceEngine";
import storageService from "../services/storageService";

export default function AddApplianceScreen({ navigation }: any) {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [type, setType] = useState("");

  const handleSave = async () => {
    if (!type) {
      alert("Please select appliance type");
      return;
    }
    const appliance = {
      name,
      brand,
      model,
      type,
    };

    // Save appliance
    const appliances = await storageService.getAppliances();

    appliances.push(appliance);

    await AsyncStorage.setItem("appliances", JSON.stringify(appliances));

    // Generate maintenance tasks
    const tasks = generateMaintenanceTasks(type);

    const existingTasks = await storageService.getTasks();

    const newTasks = tasks.map((task) => ({
      ...task,
      applianceName: name,
    }));

    await AsyncStorage.setItem(
      "tasks",
      JSON.stringify([...existingTasks, ...newTasks])
    );

    navigation.navigate("Tasks");
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Appliance Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <ApplianceTypeDropdown
        selected={type}
        onSelect={(value) => {
          setType(value);
          if (!name) setName(value);
        }}
      />

      <TextInput
        placeholder="Brand"
        style={styles.input}
        onChangeText={setBrand}
      />

      <TextInput
        placeholder="Model"
        style={styles.input}
        onChangeText={setModel}
      />

      <Button title="Save Appliance" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
  },
});