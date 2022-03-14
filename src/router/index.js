import { createRouter, createWebHistory, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
];

// const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
//   routes,
// });

const router = createRouter({
  history: process.env.IS_ELECTRON
    ? createWebHashHistory()
    : createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  if (to.meta.requiresAuth && localStorage.getItem("token") === null) {
    return { name: "login" };
  }
});

export default router;
