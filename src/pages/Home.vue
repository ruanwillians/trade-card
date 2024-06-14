<template>
  <q-page class="row items-center justify-start">
    <div class="col-lg-4 col-md-12 q-mx-xl">
      <h1 class="text-info text-bold title">
        O Maior mercado de trade de Cards!
      </h1>
      <h5 class="text-white subtitle">
        Conquiste seus cards, conheça outros
        players e faça trocas para fortalecer o
        seu deck.
      </h5>
      <q-btn
        rounded
        class="full-width btn rounded glossy"
        color="info q-pa-lg"
        label="Ver negociações"
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
  defineOptions({
    name: 'HomePage',
  });
</script>

<style scoped>
  .title {
    font-size: 5rem;
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
  }
</style>
