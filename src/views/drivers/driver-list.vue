<template>
  <div class="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
    <h1 class="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
      Driver List
    </h1>

    <!-- Show loader while fetching data -->
    <div
      v-if="driverStore.loading"
      class="flex justify-center items-center min-h-screen"
    >
      <i class="fi fi-rr-spinner animate-spin text-blue-500 text-4xl"></i>
    </div>

    <!-- Driver list -->
    <div v-else class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="driver in driverStore.drivers"
        :key="driver.id"
        class="bg-white shadow-md rounded-lg overflow-hidden p-4 dark:bg-gray-800 dark:shadow-gray-700"
      >
        <div class="flex sm:flex-row flex-col gap-2 items-center">
          <div class="flex-shrink-0">
            <!-- Display driver photo or default photo -->
            <img
              v-if="driver.photo"
              class="h-16 w-16 rounded-full"
              :src="driver.photo"
              alt="Driver Photo"
            />
            <div
              v-else
              class="h-16 w-16 flex items-center justify-center bg-gray-300 dark:bg-gray-700 rounded-full text-gray-500 dark:text-gray-400"
            >
              <i class="fi fi-ss-user text-xl"></i>
            </div>
          </div>
          <div class="flex-1 min-w-0">
            <h2
              class="text-base font-semibold text-gray-900 dark:text-gray-200"
            >
              {{ driver.name || "Not Available" }}
              {{ driver.surname || "Not Available" }}
            </h2>
            <p class="text-sm text-gray-500 dark:text-gray-400 font-medium">
              Phone:
              <span class="text-blue-600 dark:text-blue-400">{{
                driver.phone || "Not Available"
              }}</span>
            </p>
            <p class="text-sm text-gray-500 dark:text-gray-400 font-medium">
              Age: {{ driver.age != null ? driver.age : "Not Available" }}
            </p>
            <p
              class="text-sm font-medium"
              :class="{
                'text-red-600': driver.total_balance === 0,
                'text-green-600': driver.total_balance > 0,
                'text-gray-500': driver.total_balance == null,
              }"
            >
              Total Balance:
              {{
                driver.total_balance != null
                  ? driver.total_balance
                  : "Not Available"
              }}
            </p>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Status:
              <span
                :class="{
                  'text-green-500': driver.isActive,
                  'text-red-500': !driver.isActive,
                }"
              >
                <i
                  v-if="driver.isActive"
                  class="fi fi-rr-toggle-on text-base"
                ></i>
                <i v-else class="fi fi-rr-toggle-off text-base"></i>
              </span>
            </p>
            <p class="text-xs text-gray-400 dark:text-gray-500">
              Created At: {{ formatDate(driver.createdAt) || "Not Available" }}
            </p>
            <div v-if="driver.prava" class="mt-2">
              <button
                @click="openModal(driver.prava)"
                class="text-blue-500 hover:text-blue-700"
              >
                View Prava Document
              </button>
            </div>
            <div v-else class="mt-2 text-gray-500 dark:text-gray-400">
              No Prava Document Available
            </div>
            <p class="mt-2 text-gray-500 dark:text-gray-400">
              Passport: {{ driver.passport || "Not Available" }}
            </p>
          </div>
        </div>

        <div class="mt-4 flex space-x-4">
          <!-- Add balance -->
          <div class="relative group">
            <button
              @click="openBalanceModal(driver.id, 'add')"
              class="relative flex items-center justify-center text-lg p-2 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <i class="fi fi-sr-shopping-cart-add"></i>
              <div
                class="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 p-2 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                Add Balance
              </div>
            </button>
          </div>

          <!-- Remove balance -->
          <div class="relative group">
            <button
              @click="openBalanceModal(driver.id, 'remove')"
              class="relative flex items-center justify-center text-lg p-2 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <i class="fi fi-sr-remove-user"></i>
              <div
                class="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 p-2 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                Remove Balance
              </div>
            </button>
          </div>

          <!-- Toggle active status -->
          <div class="relative group">
            <button
              @click="toggleActive(driver)"
              class="relative flex items-center justify-center text-lg p-2 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
              :class="{
                'text-green-300': !driver.isActive,
                'text-gray-500': driver.isActive,
              }"
            >
              <i
                :class="
                  driver.isActive
                    ? 'fi fi-rr-cross-circle'
                    : 'fi fi-rr-check-circle'
                "
              ></i>
              <div
                class="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 p-2 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                {{ driver.isActive ? "Deactivate" : "Activate" }}
              </div>
            </button>
          </div>

          <!-- Delete Button -->
          <div class="relative group">
            <button
              @click="deleteDriver(driver.id)"
              class="relative flex items-center justify-center text-lg p-2 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <i class="fi fi-rr-trash"></i>
              <div
                class="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 p-2 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                Delete Driver
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal for viewing Prava document -->
    <transition name="fade">
      <div
        v-if="showModal"
        class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50"
        @click.self="closeModal"
      >
        <div
          class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg max-w-3xl w-full relative"
        >
          <button
            @click="closeModal"
            class="absolute top-2 right-2 text-red-500 hover:text-red-700"
          >
            <i class="fi fi-rr-close text-xl"></i>
          </button>
          <iframe
            :src="modalDocumentUrl"
            class="w-full h-96"
            frameborder="0"
          ></iframe>
        </div>
      </div>
    </transition>

    <!-- Modal for balance actions -->
    <transition name="fade">
      <div
        v-if="showBalanceModal"
        class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50"
        @click.self="closeBalanceModal"
      >
        <div
          class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg max-w-md w-full relative"
        >
          <button
            @click="closeBalanceModal"
            class="absolute top-2 right-2 text-red-500 hover:text-red-700"
          >
            <i class="fi fi-rr-close text-xl"></i>
          </button>
          <h2 class="text-lg font-semibold mb-4">
            {{ balanceAction === "add" ? "Add Balance" : "Remove Balance" }}
          </h2>
          <input
            v-model.number="balanceAmount"
            type="number"
            placeholder="Enter amount"
            class="w-full border border-gray-300 rounded p-2 mb-4"
          />
          <div class="flex justify-end space-x-4">
            <button
              @click="submitBalanceAction"
              class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Submit
            </button>
            <button
              @click="closeBalanceModal"
              class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useDriverStore } from "../../stores/driverStore";

const driverStore = useDriverStore();
const showModal = ref(false);
const showBalanceModal = ref(false);
const modalDocumentUrl = ref("");
const balanceAction = ref(""); // 'add' or 'remove'
const balanceAmount = ref(0);
const loadingState = ref({ driverId: null, action: "" });

onMounted(() => {
  driverStore.fetchDrivers();
});

const formatDate = (dateString) => {
  if (!dateString) return "Not Available";
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const toggleActive = async (driver) => {
  loadingState.value = { driverId: driver.id, action: "toggle" };
  try {
    if (!driver.isActive) await driverStore.activeDriver(driver.id);
    else await driverStore.unactiveDriver(driver.id);
  } finally {
    loadingState.value = { driverId: null, action: "" };
  }
};

const deleteDriver = async (driverId) => {
  if (confirm("Are you sure you want to delete this driver?")) {
    loadingState.value = { driverId, action: "delete" };
    try {
      await driverStore.deleteDriver(driverId);
    } finally {
      loadingState.value = { driverId: null, action: "" };
    }
  }
};

const openModal = (url) => {
  modalDocumentUrl.value = url;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const openBalanceModal = (driverId, action) => {
  balanceAction.value = action;
  balanceAmount.value = 0;
  driverStore.selectedDriverId = driverId; // Set the selected driver ID
  showBalanceModal.value = true;
};

const closeBalanceModal = () => {
  showBalanceModal.value = false;
};

const submitBalanceAction = async () => {
  if (balanceAmount.value <= 0) {
    alert("Please enter a valid amount.");
    return;
  }

  const driverId = driverStore.selectedDriverId; // Get the selected driver ID
  loadingState.value = { driverId, action: balanceAction.value };

  try {
    if (balanceAction.value === "add") {
      await driverStore.addBalance(driverId, balanceAmount.value);
    } else if (balanceAction.value === "remove") {
      await driverStore.removeBalance(driverId, balanceAmount.value);
    }
  } catch (error) {
    console.error("Balance action error:", error);
    alert("An error occurred while processing the balance action.");
  } finally {
    loadingState.value = { driverId: null, action: "" };
    closeBalanceModal();
  }
};
</script>
