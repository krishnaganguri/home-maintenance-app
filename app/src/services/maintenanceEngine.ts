import mainRules from "./maintenanceRules";

export default function generateMaintenanceTasks(applianceType: string) {
  const rules = mainRules.maintenanceRules[applianceType.toLowerCase() as keyof typeof mainRules.maintenanceRules];

  if (!rules) return [];

  const today = new Date();

  const tasks = rules.map((rule) => {
    const dueDate = new Date();
    dueDate.setDate(today.getDate() + rule.frequencyDays);

    return {
        id: Date.now() + Math.random(),
        taskName: rule.task,
        dueDate: dueDate.toISOString(),
        frequencyDays: rule.frequencyDays,
        status: "pending",
    };
  });

  return tasks;
}