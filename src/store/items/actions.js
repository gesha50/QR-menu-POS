import { api } from 'boot/axios'
import {LocalStorage} from "quasar";

export function changeCategory ({commit}, id) {
  commit('changeCategory', id)
}

export function createCartForCurrentTable({commit}, table_id) {
  commit('createCartForCurrentTable', table_id)
}

export function addItemInCart ({commit}, data) {
  commit('addItemInCart', data)
}

export function changeOptionValue ({commit}, arr) {
  commit('changeOptionValue', arr)
}

export function decrement ({commit}, arr) {
  arr[1].forEach(el => {
    if (arr[0].id === el.id
      && JSON.stringify(arr[0].extras) === JSON.stringify(el.extras)
      && arr[0].variant.every((elem, i) => elem === el.variant[i])
    ) {
      if (el.counter === 1) {
        commit('removeFromCart', arr)
      } else {
        commit('decrement', arr)
      }
    }
  })
}

export function removeFromCart({commit}, arr) {
  commit('removeFromCart', arr)
}

export function increment ({commit}, arr) {
  commit('increment', arr)
}

export function getTable({commit}) {
  let restaurant_id = LocalStorage.getItem('restaurantID')
  api.get('api/tables/'+restaurant_id, {
    headers: {
      Authorization: 'Bearer '+LocalStorage.getItem('userToken')
    }
  })
    .then(res => {
      console.log(res.data)
      commit('getTable', res.data)
    })
    .catch(e=>{
      console.log(e)
    })
}

export function setTimerStart({commit}, tableId) {
  commit('setTimerStart', tableId)
}

export function getCategories ({commit}) {
  api.get('api/categories', {
    headers: {
      Authorization: 'Bearer '+LocalStorage.getItem('userToken')
    }
  })
    .then(res => {
      commit('getCategories', res.data.categories)
    })
    .catch(e=>{
      console.log(e)
    })
}

export function getItems ({commit}) {
  api.get('api/menuItems', {
    headers: {
      Authorization: 'Bearer '+LocalStorage.getItem('userToken')
    }
  })
    .then(res => {
      commit('getItems', res.data.data)
    })
    .catch(e=>{
      console.log(e)
    })
}

