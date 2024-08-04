<template>
  <div class="flex">
    <SideBar />
    <div class="flex flex-col w-full">
      <Navbar />
    </div>
  </div>
</template>

<script setup>
import SideBar from "../components/SideBar.vue";
import Navbar from "../components/NavBar.vue";
</script>
