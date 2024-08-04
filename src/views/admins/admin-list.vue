<template>
  <div class="p-6 bg-white dark:bg-gray-900">
    <div class="overflow-x-auto">
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
                class="text-white px-1 py-1 rounded dark:text-white"
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
                @click="editAdmin(admin)"
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
              <button
                @click="toggleActive(admin)"
                class="text-green-500 hover:text-green-700 dark:text-green-300 dark:hover:text-green-400"
              >
                <i class="fi fi-ss-check-circle"></i>
                <!-- Toggle icon -->
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useAdminStore } from "../../stores/adminStore";

const adminStore = useAdminStore();

onMounted(() => {
  adminStore.fetchAdmins();
});

// Utility function to format dates
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

// Method to handle admin activation/deactivation
const toggleActive = (admin) => {
  adminStore.toggleAdminStatus(admin.id);
};

// Method to handle editing an admin
const editAdmin = (admin) => {
  console.log("Edit admin:", admin);
};

// Method to handle deleting an admin
const deleteAdmin = (adminId) => {
  if (confirm("Are you sure you want to delete this admin?")) {
    adminStore.deleteAdmin(adminId);
  }
};
</script>
