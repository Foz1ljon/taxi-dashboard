<template>
  <div class="p-4 px-2 bg-gray-100 dark:bg-gray-900">
    <h1 class="text-4xl font-bold mb-12 text-gray-900 dark:text-gray-100">
      Taxi Order List
    </h1>

    <!-- Loader -->
    <div
      v-if="store.loading"
      class="flex justify-center items-center min-h-screen"
    >
      <svg
        class="animate-spin h-16 w-16 text-blue-600"
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

    <!-- Taxi Orders -->
    <div v-else class="grid xl:grid-cols-3 md:grid-cols-2 gap-5">
      <OrderCard
        v-for="item in store.taxiOrders"
        :key="item.id"
        :order="item"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { usetaxiOrderStore } from "@/stores/taxiorderStore";
import OrderCard from "@/components/OrderCard.vue"; // Import the OrderCard component

const store = usetaxiOrderStore();

onMounted(() => {
  store.fetchtaxiOrders();
});
</script>

<style scoped>
/* Additional custom styles for modern look and feel */
</style>
