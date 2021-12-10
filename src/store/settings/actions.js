import { LocalStorage } from 'quasar'

export function setLang ({ commit }, value) {
  commit('setLang', value)
}

export function userAuth ({ commit }, arr) {
  LocalStorage.set('userAuth', arr[0])
  LocalStorage.set('userToken', arr[1])
  commit('userAuth', arr)
}

export function setUserID ({ commit }, val) {
  console.log(val)
  LocalStorage.set('user_id', val)
  commit('setUserID', val)
}

export function ownerAuth ({ commit }, arr) {
  LocalStorage.set('ownerAuth', arr[0])
  LocalStorage.set('ownerToken', arr[1])
  commit('ownerAuth', arr)
}

export function setOwnerEmail ({ commit }, val) {
  LocalStorage.set('ownerEmail', val)
  commit('setOwnerEmail', val)
}

export function setIsRestaurant ({ commit }, value) {
  LocalStorage.set('isRestaurant', value)
  commit('setIsRestaurant', value)
}

export function setRestaurantName ({ commit }, value) {
  commit('setRestaurantName', value)
}

export function logoutWaiter ({ commit }, value) {
  console.log(value)
  if (value) {
    // restaurant mode
    // remove all localstorage var
    LocalStorage.remove('userAuth')
    LocalStorage.remove('userToken')
    LocalStorage.remove('user_id')

    commit('logoutWaiter')
  } else {
    // no restaurant mode
    // remove all localstorage var
    LocalStorage.remove('userAuth')
    LocalStorage.remove('userToken')

    commit('logoutRestaurantWaiter')
  }
  commit('logoutRestaurantWaiter')
}

export function logoutOwner ({ commit }) {
  LocalStorage.remove('ownerAuth')
  LocalStorage.remove('ownerToken')
  commit('logoutRestaurantOwner')
}
