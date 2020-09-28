import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Search from "./views/Search.vue";
import About from "./views/About.vue";
import Account from "./views/Account.vue";
Vue.use(Router);

const router = new Router({
  mode: "history",
  linkExactActiveClass: "active",
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      const position = {};
      if (to.hash) {
        position.selector = to.hash;
        if (document.querySelector(to.hash)) {
          return position;
        }

        return false;
      }
    }
  },
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      props: true
    },

    {
      path: "/about",
      name: "about",
      component: About,
      props: true
    },

    {
      path: "/profile",
      name: "account",
      component: Account,
      props: true
    },

    {
      path: "/search",
      name: "search",
      component: Search,
      props: true
    },

    {
      path: "/movie/:id",
      name: "movieDetails",
      props: true,
      component: () =>
        import(/* webpackChunkName: "movieDetails"*/ "./views/MovieDetails")
    },
    {
      path: "/download/:id",
      name: "Download",
      props: true,
      component: () =>
        import(/* webpackChunkName: "movieDetails"*/ "./views/Download")
    },
    {
      path: "/stream/:id",
      name: "movieStream",
      props: true,
      component: () =>
        import(/* webpackChunkName: "movieDetails"*/ "./views/MovieStream")
    },
    {
      path: "/404",
      alias: "*",
      name: "notFound",
      component: () =>
        import(
          /* webpackChunkName: "NotFound" */
          "./views/NotFound"
        )
    }
  ]
});
export default router;
