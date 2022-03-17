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
      { path: 'menu/:table', name: 'menu', component: () => import('pages/Menu.vue') },
      { path: 'archive', name: 'archive', component: () => import('pages/Archive.vue') },
      { path: 'orders', name: 'orders', component: () => import('pages/Orders.vue') },
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
      {
        path: '',
        name: 'login',
        component: () => import('pages/Login.vue'),
        children: [
          {name: 'login', path: '', component: () => import('components/login/LoginMode')},
        ],
      }
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
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Waiters.vue'), name: 'restaurant' },
      { path: 'login/:id', component: () => import('pages/LoginWaiter.vue'), props: true },
      { path: 'settings', component: () => import('pages/RestaurantSettings.vue'), name: 'restaurant.settings'}
    ],
    meta: {
      middleware: [
        notRestaurant
      ]
    }
  },

  {
    path: '/no-connection',
    component: () => import('layouts/SettingsLayout.vue'),
    children: [
      { path: '', component: () => import('pages/NoConnection.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('layouts/SettingsLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Error404.vue') }
    ]
  }
]

export default routes
