export function calculateHomeScore(tasks: any[]) {
  let score = 100;

  const today = new Date();

  tasks.forEach((task) => {
    const dueDate = new Date(task.dueDate);

    if (dueDate < today) {
      score -= 10; // overdue penalty
    } else {
      score -= 2; // pending task penalty
    }
  });

  if (score < 0) score = 0;

  return score;
}

export default calculateHomeScore;