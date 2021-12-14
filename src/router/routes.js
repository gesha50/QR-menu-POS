import guest from './middleware/guest'
import auth from './middleware/auth'
import restaurant from "src/router/middleware/restaurant";
import notRestaurant from "src/router/middleware/notRestaurant";
import restaurantWaiter from "src/router/middleware/restaurantWaiter";

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'index', component: () => import('pages/Index.vue') },
      { path: ':table/menu', name: 'menu', component: () => import('pages/Menu.vue') },
    ],
    meta: {
      middleware: [
        auth
      ]
    },
  },
  {
    path: '/login',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '',name: 'login', component: () => import('pages/Login.vue') }
    ],
    meta: {
      middleware: [
        guest
      ]
    }
  },
  {
    path: '/settings',
    component: () => import('layouts/SettingsLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Settings.vue') }
    ]
  },
  {
    path: '/restaurant',
    component: () => import('layouts/RestaurantLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Waiters.vue'), name: 'restaurant' },
      { path: 'login/:id', component: () => import('pages/LoginWaiter.vue'), props: true }
    ],
    meta: {
      middleware: [
        notRestaurant
      ]
    }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
