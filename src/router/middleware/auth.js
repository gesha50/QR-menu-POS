export default function auth ({ next, store }){
  if(!store.getters['settings/auth'].loggedIn){
    return next({
      name: 'restaurant'
    })
  }
  if(!store.getters['settings/auth'].loggedIn && !store.getters['settings/owner'].loggedIn){
    return next({
      name: 'login'
    })
  }
  return next()
}
