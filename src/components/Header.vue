<template>
  <q-header elevated class="bg-dark">
    <q-toolbar>
      <q-toolbar-title>
        <q-img
          class="image q-ma-md"
          :src="logo"
        />
      </q-toolbar-title>

      <slot></slot>
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
  import logo from '../assets/Logotipo.svg';
  defineOptions({
    name: 'HeaderPage',
  });
</script>

<style>
  .image {
    width: 4em;
  }
</style>
