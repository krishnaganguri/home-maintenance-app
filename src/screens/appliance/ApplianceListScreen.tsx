import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import ApplianceCard from "../../components/ApplianceCard";
//import storageService from "../../services/storageService";
import { getAppliances } from "../../repository/applianceRepository";

export default function ApplianceListScreen({ navigation }: any) {
  const [appliances, setAppliances] = useState([]);

  useFocusEffect(
    useCallback(() => {
      loadAppliances();
    }, [])
  );

  const loadAppliances = async () => {
    const data = await getAppliances();
    setAppliances(data);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={appliances}
        keyExtractor={(item: any, index) => index.toString()}
        renderItem={({ item }) => (
          <ApplianceCard
            appliance={item}
            onPress={() =>
              navigation.navigate("ApplianceDetails", { appliance: item })
            }
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});