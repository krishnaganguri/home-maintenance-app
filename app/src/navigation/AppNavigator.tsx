
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import AddApplianceScreen from "../screens/AddApplianceScreen";
import ApplianceDetailsScreen from "../screens/ApplianceDetailsScreen";
import ApplianceListScreen from "../screens/ApplianceListScreen";
import DashboardScreen from "../screens/DashboardScreen";
import TasksScreen from "../screens/TasksScreen";
import TaskTimelineScreen from "../screens/TaskTimelineScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="AddAppliance" component={AddApplianceScreen} />
        <Stack.Screen name="Tasks" component={TasksScreen} />
        <Stack.Screen name="Timeline" component={TaskTimelineScreen} />
        <Stack.Screen name="Appliances" component={ApplianceListScreen} />
        <Stack.Screen name="ApplianceDetails" component={ApplianceDetailsScreen} />
      </Stack.Navigator>
  );
}