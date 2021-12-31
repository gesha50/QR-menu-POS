import {LocalStorage} from "quasar";

export default function () {
  return {
    lang: 'en-US',
    isRestaurant: 'Choose mode',
    restaurant: '',
    restaurantID: null,
    owner: {
      email: null,
      loggedIn: false,
      token: null,
      restaurant_id: null
    },
    user: {
      id: null,
      loggedIn: false,
      token: LocalStorage.getItem('userToken') ? LocalStorage.getItem('userToken'): null,
    },
    configAxios: {
      headers: {
        Authorization: 'Bearer ' + LocalStorage.getItem('userToken')
      }
    }
  }
}
