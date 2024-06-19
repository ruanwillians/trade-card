<template>
  <q-page
    class="row items-center justify-start q-mx-xl"
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
            Sign In
          </h1>
          <q-input
            filled
            dark
            color="secondary"
            v-model="name"
            label="Digite seu nome *"
            lazy-rules
            :rules="[
              val =>
                (val && val.length > 0) ||
                'O campo nome é obrigatório',
            ]"
          />
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

          <q-input
            dark
            v-model="confirmPassword"
            filled
            color="secondary"
            label="Confirme sua senha *"
            :type="
              visiblePassword
                ? 'text'
                : 'password'
            "
            :rules="[
              val =>
                (val && val.length > 0) ||
                'O campo confirmação de senha é obrigatório',
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
            to="/login"
            class="custom-link text-secondary"
          >
            Já possui conta? Faça Login
          </router-link>

          <div class="q-mx-sm">
            <q-btn
              :loading="loading"
              rounded
              type="submit"
              class="full-width btn rounded glossy"
              color="info q-pa-md"
              label="Fazer cadastro"
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
  import { SignInUser } from '../services/LoginSignin';
  import { SignInBody } from '../types/loginSignIn';
  import {
    showNegativeNotify,
    showPositiveNotify,
  } from 'src/utils/plugins';
  import { useRouter } from 'vue-router';

  const router = useRouter();

  const loading = ref<boolean>(false);
  const name = ref<string>('');
  const email = ref<string>('');
  const password = ref<string>('');
  const confirmPassword = ref<string>('');
  const visiblePassword = ref<boolean>(false);

  const onReset = () => {
    email.value = '';
    password.value = '';
  };

  const changeVisiblePassword = (): void => {
    visiblePassword.value =
      !visiblePassword.value;
  };

  const verifyConfirmPassword = (
    password: string,
    confirmPassword: string,
  ) => {
    if (password !== confirmPassword) {
      return showNegativeNotify(
        'A senha e confirmação de senha não coincidem',
      );
    }
    return true;
  };

  const onSubmit = async () => {
    try {
      loading.value = true;
      const body = generateBody();

      if (
        verifyConfirmPassword(
          password.value,
          confirmPassword.value,
        )
      ) {
        const response = await SignInUser(body);

        if (response.status !== 201) {
          throw new Error();
        }

        showPositiveNotify(
          'Usuário Criado com sucesso',
        );
        router.push('/login');
      } else {
      }
    } catch (error) {
    } finally {
      loading.value = false;
    }
  };

  const generateBody = (): SignInBody => {
    return {
      name: name.value,
      email: email.value,
      password: password.value,
    };
  };

  defineOptions({
    name: 'HomePage',
  });
</script>

<style>
  @media (max-width: 720px) {
    .title {
      font-size: 4em;
      text-align: center;
    }
  }
</style>
