import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loginStatus: null,
    userData: [],
    registerStatus: null
  },
  mutations: {
    loginUser(state, status) {
      state.loginStatus = status;
    },
    userData(state, data) {
      state.userData = data.data[0];
    },
    registerUser(state, status) {
      state.registerStatus = status;
    },
    clearStatus(state, data) {
      state.status = data;
    }
  },
  actions: {
    clearStatus(context) {
      context.commit("clearStatus", null);
    },
    loginUser(context, data) {
      axios
        .post("http://localhost:3000/login", data)
        .then(response => {
          if (response.data.login == "true") {
            context.commit("loginUser", "Başarıyla Giriş Yapıldı");
            localStorage.setItem("token", response.data.token);
          } else {
            context.commit("loginUser", "Giriş Bilgilerinizi Kontrol ediniz");
            localStorage.removeItem("token");
          }
        })
        .catch(() => {
          context.commit("loginUser", "Giriş Bilgilerinizi Kontrol ediniz");
        });
    },
    registerUser(context, data) {
      axios
        .post("http://localhost:3000/signup", data)
        .then(response => {
          if (response.data[0].statusText == "Created") {
            context.commit("registerUser", "Başarıyla Kayıt Olundu");
          } else {
            context.commit(
              "registerUser",
              "Kayıt Bilgilerinizi Kontrol ediniz"
            );
          }
        })
        .catch(() => {
          context.commit("registerUser", "Kayıt Bilgilerinizi Kontrol ediniz");
        });
    },
    userData(context) {
      if (localStorage.getItem("token")) {
        axios
          .get("http://localhost:3000/info", {
            headers: {
              token: localStorage.getItem("token")
            }
          })
          .then(response => {
            if (response.data[0].statusText == "OK") {
              context.commit("userData", response.data[0]);
            } else {
              context.commit("userData", []);
            }
          })
          .catch(() => {
            context.commit("userData", []);
          });
      }
    }
  },
  getters: {
    getLoginStatus(state) {
      return state.loginStatus;
    },
    getUserData(state) {
      return state.userData;
    },
    getRegisterStatus(state) {
      return state.registerStatus;
    }
  }
});
