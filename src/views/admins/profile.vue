<template>
  <div class="container mx-auto p-6">
    <div class="bg-white shadow-lg rounded-lg p-8 dark:bg-gray-900">
      <div class="flex flex-col items-center">
        <img
          :src="adminStore?.profile?.photo || 'https://shorturl.at/CSQ2j'"
          alt="Profile Photo"
          class="w-32 h-32 rounded-full object-cover border-4 border-gray-200 dark:border-gray-700"
        />
        <h1 class="text-3xl font-bold mt-4 text-gray-900 dark:text-gray-100">
          {{ adminStore.profile.login }}
        </h1>
        <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
          {{ adminStore.profile.tg_link }}
        </p>
        <p
          class="mt-2 px-4 py-1 text-sm font-medium rounded-full"
          :class="{
            'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100':
              adminStore.profile.is_creator,
            'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200':
              !adminStore.profile.is_creator,
          }"
        >
          {{ adminStore.profile.is_creator ? "Creator" : "Regular User" }}
        </p>
        <button
          @click="openModal"
          class="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500"
        >
          Edit Profile
        </button>
      </div>
      <div class="mt-6">
        <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg space-y-2">
          <div class="flex justify-between text-gray-800 dark:text-gray-200">
            <span class="font-semibold">Created At:</span>
            <span>{{
              new Date(adminStore.profile.createdAt).toLocaleDateString()
            }}</span>
          </div>
          <div class="flex justify-between text-gray-800 dark:text-gray-200">
            <span class="font-semibold">Updated At:</span>
            <span>{{
              new Date(adminStore.profile.updatedAt).toLocaleDateString()
            }}</span>
          </div>
          <div class="flex justify-between text-gray-800 dark:text-gray-200">
            <span class="font-semibold">Status:</span>
            <span
              :class="
                adminStore.profile.is_active ? 'text-green-600' : 'text-red-600'
              "
            >
              {{ adminStore.profile.is_active ? "Active" : "Inactive" }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Profile Modal -->
    <EditProfileModal :isOpen="isModalOpen" :onClose="closeModal" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAdminStore } from "@/stores/adminStore";
import EditProfileModal from "@/components/EditAdmin.vue";

const adminStore = useAdminStore();
const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

onMounted(() => {
  const id = localStorage.getItem("id");
  adminStore.getAdminById(id);
});
</script>
