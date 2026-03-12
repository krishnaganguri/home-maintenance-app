import { Picker } from "@react-native-picker/picker";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { applianceTypes } from "../data/applianceTypes";

export default function ApplianceTypeDropdown({ selected, onSelect }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Appliance Type</Text>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selected}
          onValueChange={(value) => onSelect(value)}
        >
          <Picker.Item label="Select appliance type..." value="" />

          {applianceTypes.map((type) => (
            <Picker.Item
              key={type.value}
              label={type.label}
              value={type.value}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },

  label: {
    fontSize: 16,
    marginBottom: 8,
  },

  pickerContainer: {
    borderWidth: 1,
    borderRadius: 8,
  },
});