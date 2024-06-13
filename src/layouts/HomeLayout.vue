<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <Header />
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import Header from '../components/Header.vue';
</script>
