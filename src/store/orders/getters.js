
export function columns (state) {
  return state.columns
}

export function rows (state) {
  return state.rows.filter(row => row.actions[0] !== 'действий не требуется')
}

