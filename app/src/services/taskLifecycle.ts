import storageService from "../services/storageService";

export default async function completeTask(taskId: number) {
  const tasks = await storageService.getTasks();
  const updatedTasks = tasks.map((task: any) => {
    if (task.id === taskId) {
      const nextDate = new Date(task.dueDate);
      nextDate.setDate(nextDate.getDate() + task.frequencyDays);
      return {
        ...task,
        dueDate: nextDate.toISOString(),
        status: "pending",
      };
    }
    return task;
  });

const sortedTasks = updatedTasks.sort((a: any, b: any) => 
    new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
);
await storageService.saveTasks(sortedTasks);
}