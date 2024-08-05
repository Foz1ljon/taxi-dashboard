<template>
  <div :class="{ dark: isDarkMode }" class="transition-colors duration-300">
    <div class="max-w-4xl mx-auto p-4">
      <!-- Statistics Overview -->
      <div
        class="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-6 mb-6"
      >
        <h2
          class="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100"
        >
          Statistics Overview
        </h2>
        <div
          class="flex justify-between py-2 border-b border-gray-300 dark:border-gray-700 last:border-b-0"
        >
          <p class="font-medium text-gray-900 dark:text-gray-100">Drivers:</p>
          <p class="text-lg text-gray-800 dark:text-gray-200">
            {{ driver.drivers.length }}
          </p>
        </div>
        <div
          class="flex justify-between py-2 border-b border-gray-300 dark:border-gray-700 last:border-b-0"
        >
          <p class="font-medium text-gray-900 dark:text-gray-100">
            Taxi Orders:
          </p>
          <p class="text-lg text-gray-800 dark:text-gray-200">
            {{ taxiOrder.taxiOrders.length }}
          </p>
        </div>
        <div
          class="flex justify-between py-2 border-b border-gray-300 dark:border-gray-700 last:border-b-0"
        >
          <p class="font-medium text-gray-900 dark:text-gray-100">Admins:</p>
          <p class="text-lg text-gray-800 dark:text-gray-200">
            {{ admin.admins.length }}
          </p>
        </div>
        <div class="flex justify-between py-2">
          <p class="font-medium text-gray-900 dark:text-gray-100">Clients:</p>
          <p class="text-lg text-gray-800 dark:text-gray-200">
            {{ client.clients.length }}
          </p>
        </div>
      </div>

      <!-- Static Diagram -->
      <div class="text-center">
        <svg
          class="mx-auto mb-4 w-full h-32"
          viewBox="0 0 400 150"
          xmlns="http://www.w3.org/2000/svg"
        >
          <!-- Static Bar for Drivers -->
          <rect
            x="10"
            y="10"
            width="80"
            height="120"
            fill="#4CAF50"
            class="transition-all duration-500 ease-in-out"
          />
          <!-- Static Bar for Taxi Orders -->
          <rect
            x="110"
            y="30"
            width="80"
            height="100"
            fill="#FFC107"
            class="transition-all duration-500 ease-in-out"
          />
          <!-- Static Bar for Admins -->
          <rect
            x="210"
            y="50"
            width="80"
            height="80"
            fill="#2196F3"
            class="transition-all duration-500 ease-in-out"
          />
          <!-- Static Bar for Clients -->
          <rect
            x="310"
            y="70"
            width="80"
            height="60"
            fill="#F44336"
            class="transition-all duration-500 ease-in-out"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useAdminStore } from "../stores/adminStore";
import { useClientStore } from "../stores/clientStore";
import { useDriverStore } from "../stores/driverStore";
import { usetaxiOrderStore } from "../stores/taxiorderStore";

const driver = useDriverStore();
const taxiOrder = usetaxiOrderStore();
const admin = useAdminStore();
const client = useClientStore();

onMounted(() => {
  driver.fetchDrivers();
  taxiOrder.fetchtaxiOrders();
  admin.fetchAdmins();
  client.fetchClients();
});
</script>

<style scoped>
/* Optional additional styles */
</style>
