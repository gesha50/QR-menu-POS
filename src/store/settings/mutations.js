export function setLang (state, value) {
  state.lang = value
}

export function userAuth (state, value) {
  state.user.loggedIn = value
}
