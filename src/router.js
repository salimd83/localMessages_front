import VueRouter from "vue-router";
// import Vue from "vue";

import Auth from "./components/Login";
import Messages from "./components/messages/Wall";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import EmailVerified from "./components/EmailVerified";

const routes = [
  { path: "/", name: 'home', component: Messages, meta: { requiresAuth: true } },
  { path: "/login", name: 'login', component: Auth },
  { path: "/register", name: 'register', component: Register },
  { path: "/forgot-password", name: 'forgotPassword', component: ForgotPassword },
  { path: "/reset-password", name: 'resetPassword', component: ResetPassword },
  { path: "/email-verified", name: 'emailVerified', component: EmailVerified },
];

const router = new VueRouter({
  mode: "history",
  routes
});

router.beforeResolve((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!localStorage.getItem('token')) {
      next("/login")
      return
    }
  }

  next();
});

export default router;
