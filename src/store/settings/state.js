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
      token: null,
    }
  }
}
