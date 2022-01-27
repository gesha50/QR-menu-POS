
export function addNotify (state, notify) {
  console.log(state.notifications)
  state.notifications = [...state.notifications, notify]
  // localStorage.setItem('notify', JSON.stringify(state.notifications))
}

// export function removeNotify (state, index) {
//   state.notifications.splice(indexOf(index), 1);
//   localStorage.setItem('notify', JSON.stringify(state.notifications))
// }

export function seeAllNotify(state) {
  console.log(state.notifications)
  state.notifications.map(el=> el.isReading = true)
}

