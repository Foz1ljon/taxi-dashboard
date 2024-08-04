<template>
  <div
    :class="{ dark: isDarkMode }"
    class="bg-gray-50 dark:bg-gray-800 text-black dark:text-white transition-colors duration-300 min-h-screen"
  >
    <div
      class="w-full fixed h-14 bg-gray-300 border px-3 flex z-20 justify-between items-center dark:bg-gray-700"
    >
      <!-- Dark Mode Toggle Button -->
      <div
        class="flex items-center duration-300"
        :class="
          store.isOpen ? 'xl:ml-[7%]  md:ml-[11%] sm:ml-[15%]' : 'md:ml-[18%]  sm:ml-[22%]'
        "
      >
        <label class="flex items-center cursor-pointer">
          <span class="mr-3 text-black dark:text-white sm:block hidden">
            Dark Mode
          </span>
          <input
            type="checkbox"
            v-model="isDarkMode"
            @change="toggleDarkMode"
            class="hidden"
          />
          <div
            class="relative inline-flex items-center cursor-pointer"
            @click="toggleDarkMode"
          >
            <div
              class="w-12 h-6 bg-gray-400 dark:bg-gray-600 rounded-full transition-colors duration-300"
            ></div>
            <div
              class="absolute w-6 h-6 bg-white dark:bg-gray-800 rounded-full shadow-md transition-transform duration-300"
              :class="{
                'translate-x-6': isDarkMode,
                'translate-x-0': !isDarkMode,
              }"
            ></div>
          </div>
        </label>
      </div>

      <!-- Profile Dropdown -->
      <div
        @click="toggleDropdown"
        class="w-11 h-11 cursor-pointer relative flex items-center"
      >
        <img
          class="rounded-full"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhmifuSS-B1jCpkp6VutopgbnBqKeqgsiCOQ&s"
          alt="Profile"
        />
        <!-- Dropdown menu -->
        <div
          v-if="isDropdownOpen"
          class="absolute right-0 top-10 mt-2 w-48 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-600 rounded shadow-lg"
        >
          <ul class="py-2">
            <button
              @click="router.push('/profile')"
              class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
            >
              <i
                class="fi fi-ss-user w-5 h-5 mr-2 text-gray-600 dark:text-gray-300"
              ></i>
              Settings
            </button>
            <button
              @click="logout"
              class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
            >
              <i
                class="fi fi-br-sign-out-alt w-5 h-5 mr-2 text-gray-600 dark:text-gray-300"
              ></i>
              Logout
            </button>
          </ul>
        </div>
      </div>
    </div>
    <div
      :class="
        store.isOpen
          ? 'xl:ml-[5%] md:ml-[8%] sm:ml-[10%]'
          : 'xl:ml-[16%] sm:ml-[16%]'
      "
      class="duration-300 mt-24"
    >
      <div class="container duration-300">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useFuncStore } from "../stores/funcStore";
import { useRouter } from "vue-router";

const isDropdownOpen = ref(false);
const isDarkMode = ref(false);
const router = useRouter();
const store = useFuncStore();
// Load the dark mode setting from localStorage

onMounted(() => {
  const darkModeSetting = localStorage.getItem("isDarkMode");
  isDarkMode.value = darkModeSetting === "true";
  document.documentElement.classList.toggle("dark", isDarkMode.value);
});

// Toggle dark mode
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  document.documentElement.classList.toggle("dark", isDarkMode.value);

  // Save the dark mode setting to localStorage
  localStorage.setItem("isDarkMode", isDarkMode.value.toString());
};

// Toggle dropdown menu
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const logout = () => {
  localStorage.clear();
  router.push("/login");
};
</script>

<style scoped>
/* Add any additional styles for the dropdown menu and dark mode if necessary */
</style>
