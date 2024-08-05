<template>
  <div
    class="relative bg-white shadow-sm rounded-lg p-4 mb-6 dark:bg-gray-800 dark:shadow-gray-700 border border-gray-200 dark:border-gray-600 w-full max-w-sm mx-auto"
  >
    <!-- Actions -->
    <div class="absolute top-3 right-3">
      <button
        @click="handleDelete"
        class="text-red-700 block px-3 py-2 text-xl"
        title="Delete"
      >
        <span class="text-xl">🗑️</span>
      </button>
    </div>

    <div class="grid grid-cols-1 gap-6">
      <!-- Order Details -->
      <div class="space-y-4">
        <h2
          class="text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100"
        >
          Order ID: {{ order.id }}
        </h2>
        <div class="text-gray-700 dark:text-gray-300 text-sm md:text-base">
          <p><strong>About:</strong> {{ order.description || "N/A" }}</p>
          <p><strong>Date:</strong> {{ formatDate(order.date) || "N/A" }}</p>
          <p>
            <strong>Location Start:</strong> {{ order.location_start || "N/A" }}
          </p>
          <p><strong>From:</strong> {{ order.fromDistrict?.name || "N/A" }}</p>
          <p><strong>To:</strong> {{ order.toDistrict?.name || "N/A" }}</p>
          <p><strong>Price:</strong> {{ order.price || "N/A" }} UZS</p>
          <p><strong>Distance:</strong> {{ order.distance || "N/A" }}</p>
          <p><strong>Duration:</strong> {{ order.duration || "N/A" }}</p>
          <p class="flex items-center gap-2">
            <strong>Status:</strong>
            <span
              :class="{
                'bg-green-100 text-green-800': order.status === 'Completed',
                'bg-yellow-100 text-yellow-800': order.status === 'In Progress',
                'bg-red-100 text-red-800': order.status === 'Cancelled',
              }"
              class="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full"
            >
              {{ order.status || "N/A" }}
            </span>
          </p>
        </div>
      </div>

      <!-- Driver Details -->
      <DriverCard :driver="order.driver" class="w-full" />

      <!-- Client Details -->
      <div
        class="bg-gray-50 dark:bg-gray-700 p-2 rounded-lg border border-gray-200 dark:border-gray-600"
      >
        <h3
          class="text-md md:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2"
        >
          Client
        </h3>
        <div class="space-y-1 text-sm md:text-base">
          <p><strong>Name:</strong> {{ order.client?.name || "N/A" }}</p>
          <p><strong>Phone:</strong> {{ order.client?.phone || "N/A" }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import DriverCard from "@/components/DriverCard.vue";
import { usetaxiOrderStore } from "../stores/taxiorderStore";

const props = defineProps({
  order: {
    type: Object,
    required: true,
  },
});

const dropdownOpen = ref(false);

const handleDelete = () => {
  console.log(`Delete order with id: ${props.order.id}`);
  usetaxiOrderStore().deletetaxiOrder(props.order.id);
};

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
</script>
