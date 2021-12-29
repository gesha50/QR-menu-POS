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
  // data[0] - item; data[1] - table_id; data[2] - extraArr
  let isInCart = false
  state.carts[data[1]].forEach(el => {
    if (el.id === data[0].id) {
      isInCart = true
      el.counter++
    }
  })

  if (!isInCart) {
    data[0].counter = 1
    state.carts[data[1]].push(data[0])
  }
}

export function addItemInCartWithExtra (state, data) {
  // data[0] - item; data[1] - table_id; data[2] - extraArr
  let isInCart = false
  state.carts[data[1]].forEach(el => {
    console.log('1')
    if (el.extras.length) {
      for (let i=0;i<el.extras.length;i++) {
        console.log('3')
        for (let j=0;j<data[0].extras.length;j++) {
          console.log('4')
          console.log(el.extras[i])
          console.log(data[0].extras[j])
          if (el.id === data[0].id && el.extras[i].isChecked === true) {
            console.log('5')
            isInCart = true
          }
          if (el.id === data[0].id && el.extras[i].isChecked !== data[0].extras[j].isChecked) {
            console.log('6')
            isInCart = false
          }
        }
      }
    }
    if (isInCart) {
      console.log('ok')
      el.counter++
    }
  })
  if (!isInCart) {
    data[0].counter = 1
    let oldItem = data[0]
    let newItem = data[0]
    newItem.extras.map(el => {
      if (el.id === data[2][0]) {
        el.isChecked = true
      }
    })
    state.carts[data[1]].push(newItem)
    data[0] = oldItem
  }
}

export function increment (state, arr) {
  state.carts[arr[2]].forEach(data => {
    if (arr[0].id === data.id) {
      data.counter++
    }
  })
}

export function decrement (state, arr) {
  state.carts[arr[2]].forEach(data => {
    if (arr[0].id === data.id) {
      data.counter--
    }
  })
}

export function removeFromCart (state, arr) {
  state.carts[arr[2]] = state.carts[arr[2]].filter(el => {
    if (el.id === arr[0].id) {
      arr[0].extras.forEach(ex => ex.isChecked = false)
    }
    return el.id !== arr[0].id
  })
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
    if (obj['extras'].length) {
      obj['extras'].map(el => el.isChecked = false)
    }
    return obj
  })
}
