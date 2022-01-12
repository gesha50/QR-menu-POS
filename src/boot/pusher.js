import {boot} from 'quasar/wrappers'
import Pusher from 'pusher-js'

const YOUR_PUSHER_APP_KEY = 'c812c9319e07a8503510'
const YOUR_CLUSTER = 'eu'

// "async" is optional;
export default boot(async ({ app }) => {
  app.config.globalProperties.$pusher = new Pusher(YOUR_PUSHER_APP_KEY, {cluster: YOUR_CLUSTER})
})
