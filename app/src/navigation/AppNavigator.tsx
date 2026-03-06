
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import AddApplianceScreen from "../screens/appliance/AddApplianceScreen";
import ApplianceDetailsScreen from "../screens/appliance/ApplianceDetailsScreen";
import ApplianceListScreen from "../screens/appliance/ApplianceListScreen";
import DashboardScreen from "../screens/home/DashboardScreen";
import TasksScreen from "../screens/tasks/TasksScreen";
import TaskTimelineScreen from "../screens/tasks/TaskTimelineScreen";

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