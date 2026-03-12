import { Appliance, Task } from "../types/types";
import mainRules from "./maintenanceRules";

export default function generateMaintenanceTasks(appliance: Appliance): Task[] {
  const rules = mainRules.maintenanceRules[appliance.type.toLowerCase() as keyof typeof mainRules.maintenanceRules];

  if (!rules) return [];

  const today = new Date();

  const tasks = rules.map((rule) => {
    const dueDate = new Date();
    dueDate.setDate(today.getDate() + rule.frequencyDays);

    return {
        id: Date.now() + Math.random(),
        taskName: rule.task,
        applianceName: appliance.nickname ||
                        appliance.brand ||
                        appliance.model,
        dueDate: dueDate.toISOString(),
        frequencyDays: rule.frequencyDays,
        status: "pending",
        applianceId: appliance.id,
        applianceType: appliance.type,
        createdAt: new Date().toISOString(),
    };
  });

  return tasks;
}