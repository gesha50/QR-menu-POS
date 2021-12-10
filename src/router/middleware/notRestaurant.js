export default function notRestaurant ({ next, store }){
  if(!store.getters['settings/owner'].loggedIn){
    return next({
      name: 'login'
    })
  }
  return next()
}
