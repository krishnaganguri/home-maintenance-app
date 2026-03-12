function groupTasksByTimeline(tasks: any[]) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const sections = {
    overdue: [],
    today: [],
    tomorrow: [],
    upcoming: [],
  };

  tasks.forEach((task) => {
    const due = new Date(task.dueDate);
    due.setHours(0, 0, 0, 0);

    if (due < today) {
      sections.overdue.push(task);
    } else if (due.getTime() === today.getTime()) {
      sections.today.push(task);
    } else if (due.getTime() === tomorrow.getTime()) {
      sections.tomorrow.push(task);
    } else {
      sections.upcoming.push(task);
    }
  });

  return sections;
}

export default {
    groupTasksByTimeline,
}