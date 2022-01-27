
export function addNotify (state, notify) {
  console.log(state.notifications)
  state.notifications.push(notify)
  console.log(state.notifications)
}

export function seeAllNotify(state) {
  console.log(state.notifications)
  state.notifications.map(el=> el.isReading = true)
}

