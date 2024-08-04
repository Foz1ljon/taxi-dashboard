import { defineStore } from "pinia";
import api from "@/api";
import { useToast } from "vue-toastification";

export const useDriverStore = defineStore("driver", {
  state: () => ({
    drivers: [], // Driverlar ro'yxati
    loading: false, // Yuklanish holati
    token: localStorage.getItem("token"), // Tokenni olish
    toast: useToast(), // Toast bildirishnomalar
  }),
  actions: {
    // So'rovlar uchun sarlavhalarni o'rnatish
    setHeaders() {
      return {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      };
    },

    // Mahsulotlarni olish
    async fetchDrivers() {
      this.loading = true; // Yuklanish holatini yoqish

      try {
        const response = await api.get(`/driver`, this.setHeaders());
        this.drivers = response.data; // Mahsulotlarni saqlash
      } catch (error) {
        this.toast.error("Mahsulotlarni olishda xato.");
        console.error("Mahsulotlarni olish xatosi:", error);
      } finally {
        this.loading = false; // Yuklanish holatini o'chirish
      }
    },

    // Yangi mijoz yaratish
    async createDriver(driverData) {
      this.loading = true; // Yuklanish holatini yoqish
      try {
        await api.post("/driver", driverData, this.setHeaders());
        this.toast.success("Haydovchi muvaffaqiyatli yaratildi!");
        await this.fetchDrivers(); // Mahsulot ro'yxatini yangilash
      } catch (error) {
        this.toast.error("Haydovchini yaratishda xato.");
        console.error("Haydovchini yaratish xatosi:", error.message);
      } finally {
        this.loading = false; // Yuklanish holatini o'chirish
      }
    },

    // Haydovchini o'chirish
    async deleteDriver(id) {
      try {
        await api.delete(`/driver/${id}`, this.setHeaders());
        this.toast.success("Haydovchi muvaffaqiyatli o'chirildi");
        await this.fetchDrivers(); // Mahsulot ro'yxatini yangilash
      } catch (error) {
        this.toast.error("Haydovchini o'chirishda xato.");
        console.error("Haydovchini o'chirish xatosi:", error.message);
      }
    },

    // Haydovchini active qilish
    async activeDriver(id) {
      this.loading = true; // Yuklanish holatini yoqish
      try {
        await api.post(`/driver/activate/${id}`, this.setHeaders());
        this.toast.success("Haydovchi faolligi yoqildi!");
        await this.fetchDrivers(); // Mahsulot ro'yxatini yangilash
      } catch (error) {
        this.toast.error("Haydovchini yangilashda xato.");
        console.error("Haydovchini yangilash xatosi:", error);
      } finally {
        this.loading = false; // Yuklanish holatini o'chirish
      }
    },
    async unactiveDriver(id) {
      this.loading = true; // Yuklanish holatini yoqish
      try {
        await api.put(`/driver/unactivate/${id}`, this.setHeaders());
        this.toast.success("Haydovchi faolligi o`chirildi!");
        await this.fetchDrivers(); // Mahsulot ro'yxatini yangilash
      } catch (error) {
        this.toast.error("Haydovchini yangilashda xato.");
        console.error("Haydovchini yangilash xatosi:", error);
      } finally {
        this.loading = false; // Yuklanish holatini o'chirish
      }
    },

    // Haydovchini yangilash
    async updateDriver(id, driverData) {
      this.loading = true; // Yuklanish holatini yoqish
      try {
        await api.put(`/driver/${id}`, driverData, this.setHeaders());
        this.toast.success("Haydovchi ma'lumotlari yangilandi!");
        await this.fetchDrivers(); // Mahsulot ro'yxatini yangilash
      } catch (error) {
        this.toast.error("Haydovchini yangilashda xato.");
        console.error("Haydovchini yangilash xatosi:", error);
      } finally {
        this.loading = false; // Yuklanish holatini o'chirish
      }
    },
  },
});
