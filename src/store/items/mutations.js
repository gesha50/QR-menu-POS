import { translit } from 'assets/functions/translit'
import {LocalStorage} from "quasar";

export function changeCategory (state,id) {
  state.activeCategoryID = id
  state.categories.map(category => {
    category.isActive = category.id === id;
  })
}

export function addItemInCart (state, item) {
  state.items.forEach(data => {
    if (item.id === data.id) {
      if (!item.isInCart) {
        data.isInCart = true
        state.ItemsInCart.push(item)
      }
      data.counter++
    }
  })
  console.log(state.items)
}

export function decrement (state, item) {
  state.items.forEach(data => {
    if (item.id === data.id) {
      data.counter--
    }
  })
}

export function increment (state, item) {
  state.items.forEach(data => {
    if (item.id === data.id) {
      data.counter++
    }
  })
}

export function removeFromCart (state, item) {
  state.items.forEach(data => {
    if (item.id === data.id) {
      data.isInCart = false
      data.counter = 0
    }
  })
  state.ItemsInCart = state.ItemsInCart.filter(el =>  el.id !== item.id)
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
}

export function getCategories(state, data) {
  let newData = data.map((obj,i) => {
    obj['img'] = ''
    obj['isActive'] = i === 0;
    if (i === 0) {
      state.activeCategoryID = obj.id
    }
    return obj
  })
  state.categories = newData
}

export function getItems (state, data) {
  let newData = data.map((obj,i) => {
    obj['counter'] = 0
    obj['isInCart'] = false
    obj['isActive'] = 1
    return obj
  })
  state.items = newData
  console.log(state.items)
}
