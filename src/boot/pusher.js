import {boot} from 'quasar/wrappers'
import Pusher from 'pusher-js'
import Echo from 'laravel-echo';

const PUSHER_APP_KEY = 'c812c9319e07a8503510'
const CLUSTER = 'eu'

// "async" is optional;
export default boot(async ({ app }) => {

  // app.config.globalProperties.$Echo = new Echo({
  //   broadcaster: 'pusher',
  //   key: PUSHER_APP_KEY,
  //   cluster: CLUSTER,
  //   forceTLS: true
  // });

  app.config.globalProperties.$pusher = new Pusher(PUSHER_APP_KEY, {cluster: CLUSTER})
})
