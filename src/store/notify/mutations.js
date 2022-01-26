
export function addNotify (state, notify) {
  console.log(state.notifications)
  state.notifications = [...state.notifications, notify]
<<<<<<< HEAD
  localStorage.setItem('notify', JSON.stringify(state.notifications))
=======
  console.log(state.notifications)
>>>>>>> 62df4ef82015238532de8c5cbded5fa8db9943d8
}

export function seeAllNotify(state) {
  console.log(state.notifications)
  state.notifications.map(el=> el.isReading = true)
}

