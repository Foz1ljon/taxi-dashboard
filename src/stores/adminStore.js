import { defineStore } from "pinia";
import api from "@/api";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

export const useAdminStore = defineStore("admin", {
  state: () => ({
    profile: {},
    admins: [],
    loading: false,
    token: localStorage.getItem("token") || "", // Initialize with empty string if not present
    toast: useToast(),
    router: useRouter(),
  }),
  actions: {
    setHeaders() {
      return {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      };
    },

    async login(data) {
      this.loading = true; // Show loader
      try {
        const response = await api.post("/admin/login", data);
        const { access_token, admin } = response.data;
        this.token = access_token;
        localStorage.setItem("token", access_token);
        localStorage.setItem("id", admin.id);
        this.toast.success("Muvofaqqiyatli kirdingiz!", { timeout: 1000 });
        this.router.push("/dashboard");
      } catch (error) {
        if (error.code === "ERR_NETWORK") {
          this.toast.warning("Tarmoq xatosi!", { timeout: 2000 });
        } else if (error.response.status === 400) {
          this.toast.warning(error.response.data.message[0], { timeout: 2000 });
        } else if (error.response.status === 404) {
          this.toast.error("Username yoki parol xato!", { timeout: 2000 });
        }
        console.error("Login xatosi:", error);
      } finally {
        this.loading = false; // Hide loader
      }
    },

    async fetchAdmins() {
      this.loading = true; // Show loading
      try {
        const response = await api.get(`/admin`, this.setHeaders());
        this.admins = response.data;
      } catch (error) {
        this.toast.error("Mahsulotlarni olishda xato.");
        console.error("Mahsulotlarni olish xatosi:", error);
      } finally {
        this.loading = false; // Hide loading
      }
    },

    async createAdmin(adminData) {
      this.loading = true; // Show loading
      try {
        await api.post("/admins", adminData, this.setHeaders());
        this.toast.success("Mijoz muvaffaqiyatli yaratildi!");
        await this.fetchAdmins(); // Refresh list
      } catch (error) {
        this.toast.error("Mijozni yaratishda xato.");
        console.error("Mijozni yaratish xatosi:", error.message);
      } finally {
        this.loading = false; // Hide loading
      }
    },

    async deleteAdmin(id) {
      try {
        await api.delete(`/admins/${id}`, this.setHeaders());
        this.toast.success("Mijoz muvaffaqiyatli o'chirildi");
        await this.fetchAdmins(); // Refresh list
      } catch (error) {
        this.toast.error("Mijozni o'chirishda xato.");
        console.error("Mijozni o'chirish xatosi:", error.message);
      }
    },

    async updateAdmin(id, adminData) {
      this.loading = true; // Show loading
      try {
        await api.put(`/admins/${id}`, adminData, this.setHeaders());
        this.toast.success("Mijoz ma'lumotlari yangilandi!");
        await this.fetchAdmins(); // Refresh list
      } catch (error) {
        this.toast.error("Mijozni yangilashda xato.");
        console.error("Mijozni yangilash xatosi:", error);
      } finally {
        this.loading = false; // Hide loading
      }
    },

    async getAdminById(id) {
      if (!id) {
        this.toast.error("Ruxsatsiz foydalanuvchi!");
        localStorage.clear();
        return this.router.push("/login");
      }
      this.loading = true; // Show loading
      try {
        const response = await api.get(`/admin/${id}`, this.setHeaders());
        this.profile = response.data;
      } catch (error) {
        this.toast.error("Mijozni olishda xato.");
        console.error("Mijozni olish xatosi:", error);
      } finally {
        this.loading = false; // Hide loading
      }
    },
  },
});
