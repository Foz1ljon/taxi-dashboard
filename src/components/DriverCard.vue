<template>
  <div
    class="bg-gray-50 dark:bg-gray-700 p-2 rounded-lg border border-gray-200 dark:border-gray-600"
  >
    <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
      Driver
    </h3>
    <div class="flex sm:flex-row flex-col items-center gap-2">
      <img
        v-if="driver.photo"
        class="w-12 h-12 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
        :src="driver.photo"
        alt="Driver Photo"
      />
      <div>
        <p><strong>Name:</strong> {{ driver?.name }}</p>
        <p><strong>Phone:</strong> {{ driver?.phone || "N/A" }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  driver: {
    type: Object,
    required: true,
  },
});
</script>
