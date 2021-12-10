export default function guest ({ next, store }){
  if(store.getters['settings/auth'].loggedIn || store.getters['settings/owner'].loggedIn){
    return next({
      name: 'index'
    })
  }

  return next()
}
