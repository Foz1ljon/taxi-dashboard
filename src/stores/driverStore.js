import { defineStore } from "pinia";
import api from "@/api";
import { useToast } from "vue-toastification";

export const useDriverStore = defineStore("driver", {
  state: () => ({
    drivers: [], // Driver list
    loading: false, // Loading state
    token: localStorage.getItem("token"), // Get token
    toast: useToast(), // Toast notifications
  }),
  actions: {
    // Set headers for requests
    setHeaders() {
      return {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      };
    },

    // Fetch drivers
    async fetchDrivers() {
      this.loading = true; // Set loading state
      try {
        const response = await api.get("/driver", this.setHeaders());
        this.drivers = response.data; // Save drivers
      } catch (error) {
        this.toast.error("Error fetching drivers.");
        console.error("Error fetching drivers:", error);
      } finally {
        this.loading = false; // Unset loading state
      }
    },

    // Create a new driver
    async createDriver(driverData) {
      this.loading = true; // Set loading state
      try {
        await api.post("/driver", driverData, this.setHeaders());
        this.toast.success("Driver created successfully!");
        await this.fetchDrivers(); // Refresh driver list
      } catch (error) {
        this.toast.error("Error creating driver.");
        console.error("Error creating driver:", error.message);
      } finally {
        this.loading = false; // Unset loading state
      }
    },

    // Delete a driver
    async deleteDriver(id) {
      try {
        await api.delete(`/driver/${id}`, this.setHeaders());
        this.toast.success("Driver deleted successfully");
        await this.fetchDrivers(); // Refresh driver list
      } catch (error) {
        this.toast.error("Error deleting driver.");
        console.error("Error deleting driver:", error.message);
      }
    },

    // Activate a driver
    async activeDriver(id) {
      this.loading = true; // Set loading state
      try {
        await api.post(`/driver/activate/${id}`, {}, this.setHeaders());
        this.toast.success("Driver activated!");
        await this.fetchDrivers(); // Refresh driver list
      } catch (error) {
        this.toast.error("Error activating driver.");
        console.error("Error activating driver:", error);
      } finally {
        this.loading = false; // Unset loading state
      }
    },

    // Deactivate a driver
    async unactiveDriver(id) {
      this.loading = true; // Set loading state
      try {
        await api.put(`/driver/unactivate/${id}`, {}, this.setHeaders());
        this.toast.success("Driver deactivated!");
        await this.fetchDrivers(); // Refresh driver list
      } catch (error) {
        this.toast.error("Error deactivating driver.");
        console.error("Error deactivating driver:", error);
      } finally {
        this.loading = false; // Unset loading state
      }
    },

    // Add balance to a driver
    async addBalance(id, sum) {
      const amount = parseFloat(sum);
      if (isNaN(amount) || amount <= 0) {
        this.toast.warning("Amount must be a valid number greater than zero.");
        return;
      }

      this.loading = true; // Set loading state
      try {
        // Send the data in the expected format
        await api.post(
          `/driver/balance/${id}`,
          { sum: amount },
          this.setHeaders()
        );
        this.toast.success("Amount added to driver's balance!");
        await this.fetchDrivers(); // Refresh driver list
      } catch (error) {
        if (error.response) {
          // Error response from the server
          const errorMessage =
            error.response.data.message || "Error adding balance.";
          this.toast.error(errorMessage);
          console.error("Error adding balance:", error.response.data);
        } else {
          // Network error or other issue
          this.toast.error("Error adding balance.");
          console.error("Error adding balance:", error.message);
        }
      } finally {
        this.loading = false; // Unset loading state
      }
    },

    // Remove balance from a driver
    async removeBalance(id, sum) {
      const amount = parseFloat(sum);
      if (isNaN(amount) || amount <= 0) {
        this.toast.warning("Amount must be a valid number greater than zero.");
        return;
      }

      this.loading = true; // Set loading state
      try {
        await api.delete(`/driver/balance/${id}`, {
          data: { sum: amount },
          ...this.setHeaders(),
        });
        this.toast.success("Amount removed from driver's balance!");
        await this.fetchDrivers(); // Refresh driver list
      } catch (error) {
        this.toast.error("Error removing balance.");
        console.error("Error removing balance:", error);
      } finally {
        this.loading = false; // Unset loading state
      }
    },
  },
});
