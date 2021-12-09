export function setLang (state, value) {
  state.lang = value
}

export function userAuth (state, arr) {
  state.user.loggedIn = arr[0]
  state.user.token = arr[1]
}

export function setUserID (state, val) {
  state.user.id = val
}

export function ownerAuth (state, arr) {
  state.owner.loggedIn = arr[0]
  state.owner.token = arr[1]
}

export function setOwnerEmail (state, val) {
  state.owner.email = val
}

export function setIsRestaurant (state, value) {
  state.isRestaurant = value
}

export function setRestaurantName (state, value) {
  state.restaurant = value
}
