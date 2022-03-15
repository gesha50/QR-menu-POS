import {LocalStorage} from "quasar";

export default function () {
  return {
    lang: 'en-US',
    isRestaurant: 'Choose mode',
    restaurant: '',
    restaurantID: null,
    backgroundImagePath: process.env.API + '/storage/pos/background/bg-login.jpg',
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
