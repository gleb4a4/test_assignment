/* eslint-disable */
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/signin",
    name: "signin",
    component: () =>
      import(/* webpackChunkName: "signin" */ "../views/Auth.vue")
  },
  {
    path: "/addpost",
    name: "addpost",
    component: () =>
    import(/* webpackChunkName: "addpost" */ "../views/AddPost.vue")
  },
  {
    path: "/changepost",
    name: "changepost",
    component: () =>
    import(/* webpackChunkName: "сhangepost" */ "../views/ChangePost.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
