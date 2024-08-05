<template>
  <div class="p-6 bg-white dark:bg-gray-900">
    <div class="overflow-x-auto h-screen">
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Admin List
        </h1>
        <button
          @click="openCreateModal"
          class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500"
        >
          Create Admin
        </button>
      </div>
      <table
        class="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-lg dark:bg-gray-800 dark:divide-gray-700"
      >
        <thead class="bg-gray-50 dark:bg-gray-900">
          <tr>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300"
            >
              Login
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300"
            >
              Email
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300"
            >
              Status
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300"
            >
              Create Date
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody
          class="bg-white divide-y divide-gray-200 dark:bg-gray-700 dark:divide-gray-600"
        >
          <tr v-for="(admin, index) in adminStore.admins" :key="admin.id">
            <td
              class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100"
            >
              {{ admin.login }}
            </td>
            <td
              class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"
            >
              {{ admin.tg_link }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
              <p
                :class="{
                  'text-green-500': admin.is_active,
                  'text-red-500': !admin.is_active,
                }"
                class="px-1 py-1 rounded"
              >
                {{ admin.is_active ? "Active" : "Inactive" }}
              </p>
            </td>
            <td
              class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"
            >
              {{ formatDate(admin.createdAt) }}
            </td>
            <td
              class="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-2"
            >
              <button
                @click="openEditModal(admin)"
                class="text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-400"
              >
                <i class="fi fi-sr-edit"></i>
                <!-- Edit icon -->
              </button>
              <button
                @click="deleteAdmin(admin.id)"
                class="text-red-500 hover:text-red-700 dark:text-red-300 dark:hover:text-red-400"
              >
                <i class="fi fi-sr-trash"></i>
                <!-- Delete icon -->
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <EditProfileModal
      :id="selectedAdminId"
      :isOpen="isEditModalOpen"
      :onClose="closeEditModal"
    />

    <CreateAdminModal :visible="isCreateModalOpen" @close="closeCreateModal" />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useAdminStore } from "@/stores/adminStore";
import EditProfileModal from "@/components/EditAdmin.vue";
import CreateAdminModal from "@/components/createAdmin.vue";

const adminStore = useAdminStore();

onMounted(() => {
  adminStore.fetchAdmins();
});

const isEditModalOpen = ref(false);
const isCreateModalOpen = ref(false);
const selectedAdminId = ref(null);

const openEditModal = (admin) => {
  selectedAdminId.value = admin.id;
  isEditModalOpen.value = true;
};

const closeEditModal = () => {
  isEditModalOpen.value = false;
  selectedAdminId.value = null;
};

const openCreateModal = () => {
  isCreateModalOpen.value = true;
};

const closeCreateModal = () => {
  isCreateModalOpen.value = false;
};

const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const deleteAdmin = (adminId) => {
  adminStore.deleteAdmin(adminId);
};
</script>
