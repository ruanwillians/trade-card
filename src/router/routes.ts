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
        path: '/login',
        component: () =>
          import('pages/Login.vue'),
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
        path: 'cards',
        component: () =>
          import('pages/CardsPage.vue'),
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
