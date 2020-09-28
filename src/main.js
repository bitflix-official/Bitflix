import Vue from "vue";
import VuePlyr from "vue-plyr";
import App from "./App.vue";
import VueI18n from 'vue-i18n'
import router from "./router";
Vue.config.productionTip = false;
Vue.use(VueI18n);

const messages = {
  en: {
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
      nuzze: 'by Nuzze',
      back: 'Back',
      editProfile: 'Edit profile',
      nice: 'Nice',
      favorites: 'Favorites',
      favoritesMarked: 'Movies marked as favorites',
      watch: 'Watch now',
      trailer: 'Trailer',
      offline: 'Download',
      subtitles: 'Subtitles for',
      watching: 'Watching',
      share: 'Share on',
      selectquality: 'Please select a quality for',
      option: 'Caption in',
      es: 'Spanish',
      language: 'Language: ',
      details: 'Details',
      trailerimages: 'Trailer and images',
      maincast: 'Main actors',
      reviews: 'Reviews',
      recommendations: 'Recommendations',
      based: 'Based on',
      reviewsObtained: 'Reviews obtained from TMDb',
      offerBy: 'Offer by:',
      fullReview: 'Read full review',
      resultsFor: 'Results for: ',
      resultsSuggestion: 'If you have not found what you were looking for, you can try it again',
      resultsNotFound: `Ups! We couldn't find anything`,
      notResultsSuggestion: 'We suggest you to try it again'
    }
  },
  es: {
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
      nuzze: 'por Nuzze',
      back: 'Atrás',
      editProfile: 'Editar perfil',
      nice: 'Listo',
      favorites: 'Favoritos',
      favoritesMarked: 'Tus películas favoritas',
      watch: 'Ver ahora',
      trailer: 'Trailer',
      offline: 'Descargar',
      subtitles: 'Subtítulos para',
      watching: 'Viendo',
      share: 'Compartir en',
      selectquality: 'Seleccioná la calidad en que querés ver',
      option: 'Subtítulo en',
      es: 'Español',
      language: 'Idioma: ',
      details: 'Detalles',
      trailerimages: 'Trailer e imágenes',
      maincast: 'Actores principales',
      reviews: 'Calificaciones',
      recommendations: 'Recomendaciones',
      based: 'Basadas en',
      reviewsObtained: 'Calificaciones obtenidas desde TMDb',
      offerBy: 'Ofrecida por:',
      fullReview: 'Leer calificación completa',
      resultsFor: 'Resultados para: ',
      resultsSuggestion: 'Si no has encontrado lo que buscabas, puedes realizar una nueva búsqueda',
      resultsNotFound: 'No hemos podido encontrar lo que buscabas',
      notResultsSuggestion: 'Te sugerimos realizar una nueva búsqueda y volver a intentarlo'
    }
  }
}

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'en',
  messages,
  fallbackLocale: 'en',
  silentTranslationWarn: true,
})
i18n.path = (link) => {
  if (i18n.locale === i18n.fallbackLocale) {
    return `/${link}`
  }
 return `/${i18n.locale}/${link}`
}
//app.i18n.locale = 'bn'
i18n.path = (link) => {
  if (i18n.locale === i18n.fallbackLocale) {
    return `/${link}`
  }
 return `/${i18n.locale}/${link}`
}
new Vue({
  i18n,
  router,
  render: h => h(App)
}).
$mount("#app");
Vue.use(VuePlyr, {
  emit: ['ended']
})
