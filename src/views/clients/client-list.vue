<template>
  <div class="p-4 bg-gray-100 dark:bg-gray-900">
    <h1 class="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
      Client List
    </h1>

    <!-- Loader -->
    <div
      v-if="clientStore.loading"
      class="flex justify-center items-center h-64"
    >
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"
      ></div>
    </div>

    <!-- Client List -->
    <div
      v-else-if="clientStore.clients.length > 0"
      class="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow"
    >
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th
              v-for="header in ['Name', 'Phone', 'Status', '']"
              :key="header"
              class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            >
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody
          class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700"
        >
          <tr
            v-for="client in clientStore.clients"
            :key="client.id"
            class="hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <td class="px-4 py-3 whitespace-nowrap">
              <div class="text-sm font-medium text-gray-900 dark:text-gray-300">
                {{ client.name || "-" }}
              </div>
              <div class="text-sm text-gray-500 dark:text-gray-400">
                ID: {{ client.id }}
              </div>
            </td>
            <td class="px-4 py-3 whitespace-nowrap">
              <div class="text-sm text-gray-900 dark:text-gray-300">
                {{ client.phone || "-" }}
              </div>
              <div class="text-sm text-gray-500 dark:text-gray-400">
                {{ client.gender || "Not specified" }}
              </div>
            </td>
            <td class="px-4 py-3 whitespace-nowrap">
              <span
                :class="{
                  'bg-green-100 text-green-800 dark:bg-green-200 dark:text-green-900':
                    client.is_active,
                  'bg-red-100 text-red-800 dark:bg-red-200 dark:text-red-900':
                    !client.is_active,
                }"
                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
              >
                {{ client.is_active ? "Active" : "Inactive" }}
              </span>
            </td>
            <td
              class="px-4 py-3 whitespace-nowrap text-right text-sm font-medium"
            >
              <button
                @click="deleteClient(client.id)"
                class="text-red-600 hover:text-red-900 dark:hover:text-red-400 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- No Clients Message -->
    <p v-else class="mt-4 text-center text-gray-600 dark:text-gray-400">
      No clients found.
    </p>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useClientStore } from "@/stores/clientStore";

const clientStore = useClientStore();
const { fetchClients, deleteClient } = clientStore;

onMounted(() => {
  fetchClients();
});
</script>
