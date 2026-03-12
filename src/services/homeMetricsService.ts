export function calculateHomeMetrics(tasks: any[]) {
  const today = new Date();

  const overdue = tasks.filter(
    (task) =>
      new Date(task.dueDate) < today && task.status !== "done"
  );

  const upcoming = tasks.filter(
    (task) =>
      new Date(task.dueDate) >= today && task.status !== "done"
  );

  const done = tasks.filter((task) => task.status === "done");

  let score =
    100 -
    overdue.length * 10 -
    upcoming.length * 2;

  if (score < 0) score = 0;

  return {
    overdueCount: overdue.length,
    upcomingCount: upcoming.length,
    doneCount: done.length,
    score,
  };
}