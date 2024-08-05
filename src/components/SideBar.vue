<template>
  <div
    :class="{
      'xl:w-[5%] md:w-[8%] sm:w-[10%]': store.isOpen,
      'md:w-[15%] sm:w-[20%]': !store.isOpen,
      'bg-gray-300 dark:bg-gray-800': true,
      'text-black dark:text-white': true,
    }"
    class="fixed sm:h-screen h-12 bottom-0 w-full duration-300 border-r flex pl-3 items-start p-1 z-40 shadow"
  >
    <div
      :class="
        store.isOpen
          ? 'xl:left-[6%] md:left-[9%] sm:left-[11%]'
          : 'sm:left-[16%]'
      "
      class="flex fixed justify-end py-3 duration-300"
    >
      <button class="sm:block hidden" @click="store.open">
        <i class="fi fi-br-menu-burger"></i>
      </button>
    </div>
    <div
      class="flex sm:flex-col sm:justify-normal w-full justify-between sm:gap-5 sm:px-1 px-4 sm:py-10"
    >
      <router-link
        class="flex items-center gap-1 text-xl rounded py-1 sm:pl-2 px-2 sm:w-[100%] w-9 duration-300"
        active-class="bg-gray-500 text-white dark:bg-gray-600 dark:text-white"
        :class="
          route.path == item.to
            ? ''
            : 'hover:bg-gray-400 hover:shadow-lg dark:hover:bg-gray-700 hover:animate-pulse'
        "
        v-for="(item, i) in store.menu"
        :key="i"
        :to="item.to"
      >
        <i :class="item.icon"></i>
        <p v-if="!store.isOpen" class="sm:block hidden">{{ item.name }}</p>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { useFuncStore } from "../stores/funcStore";
import { useRoute } from "vue-router";

const store = useFuncStore();
const route = useRoute();
</script>

<style scoped>
/* Scoped styles for dark mode if needed */
</style>
