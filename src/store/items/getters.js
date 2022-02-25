export function activeCategoryID (state) {
  return state.activeCategoryID
}
export function areasTablesObj (state) {
  return state.areasTablesObj
}

export function otherTables (state) {
  return state.otherTables
}

export function firstScreenTables (state) {
  return state.firstScreenTables
}

export function categories (state) {
  return  state.categories
}

export function items (state) {
  return  state.items
}

export const ItemsInCart = state => id => {
  return state.carts[id]
}

export function carts (state) {
  return  state.carts
}

export function searchItemInMenu (state) {
  return state.searchItemInMenu
}

export function comments (state) {
  return  state.comments
}

export const comment = state => id => {
  return state.comments[id]
}


