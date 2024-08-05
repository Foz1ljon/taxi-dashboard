<template>
  <div class="p-4 bg-gray-100 dark:bg-gray-900">
    <h1 class="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
      Client List
    </h1>
    <!-- Loader -->
    <div
      v-if="clientStore.loading"
      class="flex justify-center items-center min-h-screen"
    >
      <svg
        class="animate-spin h-12 w-12 text-blue-600"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0a12 12 0 00-12 12h2z"
        ></path>
      </svg>
    </div>

    <!-- Client List -->
    <div v-else class="overflow-x-auto">
      <table
        class="min-w-full bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-600"
      >
        <thead>
          <tr class="bg-gray-200 dark:bg-gray-700">
            <th
              class="border border-gray-300 p-2 text-left text-gray-600 dark:text-gray-300"
            >
              ID
            </th>
            <th
              class="border border-gray-300 p-2 text-left text-gray-600 dark:text-gray-300"
            >
              Name
            </th>
            <th
              class="border border-gray-300 p-2 text-left text-gray-600 dark:text-gray-300"
            >
              Phone
            </th>
            <th
              class="border border-gray-300 p-2 text-left text-gray-600 dark:text-gray-300"
            >
              Gender
            </th>
            <th
              class="border border-gray-300 p-2 text-left text-gray-600 dark:text-gray-300"
            >
              Status
            </th>
            <th
              class="border border-gray-300 p-2 text-left text-gray-600 dark:text-gray-300"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="client in clientStore.clients" :key="client.id">
            <td
              class="border border-gray-300 p-2 text-gray-700 dark:text-gray-300"
            >
              {{ client.id }}
            </td>
            <td
              class="border border-gray-300 p-2 text-gray-700 dark:text-gray-300"
            >
              {{ client.name || "-" }}
            </td>
            <td
              class="border border-gray-300 p-2 text-gray-700 dark:text-gray-300"
            >
              {{ client.phone || "-" }}
            </td>
            <td class="border border-gray-300 p-2">
              <span
                :class="{
                  'text-blue-500': client.gender === 'Male',
                  'text-pink-500': client.gender === 'Female',
                  'text-gray-500': !client.gender,
                }"
              >
                {{ client.gender || "Not specified" }}
              </span>
            </td>
            <td class="border border-gray-300 p-2">
              <span
                :class="{
                  'text-green-500': client.is_active,
                  'text-red-500': !client.is_active,
                }"
              >
                {{ client.is_active ? "Active" : "Inactive" }}
              </span>
            </td>
            <td class="border border-gray-300 p-2">
              <button
                @click="deleteClient(client.id)"
                class="text-red-500 hover:text-red-700 p-2 rounded"
              >
                <i class="fi fi-rs-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <p
        v-if="clientStore.clients.length === 0"
        class="mt-4 text-center text-gray-600 dark:text-gray-400"
      >
        No clients found.
      </p>
    </div>
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
