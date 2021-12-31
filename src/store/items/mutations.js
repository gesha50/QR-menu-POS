import {translit} from 'assets/functions/translit'

export function changeCategory (state,id) {
  state.activeCategoryID = id
  state.categories.map(category => {
    category.isActive = category.id === id;
  })
}

export function createCartForCurrentTable (state, table_id) {
  if (!state.carts[table_id]) {
    state.carts[table_id] = []
  }
}

export function addItemInCart (state, data) {
  let itemInCart = {
    id: data[0].id,
    counter: 0,
    price: data[0].price,
    image: data[0].image,
    extras: data[0].extras.length ? data[0].extras : null,
    variants: data[0].variants.length ? data[0].variants : null,
    options: data[0].options.length ? data[0].options : null
  }
  // data[0] - item; data[1] - table_id; data[2] - extraArr
  let isInCart = false
  state.carts[data[1]].forEach(el => {
    if (el.id === itemInCart.id) {
      isInCart = true
      el.counter++
    }
  })

  if (!isInCart) {
    itemInCart.counter = 1
    state.carts[data[1]].push(itemInCart)
  }
}

export function increment (state, arr) {
  // arr[0] - item; arr[1] - cart; arr[2] - table_id;
  state.carts[arr[2]].forEach(data => {
    if (arr[0].id === data.id) {
      data.counter++
    }
  })
}

export function decrement (state, arr) {
  // arr[0] - item; arr[1] - cart; arr[2] - table_id;
  state.carts[arr[2]].forEach(data => {
    if (arr[0].id === data.id) {
      data.counter--
    }
  })
}

export function removeFromCart (state, arr) {
  // arr[0] - item; arr[1] - cart; arr[2] - table_id;
  state.carts[arr[2]] = state.carts[arr[2]].filter(el => el.id !== arr[0].id)
}
const obj1 = {
    id: 1,
    name: 'На вынос',
    status: 1,
}
const obj2 = {
    id: 2,
    name: 'Доставка',
    status: 0,
}
export function getTable (state, data) {
  state.areasTablesObj = data.result
  state.otherTables = data.otherTables
  state.firstScreenTables = translit(data.result[0].restoArea.name)
  console.log(state.firstScreenTables.toLowerCase())
}

export function getCategories(state, data) {
  state.categories = data.map((obj, i) => {
    obj['img'] = ''
    obj['isActive'] = i === 0;
    if (i === 0) {
      state.activeCategoryID = obj.id
    }
    return obj
  })
}

export function getItems (state, data) {
  state.items = data.map((obj, i) => {
    obj['isActive'] = 1
    return obj
  })
}
