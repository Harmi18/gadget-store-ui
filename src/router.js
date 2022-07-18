import { createRouter, createWebHistory } from "vue-router";
// import Login from "src/components/Login.vue";
import Home from "../src/components/Home.vue";
import Product from "../src/components/Product/Product.vue";
import ProductDetail from "../src/components/Product/ProductDetail.vue";
import Header from "../src/layout/Header.vue";
import CheckOut from "../src/components/Product/checkOut.vue";
import thankYou from "../src/components/ThankYou.vue";
import dashboard from "../src/components/Admin/Dashboard.vue";
import User from "../src/components/Admin/User.vue";
import ProductAdmin from "../src/components/Admin/Product.vue";

let redirect = "/home";
export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Header,
      children: [
        {
          path: "/",
          redirect,
        },
        {
          path: "home",
          component: Home,
        },
        {
          path: "product",
          component: Product,
        },
        {
          path: "ProductDetail/:id",
          component: ProductDetail,
        },
        {
          path: "checkout",
          component: CheckOut,
        },
        {
          path: "thankYou",
          component: thankYou,
        },
      ],
    },
    {
      path: "/admin",
      component: dashboard,
      children: [
        {
          path: "user",
          component: User,
        },
        {
          path: "product",
          component: ProductAdmin,
        },
      ],
    },
    {
      path: "/loginUser",
      name: "Login",
      component: () => import("./components/LoginUser.vue"),
    },
    {
      path: "/admin/login",
      name: "adminLogin",
      component: () => import("./components/Admin/AdminLogin.vue"),
      // src/components/AdminLogin.vue
    },
  ],
});

export default router;
