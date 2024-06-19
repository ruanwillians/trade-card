<template>
  <q-card class="card">
    <q-card-section class="column items-center">
      <FlipCard
        :card="props.card"
        class="q-mb-sm"
      />
      <div class="subtitle-card">
        <h5
          class="row q-ma-none q-my-md q-mx-md text-center text-bold items-center"
        >
          {{ props.card.name }}
        </h5>
      </div>

      <slot></slot>
    </q-card-section>
  </q-card>
</template>
<script setup lang="ts">
  import { CardProps } from '../types/Cards';
  import FlipCard from './FlipCard.vue';
  defineOptions({
    name: 'CardTrade',
  });

  const props = defineProps<CardProps>();
</script>

<style scoped>
  .card {
    width: 85%;
    height: auto;
    margin: 2em 0 2em 2em;
    padding-top: 1em;
    border-radius: 25px;
    background-color: rgb(29, 9, 46);
    border: 1px solid rgb(78, 33, 99);
  }

  .subtitle-card {
    height: 10vh;
    display: flex;
    justify-items: center;
    justify-content: center;
  }

  @media (max-width: 720px) {
    .subtitle-card {
      height: 12vh;
    }
  }
</style>
