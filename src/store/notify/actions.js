
export function addNotify ({commit}, notify) {
  commit('addNotify', notify)
}

export function removeNotify ({commit}, index) {
  commit('removeNotify', index)
}

export function seeAllNotify ({commit}) {
  commit('seeAllNotify')
}
