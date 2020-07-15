import Vue from "vue";
import VuePlyr from "vue-plyr";
import App from "./App.vue";
import VueI18n from 'vue-i18n'
import router from "./router";

Vue.config.productionTip = false;
Vue.use(VueI18n);
const messages = {
  English: {
    content: {
      title: 'Movies',
      hello: 'Hi',
      profile: 'Profile',
      support: 'Support',
      about: 'About',
      order: 'Order by:',
      trending: 'Trending',
      popularity: 'Popularity',
      year: 'Year',
      rate: 'Rate',
      genre: 'Genre:',
      all: 'All',
      search: 'Search movies...',
      made: 'Made with',
      ba: 'in BA',
      back: 'Back',
      editProfile: 'Edit profile',
      nice: 'Nice',
      favorites: 'Favorites',
      favoritesMarked: 'Movies marked as favorites',
      watch: 'Watch now',
      offline: 'Offline',
      subtitles: 'Subtitles for',
      watching: 'Watching',
      share: 'Share on'
    }
  },
  Español: {
    content: {
      title: 'Películas',
      hello: 'Hola',
      profile: 'Perfil',
      support: 'Soporte',
      about: 'Nosotros',
      order: 'Ordenar por:',
      trending: 'Tendencias',
      popularity: 'Popularidad',
      year: 'Año',
      rate: 'Valoración',
      genre: 'Género:',
      all: 'Todos',
      search: 'Buscar películas...',
      made: 'Hecho con',
      ba: 'en BA',
      back: 'Atrás',
      editProfile: 'Editar perfil',
      nice: 'Listo',
      favorites: 'Favoritos',
      favoritesMarked: 'Tus películas favoritas',
      watch: 'Ver ahora',
      offline: 'Sin conexión',
      subtitles: 'Subtítulos para',
      watching: 'Viendo',
      share: 'Compartir en'
    }
  }
}

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'Español',
  messages,
})
new Vue({
  i18n,
  router,
  render: h => h(App)
}).$mount("#app");
Vue.use(VuePlyr, {
  emit: ['ended']
})
