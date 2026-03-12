import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import TabNavigator from "./TabNavigator";

import AddApplianceScreen from "../screens/appliance/AddApplianceScreen";
import ApplianceDetailsScreen from "../screens/appliance/ApplianceDetailsScreen";
import EditApplianceScreen from "../screens/appliance/EditApplianceScreen";
import ScanApplianceScreen from "../screens/appliance/ScanApplianceScreen";
import StepGuideScreen from "../screens/tasks/StepGuideScreen";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen name="AddAppliance" component={AddApplianceScreen} />
      <Stack.Screen name="ApplianceDetails" component={ApplianceDetailsScreen} />
      <Stack.Screen name="StepGuide" component={StepGuideScreen} />
      <Stack.Screen name="ScanAppliance" component={ScanApplianceScreen} />
      <Stack.Screen name="EditAppliance" component={EditApplianceScreen}
      />
    </Stack.Navigator>
  );
}