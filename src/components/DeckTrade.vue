<template>
  <div
    class="col-sm-12 col-xs-12 col-md-6 justify-center"
  >
    <h4
      class="row q-py-sm justify-center text-bold rounded-borders q-mx-xl text-white"
      :class="color"
    >
      {{ title }}
    </h4>
    <div class="row justify-center">
      <FlipCard
        :card="card"
        v-for="card in cards"
        :key="card.id"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
  import { Card } from 'src/types/Cards';
  import FlipCard from './FlipCard.vue';

  defineOptions({
    name: 'DeckTrade',
  });

  export interface DeckTrade {
    cards: Card[];
    title: string;
    color?: string;
  }

  defineProps<DeckTrade>();
</script>
