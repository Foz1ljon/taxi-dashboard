<template>
  <div class="p-4 bg-gray-100 dark:bg-gray-900">
    <h1 class="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">
      Taxi Orders
    </h1>

    <!-- Loader -->
    <div v-if="store.loading" class="flex justify-center items-center h-64">
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
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>

    <!-- Taxi Orders Grid -->
    <div v-else class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <div
        v-for="order in store.taxiOrders"
        :key="order.id"
        class="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-4 flex flex-col justify-between"
      >
        <div>
          <div class="flex justify-between items-start mb-3">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
              #{{ order.id }}
            </h2>
            <button
              @click="handleDelete(order.id)"
              class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
              title="Delete"
            >
              🗑️
            </button>
          </div>

          <div class="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <p>{{ order.description || "No description" }}</p>
            <p>{{ formatDate(order.date) }}</p>
            <p>{{ order.fromDistrict?.name }} → {{ order.toDistrict?.name }}</p>
            <p>
              {{ order.price }} UZS | {{ order.distance }} |
              {{ order.duration }}
            </p>
          </div>

          <div class="mt-3">
            <span
              :class="{
                'bg-green-100 text-green-800': order.status === 'Arrived',
                'bg-yellow-100 text-yellow-800': order.status === 'In Progress',
                'bg-red-100 text-red-800': order.status === 'Cancelled',
                'bg-gray-100 text-gray-800': !order.status,
              }"
              class="px-2 py-1 rounded-full text-xs font-medium"
            >
              {{ order.status || "N/A" }}
            </span>
          </div>
        </div>

        <div class="mt-4">
          <DriverCard :driver="order.driver" />

          <div class="mt-3 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
            <h3
              class="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1"
            >
              Client
            </h3>
            <p class="text-sm text-gray-700 dark:text-gray-300">
              {{ order.client?.name || "N/A" }} |
              {{ order.client?.phone || "N/A" }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { usetaxiOrderStore } from "@/stores/taxiorderStore";
import DriverCard from "@/components/DriverCard.vue";

const store = usetaxiOrderStore();

onMounted(() => {
  store.fetchtaxiOrders();
});

const handleDelete = (id) => {
  store.deletetaxiOrder(id);
};

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
</script>
