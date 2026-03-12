import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import Screen from "../../components/Screen";
import { useApp } from "../../context/AppContext";
import { colors } from "../../theme/colors";

export default function EditApplianceScreen({
  route,
  navigation,
}: any) {
  const { appliance } = route.params;

  const { updateAppliance } = useApp();

  const [brand, setBrand] = useState(appliance.brand);
  const [model, setModel] = useState(appliance.model);
  const [nickname, setNickname] = useState(
    appliance.nickname || ""
  );

  const saveEdit = async () => {
    await updateAppliance({
      ...appliance,
      brand,
      model,
      nickname,
    });

    navigation.goBack();
  };

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.title}>
          Edit Appliance
        </Text>

        <TextInput
          style={styles.input}
          value={brand}
          onChangeText={setBrand}
          placeholder="Brand"
        />

        <TextInput
          style={styles.input}
          value={model}
          onChangeText={setModel}
          placeholder="Model"
        />

        <TextInput
          style={styles.input}
          value={nickname}
          onChangeText={setNickname}
          placeholder="Nickname"
        />

        <TouchableOpacity
          style={styles.saveBtn}
          onPress={saveEdit}
        >
          <Text style={styles.saveText}>
            Save Changes
          </Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: colors.text,
  },

  input: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
  },

  saveBtn: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
  },

  saveText: {
    fontWeight: "bold",
  },
});