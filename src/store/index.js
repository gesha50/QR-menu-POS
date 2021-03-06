import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'
import settings from './settings'
import items from './items'
import orders from './orders'
import archive from './archive'
import notify from './notify'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      settings,
      items,
      orders,
      archive,
      notify,
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store
})
