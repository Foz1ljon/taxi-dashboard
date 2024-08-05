<template>
  <div
    class="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-4 h-[400px]"
  >
    <div class="flex justify-between items-start mb-4">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Order #{{ order.id }}
      </h2>
      <button
        @click="handleDelete"
        class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
        title="Delete"
      >
        🗑️
      </button>
    </div>

    <div class="space-y-4 text-sm">
      <div class="text-gray-700 dark:text-gray-300">
        <p>{{ order.description || "No description" }}</p>
        <p>{{ formatDate(order.date) }}</p>
        <p>{{ order.fromDistrict?.name }} → {{ order.toDistrict?.name }}</p>
        <p>
          {{ order.price }} UZS | {{ order.distance }} | {{ order.duration }}
        </p>
      </div>

      <div class="flex items-center justify-between">
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

      <DriverCard :driver="order.driver" />

      <div class="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
        <h3 class="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Client
        </h3>
        <p class="text-gray-700 dark:text-gray-300">
          {{ order.client?.name || "N/A" }} | {{ order.client?.phone || "N/A" }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import DriverCard from "@/components/DriverCard.vue";
import { usetaxiOrderStore } from "../stores/taxiorderStore";

const props = defineProps({
  order: {
    type: Object,
    required: true,
  },
});

const handleDelete = () => {
  usetaxiOrderStore().deletetaxiOrder(props.order.id);
};

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
</script>
