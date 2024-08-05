<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
      <h1 class="text-2xl font-semibold mb-6 text-center">Sign In</h1>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label for="login" class="block text-gray-700 font-medium mb-2">
            Foydalanuvchi nomi
          </label>
          <input
            type="text"
            id="login"
            v-model="data.login"
            :class="{ 'border-red-500': errors.login }"
            class="w-full p-3 outline-none border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
          />
          <p v-if="errors.login" class="text-red-500 text-sm mt-1">
            {{ errors.login }}
          </p>
        </div>

        <div class="mb-6">
          <label for="password" class="block text-gray-700 font-medium mb-2">
            Parol
          </label>
          <input
            :type="showPassword ? 'text' : 'password'"
            id="password"
            v-model="data.password"
            :class="{ 'border-red-500': errors.password }"
            class="w-full p-3 outline-none border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
          />
          <p v-if="errors.password" class="text-red-500 text-sm mt-1">
            {{ errors.password }}
          </p>
          <div class="mt-2">
            <input type="checkbox" id="show-password" v-model="showPassword" />
            <label for="show-password" class="text-gray-700 ml-2">
              Parolni ko'rsatish
            </label>
          </div>
        </div>

        <div class="relative">
          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-slate-500 text-white p-3 rounded-md hover:bg-slate-600 transition duration-200 relative flex items-center justify-center"
          >
            <p v-if="!loading">Kirish</p>
            <div v-if="loading" class="loader"></div>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { useAdminStore } from "@/stores/adminStore";

const adminStore = useAdminStore();

const data = ref({
  login: "login22",
  password: "login",
});

const showPassword = ref(false);
const errors = reactive({
  login: "",
  password: "",
});
const loading = computed(() => adminStore.loading);

const validate = () => {
  errors.login = data.value.login.trim().length < 5 ? "Username qisqa!" : "";
  errors.password = data.value.password.trim().length < 5 ? "Parol qisqa!" : "";
  return !errors.login && !errors.password;
};

const handleLogin = () => {
  if (!validate()) return;
  adminStore.login(data.value);
};
</script>

<style>
.loader {
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 4px solid #fff;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

button:disabled {
  cursor: not-allowed;
}
</style>
