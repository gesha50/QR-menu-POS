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
  let itemInCart = {
    id: data[0].id,
    counter: 0,
    price: data[0].price,
    image: data[0].image,
    variants: data[0].variants.length ? data[0].variants : [],
    options: data[0].options.length ? data[0].options : []
  }
  itemInCart.extras = data[0].extras.filter(el => {
    let isInExtra = false
    data[2].forEach(id => {
      if (el.id === id) {
        return isInExtra = true
      }
    })
    return isInExtra
  })
  let isInCart = false
  state.carts[data[1]].forEach(el => {
    if (el.id === itemInCart.id) {
      // if no extra choose
      if (data[2].length) {
        if (itemInCart.extras.length || itemInCart.variants.length || itemInCart.options.length) {
          if (itemInCart.extras.length) {
            // sort from 0 to 99999
            itemInCart.extras.sort(function (a, b) {
              return a - b;
            });
            // sort from 0 to 99999
            el.extras.sort(function (a, b) {
              return a - b;
            });
            if (JSON.stringify(itemInCart.extras) === JSON.stringify(el.extras)) {
              isInCart = true
              el.counter++
            }
          }
          if (itemInCart.variants.length) {

          }
          if (itemInCart.options.length) {

          }
        } else {
          isInCart = true
          el.counter++
        }
      } else {
        console.log(el.extras.length)
        if (el.extras.length === 0){
          isInCart = true
          el.counter++
        }
      }
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
    if (arr[0].id === data.id && JSON.stringify(arr[0].extras) === JSON.stringify(data.extras)) {
      data.counter++
    }
  })
}

export function decrement (state, arr) {
  // arr[0] - item; arr[1] - cart; arr[2] - table_id;
  console.log(state.carts[arr[2]])
  state.carts[arr[2]].forEach(data => {
    console.log(data)
    if (arr[0].id === data.id && JSON.stringify(arr[0].extras) === JSON.stringify(data.extras)) {
      console.log('----')
      data.counter--
    }
  })
}

export function removeFromCart (state, arr) {
  // arr[0] - item; arr[1] - cart; arr[2] - table_id;
  state.carts[arr[2]] = state.carts[arr[2]].filter(el => !(el.id === arr[0].id && JSON.stringify(arr[0].extras) === JSON.stringify(el.extras)))
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
