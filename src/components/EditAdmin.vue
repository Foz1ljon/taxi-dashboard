<template>
  <transition name="fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center"
    >
      <div
        class="bg-white dark:bg-gray-900 rounded-lg shadow-lg max-w-sm w-full p-6"
      >
        <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Edit Profile
        </h2>
        <form @submit.prevent="handleSubmit(formData.id)">
          <div class="mb-4">
            <label for="login" class="block text-gray-700 dark:text-gray-300"
              >Login</label
            >
            <input
              v-model="formData.login"
              id="login"
              type="text"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
            />
          </div>
          <div class="mb-4">
            <label for="tg_link" class="block text-gray-700 dark:text-gray-300"
              >Telegram Link</label
            >
            <input
              v-model="formData.tg_link"
              id="tg_link"
              type="text"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
            />
          </div>
          <div class="mb-4">
            <label for="status" class="block text-gray-700 dark:text-gray-300"
              >Status</label
            >
            <select
              v-model="formData.is_active"
              id="status"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
            >
              <option :value="true">Active</option>
              <option :value="false">Inactive</option>
            </select>
          </div>
          <div class="flex justify-end">
            <button
              type="button"
              @click="handleClose"
              class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="ml-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch } from "vue";
import { useAdminStore } from "@/stores/adminStore";

const props = defineProps({
  isOpen: Boolean,
  onClose: Function,
});

const adminStore = useAdminStore();

const formData = ref({
  login: adminStore.profile.login || "",
  tg_link: adminStore.profile.tg_link || "",
  is_active: adminStore.profile.is_active || false,
});

watch(
  () => adminStore.profile,
  (newProfile) => {
    formData.value = {
      login: newProfile.login || "",
      tg_link: newProfile.tg_link || "",
      is_active: newProfile.is_active || false,
    };
  }
);

const handleSubmit = (id) => {
  adminStore.updateAdmin(adminStore.profile.id, {
    login: formData.value.login,
    tg_link: formData.value.tg_link,
    is_active: formData.value.is_active,
  });
  handleClose();
};

const handleClose = () => {
  if (props.onClose) {
    props.onClose();
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
