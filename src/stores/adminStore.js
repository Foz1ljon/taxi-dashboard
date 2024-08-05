import { defineStore } from "pinia";
import api from "@/api";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

export const useAdminStore = defineStore("admin", {
  state: () => ({
    router: useRouter(), // Use in actions
    profile: {},
    admins: [],
    loading: false,
    token: localStorage.getItem("token") || "", // Initialize with empty string if not present
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
      this.loading = true;
      const toast = useToast(); // Use in actions

      try {
        const res = await api.post("/admin/login", data);

        // Store the token and ID
        localStorage.setItem("token", res.data.tokens.access_token);
        localStorage.setItem("id", res.data.admin.id);
        this.token = res.data.tokens.access_token;

        toast.success("Muvofaqqiyatli kirdingiz!", { timeout: 1000 });
        this.router.push("/dashboard");
      } catch (error) {
        if (error.code === "ERR_NETWORK") {
          toast.warning("Tarmoq xatosi!", { timeout: 2000 });
        } else if (error.response && error.response.status === 400) {
          toast.warning(error.response.data.message[0], { timeout: 2000 });
        } else if (error.response && error.response.status === 404) {
          toast.error("Username yoki parol xato!", { timeout: 2000 });
        } else {
          toast.error("Kutilmagan xato yuz berdi.", { timeout: 2000 });
        }
        console.error("Login xatosi:", error);
      } finally {
        this.loading = false;
      }
    },

    async fetchAdmins() {
      this.loading = true;
      const toast = useToast(); // Use in actions
      const router = useRouter(); // Use in actions
      try {
        const response = await api.get("/admin", this.setHeaders());
        this.admins = response.data;
      } catch (error) {
        toast.error("Mahsulotlarni olishda xato.");
        console.error("Mahsulotlarni olish xatosi:", error);
        router.push("/login");
      } finally {
        this.loading = false;
      }
    },

    async createAdmin(adminData) {
      this.loading = true;
      const toast = useToast(); // Use in actions
      try {
        await api.post("/admin", adminData, this.setHeaders());
        toast.success("Mijoz muvaffaqiyatli yaratildi!");
        await this.fetchAdmins();
      } catch (error) {
        toast.error("Mijozni yaratishda xato.");
        console.error("Mijozni yaratish xatosi:", error);
      } finally {
        this.loading = false;
      }
    },

    async deleteAdmin(id) {
      const toast = useToast(); // Use in actions
      try {
        await api.delete(`/admin/${id}`, this.setHeaders()); // Fix endpoint here
        toast.success("Mijoz muvaffaqiyatli o'chirildi");
        await this.fetchAdmins();
      } catch (error) {
        toast.error("Mijozni o'chirishda xato.");
        console.error("Mijozni o'chirish xatosi:", error.message);
      }
    },

    async updateAdmin(id, adminData) {
      this.loading = true;
      const toast = useToast(); // Use in actions
      try {
        await api.patch(`/admin/${id}`, adminData, this.setHeaders());
        toast.success("Mijoz ma'lumotlari yangilandi!");
        await this.fetchAdmins();
        await this.getAdminById(id); // Ensure you use await here
      } catch (error) {
        toast.error("Mijozni yangilashda xato.");
        console.error("Mijozni yangilash xatosi:", error);
      } finally {
        this.loading = false;
      }
    },

    async getAdminById(id) {
      if (!id) {
        console.error("No ID provided");
        return;
      }

      this.loading = true;
      const toast = useToast(); // Use in actions
      try {
        const response = await api.get(`/admin/${id}`, this.setHeaders());
        this.profile = response.data;
      } catch (error) {
        toast.error("Mijozni olishda xato.");
        console.error("Mijozni olish xatosi:", error);
      } finally {
        this.loading = false;
      }
    },
  },
});
