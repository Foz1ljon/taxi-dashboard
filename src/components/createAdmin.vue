<template>
  <div
    v-if="visible"
    class="fixed inset-0 flex items-center justify-center z-50"
  >
    <div
      class="bg-white p-8 rounded-lg shadow-lg dark:bg-gray-900 max-w-md w-full"
    >
      <h2 class="text-2xl font-bold mb-6">Create Admin</h2>
      <form @submit.prevent="submitForm">
        <div class="mb-5">
          <label
            for="login"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >Login</label
          >
          <input
            v-model="form.login"
            id="login"
            type="text"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-200"
            required
          />
          <p v-if="errors?.login" class="text-red-500 text-sm mt-1">
            {{ errors.login || "" }}
          </p>
        </div>
        <div class="mb-5">
          <label
            for="tg_link"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >Email</label
          >
          <input
            v-model="form.tg_link"
            id="tg_link"
            type="email"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-200"
            required
          />
          <p v-if="errors?.tg_link" class="text-red-500 text-sm mt-1">
            {{ errors.tg_link || "" }}
          </p>
        </div>
        <div class="mb-5">
          <label
            for="password"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >Password</label
          >
          <div class="relative">
            <input
              v-model="form.password"
              :type="passwordVisible ? 'text' : 'password'"
              id="password"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-200"
              required
              minlength="6"
            />
            <button
              type="button"
              @click="togglePasswordVisibility"
              class="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              <i
                :class="passwordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"
                class="text-gray-500"
              ></i>
            </button>
          </div>
          <p v-if="errors?.password" class="text-red-500 text-sm mt-1">
            {{ errors.password || "" }}
          </p>
        </div>
        <div class="mb-5">
          <label
            for="confirm_password"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >Confirm Password</label
          >
          <input
            v-model="form.confirm_password"
            id="confirm_password"
            :type="confirmPasswordVisible ? 'text' : 'password'"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-200"
            required
            minlength="6"
          />
          <button
            type="button"
            @click="toggleConfirmPasswordVisibility"
            class="absolute inset-y-0 right-0 flex items-center pr-3"
          >
            <i
              :class="
                confirmPasswordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'
              "
              class="text-gray-500"
            ></i>
          </button>
          <p v-if="errors?.confirm_password" class="text-red-500 text-sm mt-1">
            {{ errors.confirm_password || "" }}
          </p>
        </div>
        <div class="flex justify-end space-x-4">
          <button
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 flex items-center"
          >
            <i class="fas fa-times mr-2"></i> Cancel
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 flex items-center"
          >
            <i class="fas fa-check mr-2"></i> Create
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAdminStore } from "../stores/adminStore";

const props = defineProps({
  visible: Boolean,
});
console.log(props.visible);

const emit = defineEmits(["close"]);

const adminsStore = useAdminStore();

const error = ref({});

const form = ref({
  login: "",
  tg_link: "",
  password: "",
  confirm_password: "",
});

const passwordVisible = ref(false);
const confirmPasswordVisible = ref(false);

const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};

const toggleConfirmPasswordVisibility = () => {
  confirmPasswordVisible.value = !confirmPasswordVisible.value;
};

const submitForm = () => {
  error.value = {}; // Reset errors

  if (form.value.password !== form.value.confirm_password) {
    return (error.value.confirm_password = "Passwords do not match!");
  }

  adminsStore.createAdmin(form.value);

  emit("close");
};
</script>

<style scoped>
/* Scoped styles for the modal */
.relative {
  position: relative;
}

button[type="button"] {
  background: none;
  border: none;
  cursor: pointer;
}
</style>
