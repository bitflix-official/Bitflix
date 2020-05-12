<template>
  <div>
    <div class="background-movie" :style="'background-image: url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/' + movie.backdrop_path + ')'"></div>
    <div class="movie-streaming-container">
      <div class="top">
        <div class="container">
          <div class="row">
            <div class="col-6">
              <GoBack />
            </div>
            <div class="col-6">
              <div class="favorites-container">
                <a id="downloadButton" class="btn btn-primary" :href="'https://server-bitflix.herokuapp.com/api/torrent/serve/' + movie.torrent + '/:video'" data-toggle="tooltip" data-placement="bottom" title="Download movie"><i class="fas fa-download"></i> Download movie</a>
                <a @click="setVote(movie.id)" class="btn" :class="moviesVotes[movie.id] ? 'unfavorite' : 'favorite'" data-toggle="tooltip" data-placement="bottom" title="Favorites"><i class="fa fa-heart"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
        <div class="container">
          <div class="playerContainer text-center">
            <h4 class="movie-info-title">Watching: {{movie.title}}</h4>
            <vue-plyr class="player" style="--plyr-color-main: var(--blue)!important; --plyr-captions-background: transparent!important;">
              <video id="player" playsinline autoplay preload="metadata" controls :data-poster="'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/' + movie.backdrop_path" crossorigin="anonymous">
                <source :src="'https://sv-bitflx.herokuapp.com/api/torrent/serve/' + movie.torrent + '/:video'">
                <source :src="'https://server-bitflix.herokuapp.com/api/torrent/serve/' + movie.torrent + '/:video'">
                <source :src="'https://sv-bitflix.herokuapp.com/api/torrent/serve/' + movie.torrent + '/:video'">
                <source :src="'https://nm-bitflix.herokuapp.com//api/torrent/serve/' + movie.torrent + '/:video'">
                <track kind="subtitles" :src="movie.es" srclang="es" label="Español" default>
                <track kind="subtitles" :src="movie.en" srclang="en" label="English">
                <track kind="subtitles" :src="movie.fr" srclang="fr" label="Français">
                <track kind="subtitles" :src="movie.br" srclang="br" label="Brazilian Portuguese">
                <track kind="subtitles" :src="movie.ita" srclang="ita" label="Italiano">
              </video>
            </vue-plyr>
            <div class="share-buttons text-center">
              <div class="mobile-download">
                <a id="downloadButtonMobile" class="btn btn-primary" :href="'https://sv-bitflx.herokuapp.com/api/torrent/serve/' + movie.torrent + '/:video'" data-toggle="tooltip" data-placement="bottom" title="Download movie"><i class="fas fa-download"></i> Download movie</a>
              </div>
              <a class="btn twitter-share-button" :href="'https://twitter.com/intent/tweet?text=Hey!%20I\'m%20watching%20' + movie.title + '%20on%20Bitflix.%20' + 'https://bitflix.now.sh/' + 'movie/' + movie.imdb_id" target="_blank" data-size="large"><i class="fab fa-twitter"></i> Share on Twitter</a>
              <a class="btn whatsapp-share-button" :href="'https://wa.me/?text=Hey!%20I\'m%20watching%20' + movie.title + '%20on%20Bitflix.%20' + 'https://bitflix.now.sh/' + 'movie/' + movie.imdb_id" target="_blank" data-size="large"><i class="fab fa-whatsapp"></i> Share on WhatsApp</a>
            </div>
          </div>
        </div>
      </div>
    <Footer />
  </div>
</template>
<script>
import list from "@/list";
import GoBack from "@/components/GoBack";
import Footer from "@/components/Footer";
export default {
  components: {
    GoBack,
    Footer
  },
  data() {
    return {
      movies: list.movies,
      moviesVotes: {}
    };
  },
  props: {
    imdb_id: {
      type: String,
      required: true
    }
  },
  mounted() {
    let appScript = document.createElement("script");
    appScript.setAttribute("src", "/js/script.js");
    document.head.appendChild(appScript);
    this.setVotesFromPersistence();
  },
  methods: {
  /**
   * set vote on persistence(localStorage) if not exists and
   * update the object moviesClass with the current vote
   *
   * @param {string} movieId
   */
    setVote(movieId) {
      if (localStorage.getItem(movieId)) {
        localStorage.removeItem(movieId);
        this.moviesVotes[movieId] = null;
      } else {
        localStorage.setItem(movieId, true);
        this.moviesVotes[movieId] = true;
      }
    },
    setVotesFromPersistence() {
      this.moviesVotes = this.movies.reduce((acc, item) => {
        acc[item.id] = localStorage.getItem(item.id);
        return acc;
      }, {});
    }
  },
  computed: {
    movie() {
      return list.movies.find(movie => movie.imdb_id === this.imdb_id);
    }
  }
};
</script>
<style>
.plyr__captions .plyr__caption {
  background: transparent!important;
  text-shadow: 0 0 5px black!important;
}
.plyr__menu__container {
  background-color: var(--bg)!important;
}
.plyr--full-ui input[type=range] {
  color: var(--blue)!important;
}
.plyr__control--overlaid {
  background: var(--blue)!important;
}
.plyr--video .plyr__control.plyr__tab-focus, .plyr--video .plyr__control:hover, .plyr--video .plyr__control[aria-expanded=true] {
  background: var(--blue)!important;
}
</style>
