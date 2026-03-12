export function formatTaskDueLabel(date: string) {
  if (!date) return "No due date";
  
  const due = new Date(date);
  if (isNaN(due.getTime())) {
    return "Invalid due date";
  }
  const today = new Date();
  const diff =
    Math.ceil(
      (due.getTime() - today.getTime()) /
      (1000 * 60 * 60 * 24)
    );

  if (diff < 0) {
    return `${Math.abs(diff)} days overdue`;
  }

  if (diff === 0) {
    return "Due today";
  }

  return `Due in ${diff} days`;
}