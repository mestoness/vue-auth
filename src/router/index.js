import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Secret from "../views/Secret.vue";
import axios from "axios";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Home
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/register",
    component: Register
  },
  {
    path: "/secret",
    component: Secret
  },
  {
    path: "*",
    component: Home
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;

router.beforeEach((to, from, next) => {
  if (to.path == "/secret" || to.path == "/login" || to.path == "/register") {
    if (localStorage.getItem("token")) {
      axios
        .get("http://localhost:3000/info", {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(response => {
          if (response.data[0].statusText == "OK") {
            if (to.path == "/login" || to.path == "/register") {
              next("/");
            } else {
              next();
            }
          } else {
            if (to.path != "/secret") {
              next();
            } else {
              next("/login");
            }
          }
        })
        .catch(() => {
          if (to.path != "/secret") {
            next();
          } else {
            next("/login");
          }
        });
    } else {
      if (to.path != "/secret") {
        next();
      } else {
        next("/login");
      }
    }
  } else {
    next();
  }
});
