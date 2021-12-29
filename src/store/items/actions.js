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

export function addItemInCartWithExtra ({commit}, data) {
  commit('addItemInCartWithExtra', data)
}

export function decrement ({commit}, arr) {
  arr[1].forEach(el => {
    if (arr[0].id === el.id) {
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
  api.get('api/tables/'+restaurant_id)
    .then(res => {
      console.log(res.data)
      commit('getTable', res.data)
    })
    .catch(e=>{
      console.log(e)
    })
}

export function getCategories ({commit}) {
  api.get('api/categories')
    .then(res => {
      commit('getCategories', res.data.categories)
    })
    .catch(e=>{
      console.log(e)
    })
}

export function getItems ({commit}) {
  api.get('api/menuItems')
    .then(res => {
      commit('getItems', res.data.data)
    })
    .catch(e=>{
      console.log(e)
    })
}

