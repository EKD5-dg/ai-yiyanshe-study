import badges from '../data/badges.json'

function metricsFrom(state) {
  return {
    lessons_completed: state.completedLessons.length,
    fengshui_read: state.readFengshui.length,
    quiz_best_score: state.quizBest.score,
    quiz_best_combo: state.quizBest.combo,
    streak_days: state.streak.days,
    lingyun: state.lingyun
  }
}

// 返回本次新达成的徽章对象数组
export function newlyUnlocked(state) {
  const m = metricsFrom(state)
  return badges.filter(b => !state.badges.includes(b.id) && m[b.metric] >= b.threshold)
}
