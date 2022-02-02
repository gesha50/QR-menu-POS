import {api} from "boot/axios";
import {LocalStorage} from "quasar";

export function getOrders ({commit}) {
    api.get('/api/v2/vendor/orders', {
      headers: {
        Authorization: 'Bearer '+LocalStorage.getItem('userToken')
      }
    })
    .then(res=> {
      console.log(res.data)
      commit('getOrders', res.data)
    })
    .catch(e=>{
      console.log(e)
    })
}

