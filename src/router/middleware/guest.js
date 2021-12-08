export default function guest ({ next, store }){
  if(store.getters['settings/auth'].loggedIn){
    return next({
      name: 'index'
    })
  }

  return next()
}
