import { defineStore } from "pinia";
import api from "@/api";
import { useToast } from "vue-toastification";

export const usedeliveryOrderStore = defineStore("deliveryOrder", {
  state: () => ({
    deliveryOrders: [], // deliveryOrderlar ro'yxati
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
    // Buyurtmalarni olish
    async fetchdeliveryOrders() {
      this.loading = true; // Yuklanish holatini yoqish

      try {
        const response = await api.get(`/delivery-order`, this.setHeaders());
        this.deliveryOrders = response.data; // Buyurtmalarni saqlash
        console.log(response.data);
      } catch (error) {
        this.toast.error("Buyurtmalarni olishda xato.");
        console.error("Buyurtmalarni olish xatosi:", error);
      } finally {
        this.loading = false; // Yuklanish holatini o'chirish
      }
    },

    // Buyurtmani o'chirish
    async deletedeliveryOrder(id) {
      try {
        await api.delete(`/delivery-order/${id}`, this.setHeaders());
        this.toast.success("Buyurtma muvaffaqiyatli o'chirildi");
        await this.fetchdeliveryOrders(); // Buyurtma ro'yxatini yangilash
      } catch (error) {
        this.toast.error("Buyurtmani o'chirishda xato.");
        console.error("Buyurtmani o'chirish xatosi:", error.message);
      }
    },
  },
});
