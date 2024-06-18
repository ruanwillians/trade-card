import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () =>
      import('layouts/HomeLayout.vue'),
    children: [
      {
        path: '',
        component: () =>
          import('pages/HomePage.vue'),
      },
      {
        path: '/sigin',
        component: () =>
          import('pages/SignIn.vue'),
      },
    ],
  },
  {
    path: '/',
    component: () =>
      import('layouts/HomeLayout.vue'),
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('Token');

      if (token) {
        next('/cards');
      } else {
        next();
      }
    },
    children: [
      {
        path: '/login',
        component: () =>
          import('pages/Login.vue'),
      },
    ],
  },
  {
    path: '/cards',
    component: () =>
      import('layouts/UserLayout.vue'),
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('Token');

      if (token) {
        next();
      } else {
        next('/');
      }
    },
    children: [
      {
        path: '',
        component: () =>
          import('pages/CardsPage.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'trade',
        component: () =>
          import('pages/CreateTradePage.vue'),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: '/cards',
    component: () =>
      import('layouts/UserLayout.vue'),
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('Token');

      if (token) {
        next();
      } else {
        next('/');
      }
    },
    children: [
      {
        path: '',
        component: () =>
          import('pages/CardsPage.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'trade',
        component: () =>
          import('pages/CreateTradePage.vue'),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: '/trade',
    component: () =>
      import('layouts/UserLayout.vue'),
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('Token');

      if (token) {
        next();
      } else {
        next('/');
      }
    },
    children: [
      {
        path: '',
        component: () =>
          import('pages/AllTrades.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'create',
        component: () =>
          import('pages/CreateTradePage.vue'),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () =>
      import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
