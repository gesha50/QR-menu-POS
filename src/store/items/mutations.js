import {translit} from 'assets/functions/translit'
import {isSameArrs} from "assets/functions/isSameArrs";

export function changeCategory (state,id) {
  state.activeCategoryID = id
  state.categories.map(category => {
    category.isActive = category.id === id;
  })
}

export function createCartForCurrentTable (state, table_id) {
  if (!state.carts[table_id] || state.carts[table_id]==={}) {
    state.carts[table_id] = {
      order_id: null,
      status: 0,
      curCart: [],
      allCart: [],
      priceBefore: 0
    }
  }
  localStorage.setItem('itemInCart', JSON.stringify(state.carts))
}

export function removeAllFromCart (state, table_id) {
  state.carts[table_id] = {
    order_id: null,
    status: 0,
    curCart: [],
    allCart: [],
    priceBefore: 0
  }
  localStorage.setItem('itemInCart', JSON.stringify(state.carts))
}

export function addItemInCart (state, data) {
  // data[0] - item; data[1] - table_id; data[2] - extraArr; data[3] - variant_id
  let itemInCart = {
    id: data[0].id,
    name: data[0].name,
    counter: 0,
    price: data[3] ? data[3].price : data[0].price,
    image: data[0].image,
    variant_id: data[3] ? data[3].id : null
    // variant
    // extras
  }
  itemInCart.variant = []
  data[0].options.forEach(op=>{
    if (op.value !== '') {
      itemInCart.variant.push(op.value)
    }
  })
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
  state.carts[data[1]].curCart.forEach(el => {
    if (el.id === itemInCart.id) {
      let isSameExtras = false
      let isSameVariant = false
      // if extra or variant choose
      if (el.extras.length === 0 && el.variant.length === 0 && itemInCart.extras.length === 0 && el.extras.length === 0) {
        isInCart = true
        el.counter++
      } else {
        if (itemInCart.extras.length === 0 && el.extras.length === 0) {
          isSameExtras = true
        } else {
          if (itemInCart.extras.length && el.extras.length) {
            isSameExtras = isSameArrs(itemInCart.extras, el.extras)
          }
        }
        if (itemInCart.variant.length === 0 && el.variant.length === 0) {
          isSameVariant = true
        }
        if (itemInCart.variant.length) {
          isSameVariant = (itemInCart.variant.length === el.variant.length) && itemInCart.variant.every((elem, i)=> {
            return elem === el.variant[i];
          })
        }

        if (isSameVariant && isSameExtras) {
          isInCart = true
          el.counter++
        }
      }
    }
  })

  if (!isInCart) {
    itemInCart.counter = 1
    state.carts[data[1]].curCart.push(itemInCart)
  }
  localStorage.setItem('itemInCart', JSON.stringify(state.carts))
}

export function orderBlocked(state, arr) {
  let table_id = arr[0]
  let totalPrice = arr[1]
  let order_id = arr[2]
  if (!state.carts[table_id].allCart.length) {
    // first order part go to kitchen
    state.carts[table_id].order_id = order_id
    state.carts[table_id].status = 1
    state.carts[table_id].allCart = [...state.carts[table_id].curCart]
    state.carts[table_id].curCart = []
    state.carts[table_id].priceBefore = Number(totalPrice)
  } else {
    // if have order something else
    state.carts[table_id].priceBefore = Number(state.carts[table_id].priceBefore) + Number(totalPrice)
    // unite 2 array in one
    // state.carts[table_id].allCart = [...state.carts[table_id].allCart, ...state.carts[table_id].curCart]
    state.carts[table_id].curCart.forEach(curCartObj=>{
      let isInCart = false
      state.carts[table_id].allCart.forEach(allCartObj=>{
        if (curCartObj.id === allCartObj.id) {
          if (curCartObj.variant_id
            || allCartObj.variant_id
            || curCartObj.extras.length
            || allCartObj.extras.length) {

            // is same variant
            let isSameVariant = true
            if (curCartObj.variant_id || allCartObj.variant_id) {
              isSameVariant = curCartObj.variant_id === allCartObj.variant_id;
            }

            // is same extra
            let isSameExtras = true
            if (curCartObj.extras.length || allCartObj.extras.length) {
              isSameExtras = false
              if (curCartObj.extras.length && allCartObj.extras.length) {
                isSameExtras = isSameArrs(curCartObj.extras, allCartObj.extras)
              }
            }
            if (isSameVariant && isSameExtras) {
              isInCart = true
              allCartObj.counter++
            }
          } else {
            isInCart = true
            allCartObj.counter++
          }
        }
      })
      if (!isInCart) {
        state.carts[table_id].allCart.push(curCartObj)
      }
    })
    state.carts[table_id].curCart = []
  }
  localStorage.setItem('itemInCart', JSON.stringify(state.carts))
}

export function changeOptionValue (state, arr) {
  // arr[0] - e.target.value;  arr[1] - item; arr[2] - option_id;
  arr[1].options.forEach(op=> {
    if (op.id === arr[2]) {
      op.value = arr[0]
    }
  })
}

export function increment (state, arr) {
  // arr[0] - item; arr[1] - cart; arr[2] - table_id;
  state.carts[arr[2]].curCart.forEach(data => {
    if (arr[0].id === data.id
      && JSON.stringify(arr[0].extras) === JSON.stringify(data.extras)
      && arr[0].variant.every((elem, i) => elem === data.variant[i])
    ) {
      data.counter++
    }
  })
  localStorage.setItem('itemInCart', JSON.stringify(state.carts))
}

export function decrement (state, arr) {
  // arr[0] - item; arr[1] - cart; arr[2] - table_id;
  state.carts[arr[2]].curCart.forEach(data => {
    if (arr[0].id === data.id
      && JSON.stringify(arr[0].extras) === JSON.stringify(data.extras)
      && arr[0].variant.every((elem, i) => elem === data.variant[i])) {
      data.counter--
    }
  })
  localStorage.setItem('itemInCart', JSON.stringify(state.carts))
}

export function removeFromCart (state, arr) {
  // arr[0] - item; arr[1] - cart; arr[2] - table_id;
  state.carts[arr[2]].curCart = state.carts[arr[2]].curCart.filter(el => !(el.id === arr[0].id
    && JSON.stringify(arr[0].extras) === JSON.stringify(el.extras)
    && arr[0].variant.length === el.variant.length
    && arr[0].variant.every((elem, i) => elem === el.variant[i])))
    localStorage.setItem('itemInCart', JSON.stringify(state.carts))
}

export function getTable (state, data) {
  state.areasTablesObj = data.result.map(el=>{
    el.tables.map(table =>{
      table['status'] = 0
      return table
    })
    return el
  })
  state.otherTables = data.otherTables.map(table =>{
    table['status'] = 0
    table['isTimerStart'] = false
    return table
  })
  state.firstScreenTables = translit(data.result[0].restoArea.name)
  console.log(state.firstScreenTables)
}

export function setTimerStart(state, tableId) {
  state.areasTablesObj = state.areasTablesObj.map(data => {
    data.tables.map(table=>{
      if (table.id === tableId) {
        table.isTimerStart = true
      }
      return table
    })
    return data
  })
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
    obj.options.forEach(op=>{
      op['value'] = ''
    })
    return obj
  })
}

export function setSearchItemInMenu(state, val) {
  state.searchItemInMenu = val
}

export function changeComment(state, arr) {
  // arr[0] - table_id; arr[1] - comment
  state.comments[arr[0]] = arr[1]
  localStorage.setItem('comments', JSON.stringify(state.comments))
}

export function deleteComment(state, table_id) {
  state.comments[table_id] = ''
  localStorage.setItem('comments', JSON.stringify(state.comments))
}
