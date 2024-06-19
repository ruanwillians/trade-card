<template>
  <q-item
    clickable
    tag="a"
    :class="{ active: isActive }"
    @click="goTo(to)"
    class="q-my-xs q-py-lg"
  >
    <q-item-section v-if="icon" avatar>
      <q-icon
        :name="icon"
        color="white"
        size="1.5rem"
      />
    </q-item-section>

    <q-item-section>
      <q-item-label
        class="text-bold text-white menu-item"
      >
        {{ title }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
  import { EssentialLinkProps } from 'src/types/Links';
  import { computed } from 'vue';
  import {
    useRouter,
    useRoute,
  } from 'vue-router';

  defineOptions({
    name: 'EssentialLink',
  });

  const props = defineProps<EssentialLinkProps>();

  const router = useRouter();
  const route = useRoute();

  const goTo = (to: string) => {
    router.push(to);
  };

  const isActive = computed(
    () => route.path === props.to,
  );
</script>

<style scoped>
  .active {
    background-color: var(--q-info);
    color: white;
  }

  .menu-item {
    font-size: 17px;
  }
</style>
