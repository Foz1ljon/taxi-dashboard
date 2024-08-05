import { defineStore } from "pinia";
export const useFuncStore = defineStore("func", {
  state: () => ({
    isOpen: false,
    menu: [
      {
        name: "Home",
        to: "/dashboard",
        icon: "fi fi-rr-apps",
      },
      {
        name: "Admins",
        to: "/admins",
        icon: "fi fi-bs-admin-alt",
      },
      {
        name: "Drivers",
        to: "/drivers",
        icon: "fi fi-br-driver-man",
      },
      {
        name: "Orders",
        to: "/taxi-orders",
        icon: "fi fi-rs-taxi",
      },
      {
        name: "Orders",
        to: "/delivery-orders",
        icon: "fi fi-rs-order-history",
      },
      {
        name: "Clients",
        to: "/clients",
        icon: "fi fi-sr-hr-group",
      },
    ],
  }),
  actions: {
    open() {
      this.isOpen = !this.isOpen;
    },
  },
});
