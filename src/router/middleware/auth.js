export default function auth ({ next, store }){
  if(!store.getters['settings/auth'].loggedIn){
    return next({
      name: 'login'
    })
  }
  return next()
}
