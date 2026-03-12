import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

//import storageService from "../services/storageService";
import {
  getAppliances,
  saveAppliances,
} from "../repository/applianceRepository";

import {
  getTasks,
  saveTasks,
} from "../repository/taskRepository";

import {
  getHistory,
  saveHistory,
} from "../repository/historyRepository";
import { getSettings, saveSettings } from "../repository/settingsRepository";
import { useError } from "./ErrorContext";


type AppContextType = {
  appliances: any[];
  tasks: any[];
  history: any[];
  settings: any;
  
  loadData: () => Promise<void>;

  addAppliance: (appliance: any, newTasks: any[]) => Promise<void>;

  completeTask: (taskId: number) => Promise<void>;
  updateAppliance: (updatedAppliance: any) => Promise<void>;
  deleteAppliance: (applianceId: number) => Promise<void>;
  updateSettings: (newSettings: any) => Promise<void>;
  resetAllData: () => Promise<void>;
};

const AppContext = createContext<AppContextType | null>(null);

const defaultSettings = {
  notifications: false,
  calendarSync: false,
};

export function AppProvider({ children }: any) {
  const [appliances, setAppliances] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const { showError } = useError();
  const [settings, setSettings] = useState(defaultSettings);

  const loadData = async () => {
    const storedAppliances = await getAppliances();
    const storedTasks = await getTasks();
    const storedHistory = await getHistory();
    const storedSettings = await getSettings();

    setAppliances(storedAppliances);
    setTasks(storedTasks);
    setHistory(storedHistory);
    setSettings(storedSettings || defaultSettings);
  };

  useEffect(() => {
    try {
      loadData();
    } catch (error) {
      console.error("Failed to load data: ", error);
      showError("Failed to load saved data.");
    }
  }, []);

  const addAppliance = async (appliance: any, newTasks: any[]) => {
    console.log("Adding appliance: ", appliance);  
    const updatedAppliances = [...appliances, appliance];
    console.log("Updated appliances: ", updatedAppliances);
    const updatedTasks = [...tasks, ...newTasks];

    setAppliances(updatedAppliances);
    setTasks(updatedTasks);

    await saveAppliances(updatedAppliances);
    await saveTasks(updatedTasks);
  };

  const completeTask = async (taskId: number) => {
    const targetTask = tasks.find(
      (task) => task.id === taskId
    );

    if (!targetTask) {
      showError("Task not found");
      return;
    }

    const nextDate = new Date();

    nextDate.setDate(
      nextDate.getDate() +
        (targetTask.frequencyDays || 30)
    );

    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? {
            ...task,
            dueDate: nextDate.toISOString(),
            status: "pending",
          }
        : task
    );

    const historyItem = {
      id: Date.now(),
      applianceId: targetTask.applianceId,
      applianceName:
        targetTask.applianceName || "Unknown Appliance",
      taskName: targetTask.taskName || "Maintenance Task",
      completedAt: new Date().toISOString(),
    };

    setTasks(updatedTasks);
    setHistory((prev) => [
      historyItem,
      ...prev,
    ]);

    await saveTasks(updatedTasks);
    await saveHistory([
      historyItem,
      ...history,
    ]);
  };

  const updateAppliance = async (
    updatedAppliance: any
  ) => {
    const updated = appliances.map((item) =>
      item.id === updatedAppliance.id
        ? updatedAppliance
        : item
    );

    setAppliances(updated);

    await saveAppliances(updated);

    const updatedTasks = tasks.map((task) =>
      task.applianceId === updatedAppliance.id
        ? {
            ...task,
            applianceName:
              updatedAppliance.nickname ||
              updatedAppliance.brand,
          }
        : task
    );

    setTasks(updatedTasks);

    await saveTasks(updatedTasks);
  };

  const deleteAppliance = async (
    applianceId: number
  ) => {
    const updatedAppliances =
      appliances.filter(
        (item) => item.id !== applianceId
      );

    const updatedTasks = tasks.filter(
      (task) =>
        task.applianceId !== applianceId
    );

    setAppliances(updatedAppliances);
    setTasks(updatedTasks);

    await saveAppliances(updatedAppliances);
    await saveTasks(updatedTasks);
  };

  const updateSettings = async (
    newSettings: any
  ) => {
    setSettings(newSettings);

    await saveSettings(newSettings);
  };

  const resetAllData = async () => {
    setAppliances([]);
    setTasks([]);
    setHistory([]);

    await saveAppliances([]);
    await saveTasks([]);
    await saveHistory([]);
  };

  return (
    <AppContext.Provider
      value={{
        appliances,
        tasks,
        history,
        settings,
        updateSettings,
        loadData,
        addAppliance,
        completeTask,
        updateAppliance,
        deleteAppliance,
        resetAllData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext)!;
}