<template>
  <q-layout view="lHh Lpr lFf">
    <Header>
      <div class="flex justify-between q-ma-sm">
        <router-link
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="q-pa-md custom-link"
          :class="{
            'text-secondary': isActive(link.to),
          }"
        >
          {{ link.text }}
        </router-link>
      </div>
    </Header>
    <q-page-container>
      <div class="bg-image">
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import Header from 'src/components/Header.vue';

  interface RouteLink {
    to: string;
    text: string;
  }

  const route = useRoute();

  const isActive = (path: string) => {
    return route.path === path;
  };

  const links: RouteLink[] = [
    { to: '/', text: 'Trades' },
    { to: '/login', text: 'Login' },
    { to: '/sigin', text: 'Sing-in' },
  ];
</script>

<style>
  .custom-link {
    text-decoration: none;
    color: #fff;
    font-weight: bold;
  }

  .bg-image {
    background-image: url('src/assets/bg-home.png');
    background-size: cover;
    background-position: left;
    background-repeat: no-repeat;
    height: 100vh;
    width: 100%;
  }
</style>
