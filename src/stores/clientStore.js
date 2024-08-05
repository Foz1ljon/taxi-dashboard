import { defineStore } from "pinia";
import api from "@/api";
import { useToast } from "vue-toastification";

export const useClientStore = defineStore("client", {
  state: () => ({
    clients: [], // Client list
    loading: false, // Loading state
    token: localStorage.getItem("token") || "", // Token
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

    // Fetch clients with optional pagination
    async fetchClients(page = 1, limit = 10) {
      this.loading = true; // Start loading
      try {
        const response = await api.get(
          `/client?page=${page}&limit=${limit}`,
          this.setHeaders()
        );
        this.clients = response.data; // Store clients
      } catch (error) {
        this.toast.error("Error fetching clients.");
        console.error("Fetch clients error:", error);
      } finally {
        this.loading = false; // Stop loading
      }
    },

    // Create a new client
    async createClient(clientData) {
      this.loading = true; // Start loading
      try {
        await api.post("/client", clientData, this.setHeaders());
        this.toast.success("Client created successfully!");
        await this.fetchClients(); // Refresh client list
      } catch (error) {
        this.toast.error("Error creating client.");
        console.error("Create client error:", error.message);
      } finally {
        this.loading = false; // Stop loading
      }
    },

    // Delete a client
    async deleteClient(id) {
      this.loading = true; // Start loading
      try {
        await api.delete(`/client/${id}`, this.setHeaders());
        this.toast.success("Client deleted successfully!");
        await this.fetchClients(); // Refresh client list
      } catch (error) {
        this.toast.error("Error deleting client.");
        console.error("Delete client error:", error.message);
      } finally {
        this.loading = false; // Stop loading
      }
    },

    // Activate a client
    async activateClient(id) {
      this.loading = true; // Start loading
      try {
        await api.post(`/client/activate/${id}`, this.setHeaders());
        this.toast.success("Client activated!");
        await this.fetchClients(); // Refresh client list
      } catch (error) {
        this.toast.error("Error activating client.");
        console.error("Activate client error:", error);
      } finally {
        this.loading = false; // Stop loading
      }
    },

    // Deactivate a client
    async deactivateClient(id) {
      this.loading = true; // Start loading
      try {
        await api.put(`/client/unactivate/${id}`, this.setHeaders());
        this.toast.success("Client deactivated!");
        await this.fetchClients(); // Refresh client list
      } catch (error) {
        this.toast.error("Error deactivating client.");
        console.error("Deactivate client error:", error);
      } finally {
        this.loading = false; // Stop loading
      }
    },

    // Update a client
    async updateClient(id, clientData) {
      this.loading = true; // Start loading
      try {
        await api.put(`/client/${id}`, clientData, this.setHeaders());
        this.toast.success("Client updated successfully!");
        await this.fetchClients(); // Refresh client list
      } catch (error) {
        this.toast.error("Error updating client.");
        console.error("Update client error:", error);
      } finally {
        this.loading = false; // Stop loading
      }
    },
  },
});
