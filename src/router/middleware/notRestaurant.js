import router from '../index'

export default function notRestaurant ({ next, store }){
  if(!store.getters['settings/owner'].loggedIn){
    return next({
      name: 'login'
    })
  }
  if(store.getters['settings/auth'].loggedIn){
    return next({
      name: 'index'
    })
  }
  return next()
}
