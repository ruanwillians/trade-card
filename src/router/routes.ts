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

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () =>
      import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
