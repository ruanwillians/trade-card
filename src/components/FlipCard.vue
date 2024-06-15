<template>
  <div class="flip-card">
    <div class="flip-card-inner">
      <div class="flip-card-front">
        <img
          :src="card.imageUrl"
          :alt="card.name"
        />
      </div>
      <div class="flip-card-back">
        <div class="card-description">
          <p>
            <strong>{{ card.name }}</strong>
          </p>
          <p>{{ card.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Card } from '../types/Cards';
  defineOptions({
    name: 'FlipCard',
  });

  export interface CardProps {
    card: Card;
  }

  defineProps<CardProps>();
</script>

<style scoped>
  .flip-card {
    background-color: transparent;
    width: 225px;
    height: 300px;
    perspective: 1000px;
  }

  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
  }

  .flip-card:hover .flip-card-inner {
    transform: rotateY(180deg);
  }

  .flip-card-front,
  .flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }

  .flip-card-front {
    color: black;
  }

  .flip-card-back {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(226, 226, 215);
    color: black;
    transform: rotateY(180deg);
    border: 10px solid #000;
  }
</style>
