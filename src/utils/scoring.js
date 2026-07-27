export const BASE_SCORE = 10

// combo 为本题答对后的连击数（从 1 起）
export function comboScore(combo) {
  return Math.round(BASE_SCORE * (1 + 0.1 * (combo - 1)))
}
