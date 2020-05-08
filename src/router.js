import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import Account from "./views/Account.vue";
import list from "@/list";
Vue.use(Router);

const router = new Router({
  mode: "history",
  linkExactActiveClass: "vue-school-active-class",
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      const position = {};
      if (to.hash) {
        position.selector = to.hash;
        if (to.hash === "#experience") {
          position.offset = { y: 140 };
        }
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
      path: "/movie/:imdb_id",
      name: "movieDetails",
      props: true,
      component: () =>
        import(/* webpackChunkName: "movieDetails"*/ "./views/MovieDetails"),
      beforeEnter: (to, from, next) => {
        const exists = list.movies.find(
          movie => movie.imdb_id === to.params.imdb_id
        );
        if (exists) {
          next();
        } else {
          next({ name: "notFound" });
        }
      }
    },
    {
      path: "/stream/:imdb_id",
      name: "movieStream",
      props: true,
      component: () =>
        import(/* webpackChunkName: "movieDetails"*/ "./views/MovieStream"),
      beforeEnter: (to, from, next) => {
        const exists = list.movies.find(
          movie => movie.imdb_id === to.params.imdb_id
        );
        if (exists) {
          next();
        } else {
          next({ name: "notFound" });
        }
      }
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
