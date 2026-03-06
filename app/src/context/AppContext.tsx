import React, {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import storageService from "../services/storageService";

type AppContextType = {
  appliances: any[];
  tasks: any[];
  history: any[];

  loadData: () => Promise<void>;

  addAppliance: (appliance: any, newTasks: any[]) => Promise<void>;

  completeTask: (taskId: number) => Promise<void>;
};

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: any) {
  const [appliances, setAppliances] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);

  const loadData = async () => {
    const storedAppliances = await storageService.getAppliances();
    const storedTasks = await storageService.getTasks();

    setAppliances(storedAppliances);
    setTasks(storedTasks);
  };

  useEffect(() => {
    loadData();
  }, []);

  const addAppliance = async (appliance: any, newTasks: any[]) => {
    const updatedAppliances = [...appliances, appliance];
    const updatedTasks = [...tasks, ...newTasks];

    setAppliances(updatedAppliances);
    setTasks(updatedTasks);

    await storageService.saveAppliances(updatedAppliances);
    await storageService.saveTasks(updatedTasks);
  };

  const completeTask = async (taskId: number) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        const nextDate = new Date();
        nextDate.setDate(nextDate.getDate() + task.frequencyDays);

        const historyItem = {
          ...task,
          completedAt: new Date().toISOString(),
        };

        setHistory((prev) => [historyItem, ...prev]);

        return {
          ...task,
          dueDate: nextDate.toISOString(),
        };
      }

      return task;
    });

    setTasks(updatedTasks);

    await storageService.saveTasks(updatedTasks);
  };

  return (
    <AppContext.Provider
      value={{
        appliances,
        tasks,
        history,
        loadData,
        addAppliance,
        completeTask,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext)!;
}