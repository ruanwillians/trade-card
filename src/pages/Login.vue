<template>
  <q-page
    class="row items-center justify-center q-mx-xl"
  >
    <div class="col-12">
      <div
        class="q-pa-md"
        style="max-width: 700px"
      >
        <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md"
        >
          <h1 class="text-info text-bold title">
            Login
          </h1>
          <q-input
            filled
            dark
            color="secondary"
            v-model="email"
            label="Digite seu email *"
            lazy-rules
            :rules="[
              val =>
                (val && val.length > 0) ||
                'O campo email é obrigatório',
              val =>
                (val && validateEmail(val)) ||
                'Formato de email inválido',
            ]"
          />

          <q-input
            dark
            v-model="password"
            filled
            color="secondary"
            label="Digite sua senha *"
            :type="
              visiblePassword
                ? 'text'
                : 'password'
            "
            :rules="[
              val =>
                (val && val.length > 0) ||
                'O campo senha é obrigatório',
            ]"
          >
            <template v-slot:append>
              <q-icon
                :name="
                  visiblePassword
                    ? 'visibility_off'
                    : 'visibility'
                "
                class="cursor-pointer"
                @click="changeVisiblePassword"
              />
            </template>
          </q-input>
          <router-link
            to="/sigin"
            class="custom-link text-secondary"
          >
            Não possui conta? Cadatre-se
          </router-link>
          <div class="q-mx-sm">
            <q-btn
              :loading="loading"
              rounded
              type="submit"
              class="full-width btn rounded glossy"
              color="info q-pa-md"
              label="Fazer Login"
            />
          </div>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { validateEmail } from '../utils/validate';
  import { loginUser } from '../services/LoginSignin';
  import { LoginBody } from '../types/loginSignIn';
  import { useUserStore } from '../stores/userStore';
  import {
    showNegativeNotify,
    showPositiveNotify,
  } from 'src/utils/plugins';
  import { useRouter } from 'vue-router';

  defineOptions({
    name: 'HomePage',
  });

  const email = ref<string>('');
  const password = ref<string>('');
  const visiblePassword = ref<boolean>(false);
  const loading = ref<boolean>(false);
  const userStore = useUserStore();

  const router = useRouter();

  const onReset = () => {
    email.value = '';
    password.value = '';
  };

  const changeVisiblePassword = (): void => {
    visiblePassword.value =
      !visiblePassword.value;
  };

  const onSubmit = async () => {
    try {
      loading.value = true;
      const body = generateBody();

      const response = await loginUser(body);

      if (response.status !== 200) {
        throw new Error();
      }

      const user = response.data.user;
      localStorage.setItem(
        'Token',
        response.data.token,
      );
      userStore.setUser(user);
      showPositiveNotify(
        `Seja bem vindo ${user.name}`,
      );
      router.push('/cards');
    } catch (error) {
      showNegativeNotify(
        'Não foi possível realizar o login, tente novamente mais tarde',
      );
    } finally {
      loading.value = false;
    }
  };

  const generateBody = (): LoginBody => {
    return {
      email: email.value,
      password: password.value,
    };
  };
</script>

<style>
  .btn {
    font-size: 1.5em;
    margin-top: 1em;
  }
</style>
