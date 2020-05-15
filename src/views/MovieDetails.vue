<template>
  <div>
    <div class="video-background">
      <div class="video-foreground">
        <iframe :src="'https://www.youtube.com/embed/' + movie.trailer + '?controls=0&showinfo=0&rel=0&autoplay=1&mute=1&loop=1&playlist=' + movie.trailer" frameborder="0" allowfullscreen></iframe>
      </div>
    </div>
    <div class="top">
      <div class="container">
        <div class="row">
          <div class="col-6">
            <GoBack />
          </div>
          <div class="col-6">
            <div class="favorites-container">
              <a @click="setVote(movie.id)" class="btn" :class="moviesVotes[movie.id] ? 'unfavorite' : 'favorite'" data-toggle="tooltip" data-placement="bottom" title="Favorites"><i class="fa fa-heart"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="movie-details">
      <div class="container">
        <div class="row details-container">
          <div class="col-sm-12 col-md-4">
            <div class="poster-container">
              <div class="details-poster" :style="'background-image: url(https://image.tmdb.org/t/p/w600_and_h900_bestv2' + movie.poster_path + ')'"></div>
            </div>
          </div>
          <div class="col-sm-12 col-md-8">
            <div class="info-container">
              <h2>{{movie.title}}</h2>
              <p class="tagline">{{movie.tagline}}</p>
              <p class="details-info"><i class="fas fa-star"></i>{{movie.vote_average}}/10</p>
              <p class="details-info"><i class="fas fa-circle separator"></i></p>
              <p class="details-info">{{movie.release_date}}</p>
              <p class="details-info"><i class="fas fa-circle separator"></i></p>
              <p class="details-info">{{movie.runtime}} mins</p>
              <p class="details-info"><i class="fas fa-circle separator"></i></p>
              <p class="details-info">{{movie.genres}}</p>
              <p class="overview">{{movie.overview}}</p>
            </div>
            <div class="streaming-container">
              <router-link v-if="option1 || option2 || option3 || option4" :to="{ name: 'movieStream', params: { imdb_id: movie.imdb_id } }">
                <button class="btn btn-primary watch-button"><i class="fas fa-play"></i>Watch now</button>
              </router-link>
              <a class="btn btn-outline-secondary watch-button" :href="option4"><i class="fas fa-download"></i>Download</a>
            </div>
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
  name: "movieDetails",
  components: {
    GoBack,
    Footer
  },
  data() {
    return {
      movies: list.movies,
      moviesVotes: {},
      option1: '',
      option2: '',
      option3: '',
      option4: '',
    };
  },
  props: {
    imdb_id: {
      type: String,
      required: true
    }
  },
  mounted() {
    this.setVotesFromPersistence();
    this.option1 = 'https://server-bitflix.herokuapp.com/api/torrent/serve/' + this.movie.torrent + '/:video'
    this.option2 = 'https://nam-bitflix.herokuapp.com/api/torrent/serve/' + this.movie.torrent + '/:video'
    this.option3 = 'https://sv-bitflix.herokuapp.com/api/torrent/serve/' + this.movie.torrent + '/:video'
    this.option4 = 'https://svv-bitflix.herokuapp.com/api/torrent/serve/' + this.movie.torrent + '/:video'
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
