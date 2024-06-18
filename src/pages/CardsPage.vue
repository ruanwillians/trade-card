<template>
  <q-page class="row justify-evenly">
    <q-table
      class="table text-white"
      :rows="allCards"
      :columns="columns"
      row-key="name"
      selection="multiple"
      :rows-per-page-options="[12]"
      :filter="filter"
      grid
      hide-header
    >
      <template v-slot:top-left>
        <h1
          class="text-white q-ma-sm rounded-borders title text-bold"
        >
          Todas as cartas
        </h1>
      </template>
      <template v-slot:top-right>
        <q-input
          dark
          filled
          class="filter"
          debounce="300"
          v-model="filter"
          placeholder="Busque pelas cartas"
          color="info"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:item="props">
        <div
          class="q-px-md col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
        >
          <CardTrade :card="props.row">
            <q-btn
              rounded
              style="width: 90%"
              class="glossy q-mb-md"
              color="info"
              label="Adicionar ao deck"
              @click="confirm(props.row)"
            />
          </CardTrade>
        </div>
      </template>
    </q-table>
  </q-page>
</template>

<script setup lang="ts">
  import { Card } from 'src/types/Cards';
  import {
    addMeCards,
    getCards,
  } from '../services/Cards';
  import {
    inject,
    onBeforeMount,
    reactive,
    ref,
  } from 'vue';
  import {
    hideLoading,
    showLoading,
    showNegativeNotify,
    showPositiveNotify,
  } from 'src/utils/plugins';
  import { Column } from 'src/types/Table';
  import { AddCards } from 'src/types/Cards';
  import { Dialog } from 'quasar';
  import CardTrade from '../components/CardTrade.vue';

  defineOptions({
    name: 'DeckPage',
  });

  const getUserCards = inject(
    'getUserCards',
  ) as () => Promise<void>;

  const page = ref<number>(1);
  const filter = ref<string>('');

  const columns: Column[] = [
    {
      name: 'id',
      label: 'id',
      field: 'id',
      align: 'center',
    },
    {
      name: 'image',
      label: 'Imagem',
      field: 'imageUrl',
      align: 'center',
    },
    {
      name: 'name',
      label: 'Nome',
      field: 'name',
      align: 'center',
    },
  ];

  const allCards = reactive<Card[]>([]);
  onBeforeMount(async () => {
    getAllCards();
  });

  const getAllCards = async () => {
    showLoading(
      'Aguarde carregando todas as cartas',
    );
    try {
      const { data, status } = await getCards(
        page.value,
      );
      if (status === 200) {
        allCards.length = 0;
        data.list.forEach((card: Card) => {
          if (card.imageUrl) {
            allCards.push(card);
          }
        });
      }
    } catch (error) {
      showNegativeNotify(
        'Não foi possível realizar a busca dos Cards',
      );
    } finally {
      hideLoading();
    }
  };

  const confirm = (props: {
    name: string;
    imageUrl: string;
    id: string;
  }) => {
    Dialog.create({
      color: 'info',
      dark: true,
      title: 'Adicionar cartas ao seu deck',
      message: `Você deseja adicionar ${props.name} ao seu deck?`,
      cancel: {
        label: 'Não',
        flat: true,
      },
      ok: {
        label: 'Adicionar',
        color: 'info',
      },
      persistent: true,
      style: 'min-width: 25vw;',
    }).onOk(() => {
      const body = generateBody(props.id);
      addCardsToDeck(body);
    });
  };

  const generateBody = (id: string): AddCards => {
    return {
      cardIds: [id],
    };
  };

  const addCardsToDeck = async (
    body: AddCards,
  ) => {
    try {
      showLoading(
        'Adicionando carta ao seu deck',
      );

      const { status } = await addMeCards(body);

      if (status === 200) {
        showPositiveNotify(
          'Card Adicionado com sucesso ao seu deck',
        );
        getUserCards();
      }
    } catch (error) {
      showNegativeNotify(
        'Não foi possível adicionar a carta ao seu deck, tente novamente',
      );
    } finally {
      hideLoading();
    }
  };
</script>

<style scoped>
  .table {
    min-width: 80vw;
    min-height: 100vh;
  }

  .card {
    width: 80%;
    height: auto;
    margin: 3em;
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

  .filter {
    width: 30vw;
  }

  .title {
    font-size: 4rem;
    line-height: 1;
    margin-bottom: 0;
  }

  @media (max-width: 720px) {
    .subtitle-card {
      height: 12vh;
    }

    .title {
      font-size: 3rem;
      text-align: center;
    }

    .table {
      min-width: 50vw;
      min-height: 85vh;
    }
  }

  @media (max-width: 1096px) {
    .filter {
      width: 90vw;
    }

    .title {
      margin: 0.5em 0;
    }
  }
</style>
