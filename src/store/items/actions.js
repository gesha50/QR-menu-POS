import { api } from 'boot/axios'
import {LocalStorage} from "quasar";

export function changeCategory ({commit}, id) {
  commit('changeCategory', id)
}

export function addItemInCart ({commit}, item) {
  commit('addItemInCart', item)
}

export function decrement ({commit}, item) {
  if (item.counter === 1) {
    commit('removeFromCart', item)
  } else {
    commit('decrement', item)
  }
}

export function removeFromCart({commit}, item) {
  commit('removeFromCart', item)
}

export function increment ({commit}, item) {
  commit('increment', item)
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
  let restaurant_id = LocalStorage.getItem('restaurantID')
  api.get('api/menuItems')
    .then(res => {
      commit('getItems', res.data.data)
    })
    .catch(e=>{
      console.log(e)
    })
}

