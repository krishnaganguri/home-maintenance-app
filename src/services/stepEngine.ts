import { taskSteps } from "../data/taskSteps";

export function getTaskSteps(task: any) {
  const taskKey = task.taskName.replace(/\s/g, "");

  const key =
    `${task.applianceType}_${taskKey}`;

  return (
    taskSteps[key] || [
      "Follow manufacturer instructions carefully",
    ]
  );
}