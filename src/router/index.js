// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";

function isAuthenticated() {
  return !!localStorage.getItem("token");
}

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "main",
      redirect: "/dashboard",
      component: () => import("@/pages/DashBoard.vue"),
      children: [
        {
          path: "/dashboard",
          name: "dashboard",
          component: () => import("@/views/default.vue"),
        },
        {
          path: "/profile",
          name: "profile",
          component: () => import("@/views/admins/profile.vue"),
        },
        {
          path: "/admins",
          name: "admin-list",
          component: () => import("@/views/admins/admin-list.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "/clients",
          name: "client-list",
          component: () => import("@/views/clients/client-list.vue"),
        },
        {
          path: "/drivers",
          name: "driver-list",
          component: () => import("@/views/drivers/driver-list.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "/taxi-orders",
          name: "order-list",
          component: () => import("@/views/orders/order-list.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "/delivery-orders",
          name: "delivery-list",
          component: () => import("@/views/orders/delivery-order.vue"),
          meta: { requiresAuth: true },
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/pages/Login.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
