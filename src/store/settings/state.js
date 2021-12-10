export default function () {
  return {
    lang: 'en-US',
    isRestaurant: 'Choose mode',
    restaurant: '',
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
