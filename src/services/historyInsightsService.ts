export function calculateHistoryInsights(
  history: any[] = []
) {
  const totalCompleted = history.length;

  const streak = Math.min(totalCompleted, 12);

  const savings = totalCompleted * 8;

  const applianceCounts: Record<string, number> =
    {};

  history.forEach((item) => {
    const key =
      item.applianceName ||
      "Unknown Appliance";

    applianceCounts[key] =
      (applianceCounts[key] || 0) + 1;
  });

  const reliability =
    Object.entries(applianceCounts)
      .sort((a, b) => b[1] - a[1])[0]?.[0] ||
    "No appliance yet";

  return {
    streak,
    savings,
    reliability,
  };
}

export function calculateApplianceHealth(
  appliance: any,
  tasks: any[] = [],
  history: any[] = []
) {
  const applianceTasks = tasks.filter(
    (t) => t.applianceId === appliance.id
  );

  const applianceHistory = history.filter(
    (h) => h.applianceId === appliance.id
  );

  const overdueCount =
    applianceTasks.filter(
      (task) =>
        new Date(task.dueDate) < new Date()
    ).length;

  const completedCount =
    applianceHistory.length;

  let score =
    100 -
    overdueCount * 12 +
    completedCount * 3;

  score = Math.max(
    0,
    Math.min(100, score)
  );

  let trend = "Stable";

  if (score === 100) {
    trend = "Good";
  }else if (score >= 85) {
    trend = "Improving";
  } else if (score < 60) {
    trend = "Needs Attention";
  }

  return {
    score,
    trend,
    overdueCount,
    completedCount,
  };
}