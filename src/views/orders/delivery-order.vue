<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
      Delivery Orders
    </h1>

    <!-- Loading State -->
    <div
      v-if="deliveryOrderStore.loading"
      class="flex justify-center items-center h-32"
    >
      <div class="animate-pulse flex space-x-4">
        <div class="rounded-full bg-gray-300 dark:bg-gray-600 h-12 w-12"></div>
        <div class="flex-1 space-y-4 py-1">
          <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
          <div class="space-y-2">
            <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- No Orders State -->
    <div
      v-else-if="deliveryOrderStore.deliveryOrders.length === 0"
      class="text-center py-12 text-gray-600 dark:text-gray-400"
    >
      No delivery orders found.
    </div>

    <!-- Orders Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="order in deliveryOrderStore.deliveryOrders"
        :key="order.id"
        class="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden transition-all hover:shadow-md"
      >
        <div class="p-4">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">
              Order #{{ order.id }}
            </h2>
            <span
              class="px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full"
            >
              {{ order.status || "Pending..." }}
            </span>
          </div>

          <div class="space-y-2 text-sm">
            <p class="text-gray-600 dark:text-gray-400">
              <span class="font-medium">From:</span> {{ order.districts.name }}
            </p>
            <p class="text-gray-600 dark:text-gray-400">
              <span class="font-medium">To:</span> District
              {{ order.to_district_id }}
            </p>
            <p class="text-gray-600 dark:text-gray-400">
              <span class="font-medium">Date:</span>
              {{ formatDate(order.date) }}
            </p>
            <p class="text-gray-600 dark:text-gray-400">
              <span class="font-medium">Client:</span> {{ order.clients.name }}
            </p>
            <p class="text-gray-600 dark:text-gray-400">
              <span class="font-medium">Load:</span> {{ order.load_name }}
            </p>
          </div>

          <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div class="flex items-center">
              <img
                v-if="order.drivers.photo"
                :src="order.drivers.photo"
                alt="Driver Photo"
                class="w-10 h-10 rounded-full object-cover mr-3"
              />
              <div class="text-sm">
                <p class="text-gray-800 dark:text-gray-200 font-medium">
                  {{ order.drivers.name }} {{ order.drivers.surname }}
                </p>
                <p class="text-gray-600 dark:text-gray-400">
                  {{ order.drivers.phone }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="px-4 py-3 bg-gray-50 dark:bg-gray-700 text-right">
          <button
            @click="deleteOrder(order.id)"
            class="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition duration-300"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { usedeliveryOrderStore } from "@/stores/deliveryOrder";

const deliveryOrderStore = usedeliveryOrderStore();

onMounted(() => {
  deliveryOrderStore.fetchdeliveryOrders();
});

const deleteOrder = async (id) => {
  await deliveryOrderStore.deletedeliveryOrder(id);
};

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
</script>
