<template>
  <q-page>
    <q-tabs
      v-model="currentTab"
      breakpoint="600"
      indicator-color="info"
      class="text-white"
    >
      <q-tab
        v-for="tab in tabs"
        :key="tab.name"
        :name="tab.name"
        :icon="tab.icon"
        :label="tab.label"
        class="q-pa-md"
      />
    </q-tabs>
    <q-tab-panels
      v-model="currentTab"
      animated
      class="bg-transparent"
    >
      <q-tab-panel name="offering">
        <q-table
          class="table text-white"
          :rows="userCards"
          :columns="columns"
          row-key="name"
          selection="multiple"
          v-model:selected="offeringSelected"
          :rows-per-page-options="[12]"
          :filter="filter"
          grid
          hide-header
        >
          <template v-slot:top-left>
            <h1
              class="text-white q-ma-sm rounded-borders title text-bold"
            >
              Minhas cartas
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
                <q-checkbox
                  dense
                  dark
                  color="info"
                  v-model="props.selected"
                  class="q-mb-md"
                  size="lg"
                />
              </CardTrade>
            </div>
          </template>
        </q-table>
      </q-tab-panel>
      <q-tab-panel name="receiving">
        <q-table
          class="table text-white"
          :rows="allCards"
          :columns="columns"
          row-key="name"
          selection="multiple"
          v-model:selected="receivingSelected"
          :rows-per-page-options="[12]"
          :filter="filter"
          grid
          hide-header
        >
          <template v-slot:top-left>
            <h1
              class="text-white q-ma-sm rounded-borders title text-bold"
            >
              Todas cartas
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
                <q-checkbox
                  dense
                  dark
                  color="info"
                  v-model="props.selected"
                  class="q-mb-md"
                  size="lg"
                />
              </CardTrade>
            </div>
          </template>
        </q-table>
      </q-tab-panel>
      <q-tab-panel
        name="confirmTrade"
        class="row justify-center q-col-gutter-md"
      >
        <div
          class="col-xs-12 col-sm-12 col-md-12 col-lg-5"
        >
          <DeckTrade
            :cards="offeringSelected"
            title="Oferecer"
            color="bg-secondary"
          />
          <h6
            v-if="offeringSelected.length === 0"
            class="text-bold text-white text-center q-ma-xl"
          >
            Você ainda não selecionou nenhuma
            carta que deseja oferecer, selecione e
            confirme a negociação.
          </h6>
        </div>
        <div
          class="col-lg-2 flex items-center justify-center gt-md"
        >
          <div class="row justify-center">
            <q-icon
              class="q-mt-md"
              name="published_with_changes"
              size="10rem"
              color="white"
            ></q-icon>
            <q-btn
              v-if="
                receivingSelected.length > 0 &&
                offeringSelected.length > 0
              "
              size="md"
              class="q-pa-md q-mt-md q-px-lg gt-md"
              label="Confirmar negociação"
              color="primary"
              @click="confirm"
            />
          </div>
        </div>

        <div
          class="col-xs-12 col-sm-12 col-md-12 col-lg-5"
        >
          <DeckTrade
            :cards="receivingSelected"
            title="Quer receber"
            color="bg-info"
          />
          <h6
            v-if="receivingSelected.length === 0"
            class="text-bold text-white text-center q-ma-xl"
          >
            Você ainda não selecionou nenhuma
            carta que deseja receber, selecione e
            confirme a negociação.
          </h6>
        </div>

        <div class="col-12 q-ma-xl">
          <div class="row justify-center">
            <q-btn
              v-if="
                receivingSelected.length > 0 &&
                offeringSelected.length > 0
              "
              size="lg"
              class="q-pa-md q-px-lg lt-lg"
              label="Confirmar negociação"
              color="primary"
              @click="confirm"
            />
          </div>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup lang="ts">
  import { Card } from 'src/types/Cards';
  import {
    AddTrades,
    TypeTrade,
  } from 'src/types/Trades';
  import {
    getCards,
    getMeCards,
  } from '../services/Cards';
  import {
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
  import { Column, Tabs } from 'src/types/Table';
  import CardTrade from '../components/CardTrade.vue';
  import DeckTrade from '../components/DeckTrade.vue';
  import { createTrade } from 'src/services/Trades';
  import { useRouter } from 'vue-router';

  defineOptions({
    name: 'DeckPage',
  });

  const router = useRouter();

  const currentTab = ref<string>('offering');
  const page = ref<number>(1);
  const filter = ref<string>('');
  const receivingSelected = ref<Card[]>([]);
  const offeringSelected = ref<Card[]>([]);
  const allCards = reactive<Card[]>([]);
  const userCards = reactive<Card[]>([]);

  const tabs: Tabs[] = [
    {
      name: 'offering',
      icon: 'dashboard',
      label:
        'Selecione as cartas que deseja oferecer',
    },
    {
      name: 'receiving',
      icon: 'dashboard_customize',
      label:
        'Selecione as cartas que deseja receber',
    },
    {
      name: 'confirmTrade',
      icon: 'published_with_changes',
      label: 'Confirmar negociação',
    },
  ];

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

  onBeforeMount(async () => {
    await Promise.all([
      getAllCards(),
      getCardsUser(),
    ]);
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

  const getCardsUser = async () => {
    showLoading(
      'Aguarde carregando cartas do deck',
    );
    try {
      const { data, status } = await getMeCards();
      if (status === 200) {
        userCards.length = 0;
        data.cards.forEach((card: Card) => {
          if (card.imageUrl) {
            userCards.push(card);
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

  const generateBody = () => {
    const body: AddTrades = {
      cards: [
        ...offeringSelected.value.map(card => ({
          cardId: card.id,
          type: 'OFFERING' as TypeTrade,
        })),
        ...receivingSelected.value.map(card => ({
          cardId: card.id,
          type: 'RECEIVING' as TypeTrade,
        })),
      ],
    };
    return body;
  };

  const confirm = async () => {
    try {
      showLoading('Aguarde, criando negociação');
      const body = generateBody();

      const { status } = await createTrade(body);

      if (status === 201) {
        showPositiveNotify(
          'Negociação criada com sucesso',
        );
        router.push('/trade');
      }
    } catch (error) {
      showNegativeNotify(
        'Não foi possível criar a negociação, tente novamente',
      );
    } finally {
      hideLoading();
    }
  };
</script>
