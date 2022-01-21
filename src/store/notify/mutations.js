
export function addNotify (state, notify) {
  state.notifications = [...state.notifications, notify]
}

export function seeAllNotify(state) {
  console.log(state.notifications)
  state.notifications.map(el=> el.isReading = true)
}

