<template>
  <q-page
    class="q-pa-md"
    id="tradeMarketplacePage"
  >
    <div>
      <h1
        class="text-white q-ma-none rounded-borders title text-bold q-ml-md q-mt-md"
      >
        Negociações
      </h1>
      <div class="col justify-center">
        <TradeMaketplace
          @actionScroll="scrollToNegotiations"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
  import TradeMaketplace from 'src/components/TradeMaketplace.vue';
  import { scrollToNegotiations } from 'src/utils/Scroll';
</script>

<style scoped>
  .scroll-transition {
    transition: transform 0.3s ease-out;
  }
  .title {
    font-size: 4rem;
    line-height: 1;
    margin-bottom: 0;
  }

  .subtitle {
    font-size: 2em;
  }

  .btn {
    font-size: 1.5em;
  }

  @media (max-width: 720px) {
    .title {
      font-size: 3rem;
      line-height: 1.2;
      text-align: center;
    }

    .subtitle {
      font-size: 1.2rem;
      line-height: 1.2;
      text-align: center;
    }

    .marketplace-page {
      margin-top: 8em;
    }
  }
</style>
