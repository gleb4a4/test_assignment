import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "../router";
import posts from "./Modules/posts";
import { ToastProgrammatic as Toast } from "buefy";
axios.defaults.headers.post["Content-Type"] = "application/json";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "",
    isAuth: false,
    role: ""
  },
  getters: {
    isAuthenticated(state) {
      return state.isAuth;
    }
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload.accessToken;
    },
    setAuth(state) {
      state.isAuth = true;
    },
    setRole(state, payload) {
      state.role = payload;
    },
    logout(state) {
      localStorage.removeItem("role");
      state.role = "";
      state.isAuth = false;
      this.currentPage = 1;
    }
  },
  actions: {
    signIn({ commit }, payload) {
      axios
        .get(`http://localhost:3000/users?login=${payload.email}`)
        .then(response => {
          const password = response.data[0]["password"];
          if (password === payload.password) {
            commit("setAuth");
            commit("setRole", response.data[0]["role"]);
            localStorage.setItem("role", response.data[0]["role"]);
            router.push("/");
          } else {
            Toast.open({
              message: "Неправильный логин / пароль",
              type: "is-danger"
            });
          }
        })
        .catch(() => {
          Toast.open("Неправильный логин / пароль");
        });
    },

    refreshRole({ commit }) {
      const refresh = localStorage.getItem("role");
      commit("setRole", refresh);
      commit("setAuth");
    }
  },
  modules: {
    posts
  }
});
