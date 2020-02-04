import Vue from "vue";
// import store from "../store/store";
import Router from "vue-router";
import LoginForm from "../components/LoginForm";
import IntialForm from "../components/InitialForm";
import RegisterFrom from "../components/RegisterForm";
import Home from "../components/Home";
import GameInital from "../components/Game/GameInital";
import CreateGame from "../components/Game/CreateGame";
import NotFound from "../components/common/NotFound";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Welcome",
      component: IntialForm
    },
    {
      path: "/login",
      name: "login",
      component: LoginForm
    },
    {
      path: "/register",
      name: "Register",
      component: RegisterFrom
    },
    {
      path: "/home",
      name: "Home",
      component: Home
    },
    {
      path: "/game/:id",
      name: "game",
      component: GameInital
    },
    {
      path: "/createGame",
      name: "createGame",
      component: CreateGame
    },
    {
      path: "/404",
      name: "notFound",
      component: NotFound
    },
    {
      path: "*",
      name: "notFound",
      component: NotFound
    }
  ]
});

// router.beforeEach((to, from, next) => {
//   if (to.name !== "login") {
//     if (!store.getters.isAuthenticated) next("/login");
//     else next();
//   } else next();
// });

export default router;
