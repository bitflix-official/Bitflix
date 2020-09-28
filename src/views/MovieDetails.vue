<template>
  <div>
    <div v-if="torrents[0]">
      <div v-if="mute == 1" class="video-background">
        <div class="video-foreground">
          <iframe
            :src="
              'https://www.youtube.com/embed/' +
                trailer +
                '?controls=0&showinfo=0&rel=0&autoplay=1&mute=' +
                mute +
                '&loop=1&playlist=' +
                movie.trailer
            "
            frameborder="0"
            allowfullscreen
          ></iframe>
        </div>
      </div>
      <div v-if="mute == 0" class="video-background no-filters">
        <div class="video-foreground">
          <iframe
            :src="
              'https://www.youtube.com/embed/' +
                trailer +
                '?controls=1&showinfo=0&rel=0&autoplay=1&mute=' +
                mute +
                '&loop=1&playlist=' +
                movie.trailer
            "
            frameborder="0"
            allowfullscreen
          ></iframe>
        </div>
      </div>
      <div class="top">
        <div class="container">
          <div class="row">
            <div class="col-6">
              <GoBack v-if="mute == 1" />
              <button v-if="mute == 0" @click="closeTrailer" class="btn back">
                <i class="fas fa-chevron-left"></i> {{ $t("content.back") }}
              </button>
            </div>
            <div class="col-6">
              <div class="offline-container">
                <router-link
                  v-if="mute == 1"
                  :to="{ name: 'Download', params: { id: movie.id } }"
                >
                  <button class="btn btn-outline-secondary watch-button">
                    <i class="fas fa-download download-movie-details"></i
                    >{{ $t("content.offline") }}
                  </button>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="mute == 1" class="movie-details">
        <div class="container">
          <div class="row details-container">
            <div class="col-sm-12">
              <div class="info-container">
                <h1 class="movie-details-title">{{ movie.title }}</h1>
                <p class="tagline">{{ movie.tagline }}</p>
                <p class="details-info">
                  <i class="fas fa-star"></i>{{ movie.vote_average }}/10
                </p>
                <p class="details-info">
                  <i class="fas fa-circle separator"></i>
                </p>
                <p class="details-info">{{ movie.release_date }}</p>
                <p class="details-info">
                  <i class="fas fa-circle separator"></i>
                </p>
                <p class="details-info">{{ movie.runtime }} mins</p>
                <p class="details-info">
                  <i class="fas fa-circle separator"></i>
                </p>
                <p class="details-info" v-for="genre in genres" :key="genre">
                  {{ genre.name }}
                </p>
                <p class="overview">{{ movie.overview }}</p>
                <router-link
                  :to="{
                    name: 'movieStream',
                    params: { id: movie.id },
                    query: { quality: '720p' }
                  }"
                >
                  <button class="btn btn-primary watch-button">
                    <i class="fas fa-play"></i>{{ $t("content.watch") }}
                  </button>
                </router-link>
                <button class="btn watch-button btn-dark" @click="showTrailer">
                  {{ $t("content.trailer") }}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="container-fluid extra-info-container">
          <div class="container extra-info">
            <h2 class="extra-info-title">{{ $t("content.details") }}</h2>
            <div class="extra-info-content">
              <div class="media-carrousel">
                <button
                  class="tab-button tab-active"
                  @click="openTab($event, 'media')"
                >
                  {{ $t("content.trailerimages") }}
                </button>
                <button class="tab-button" @click="openTab($event, 'cast')">
                  {{ $t("content.maincast") }}
                </button>
                <button class="tab-button" @click="openTab($event, 'reviews')">
                  {{ $t("content.reviews") }}
                </button>
              </div>
              <div id="media" class="tab">
                <div class="media-carrousel">
                  <div class="carrousel-item">
                    <iframe
                      v-if="trailer"
                      class="movie-trailer"
                      :src="'https://youtube.com/embed/' + trailer"
                      frameborder="0"
                      allowfullscreen
                    ></iframe>
                  </div>
                  <div
                    v-for="image in images"
                    :key="image"
                    class="carrousel-item"
                  >
                    <a
                      :href="
                        'https://image.tmdb.org/t/p/original/' + image.file_path
                      "
                      target="_blank"
                    >
                      <img
                        class="image-backdrop"
                        :src="
                          'https://image.tmdb.org/t/p/original/' +
                            image.file_path
                        "
                        :alt="movie.id"
                      />
                    </a>
                  </div>
                </div>
              </div>
              <div id="cast" class="tab" style="display:none">
                <div class="media-carrousel">
                  <div v-for="person in cast" :key="person" class="person-item">
                    <img
                      v-if="person.profile_path === null"
                      class="person-image"
                      src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg"
                      :alt="movie.id"
                    />
                    <img
                      v-else
                      class="person-image"
                      :src="
                        'https://image.tmdb.org/t/p/original/' +
                          person.profile_path
                      "
                      :alt="movie.id"
                    />
                    <p class="person-character">{{ person.character }}</p>
                    <p class="person-name">{{ person.name }}</p>
                  </div>
                </div>
              </div>
              <div id="reviews" class="tab" style="display:none">
                <h5 class="reviews-obtained">
                  {{ $t("content.reviewsObtained") }}
                </h5>
                <div class="review" v-for="review in reviews" :key="review.id">
                  <div class="review-container">
                    <div class="review-profile">
                      <img
                        src="/assets/pic.png"
                        class="review-profile-pic"
                        alt="review-profile-pic"
                      />
                      <p class="review-person-name">
                        {{ $t("content.offerBy") }} {{ review.author }}
                      </p>
                    </div>
                    <div class="review-content">{{ review.content }}</div>
                    <div class="full-review">
                      <a
                        :href="review.url"
                        class="read-full-review"
                        target="_blank"
                        >{{ $t("content.fullReview") }}</a
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="container extra-info">
            <h3 class="extra-info-title">
              {{ $t("content.recommendations") }}
            </h3>
            <div class="extra-info-content">
              <span class="based"
                >{{ $t("content.based") }} {{ movie.title }}</span
              >
              <div class="media-carrousel">
                <div
                  class="carrousel-item"
                  v-for="recommendation in recommendations"
                  :key="recommendation.id"
                >
                  <li
                    :id="recommendation.id"
                    class="movie-item movie-item-carrousel"
                    :key="recommendation.id"
                  >
                    <router-link
                      :to="{
                        name: 'movieDetails',
                        params: { id: recommendation.id }
                      }"
                      class="item-poster"
                    >
                      <img
                        class="poster"
                        :src="
                          'https://image.tmdb.org/t/p/w600_and_h900_bestv2' +
                            recommendation.poster_path
                        "
                        :alt="recommendation.title"
                      />
                      <div class="rate-item">
                        <p class="rate-item-text">
                          <i class="fa fa-star"></i>
                          {{ recommendation.vote_average }}
                        </p>
                      </div>
                    </router-link>
                    <h2
                      class="movie-title"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      :title="recommendation.title"
                    >
                      {{ recommendation.title }}
                    </h2>
                    <p class="year">{{ recommendation.release_date }}</p>
                  </li>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="loading">
      <div class="loading-container text-center">
        <div class="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script>
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
      movie: {},
      mute: 1,
      API: process.env.VUE_APP_API_KEY,
      imdb_code: "",
      genres: "",
      torrents: [],
      trailer: "",
      images: "",
      cast: "",
      reviews: "",
      recommendations: ""
    };
  },
  props: {
    id: {
      type: Number,
      required: false
    }
  },
  mounted() {
    const getCurrentMovieTMDB = () =>
      new Promise((resolve, reject) => {
        let movieID = this.$route.path.slice(7);
        let language = this.$i18n.locale;
        const url = `https://api.themoviedb.org/3/movie/${movieID}?api_key=${this.API}&language=${language}`;
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onload = () => {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            reject(Error(xhr.statusText));
            window.location.replace("/404");
          }
        };
        xhr.send();
      });
    const getVideosTMDB = () =>
      new Promise((resolve, reject) => {
        let movieID = this.$route.path.slice(7);
        let language = this.$i18n.locale;
        const url = `https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=${this.API}&language=${language}`;
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onload = () => {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.responseText).results);
          } else {
            reject(Error(xhr.statusText));
          }
        };
        xhr.send();
      });
    const getImagesTMDB = () =>
      new Promise((resolve, reject) => {
        let movieID = this.$route.path.slice(7);
        const url = `https://api.themoviedb.org/3/movie/${movieID}/images?api_key=${this.API}`;
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onload = () => {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            reject(Error(xhr.statusText));
          }
        };
        xhr.send();
      });
    const getCastTMDB = () =>
      new Promise((resolve, reject) => {
        let movieID = this.$route.path.slice(7);
        const url = `https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=${this.API}`;
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onload = () => {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            reject(Error(xhr.statusText));
          }
        };
        xhr.send();
      });
    const getReviewsTMDB = () =>
      new Promise((resolve, reject) => {
        let movieID = this.$route.path.slice(7);
        const url = `https://api.themoviedb.org/3/movie/${movieID}/reviews?api_key=${this.API}&language=en&page=1`;
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onload = () => {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            reject(Error(xhr.statusText));
          }
        };
        xhr.send();
      });
    const getRecommendationsTMDB = () =>
      new Promise((resolve, reject) => {
        let movieID = this.$route.path.slice(7);
        let language = this.$i18n.locale;
        const url = `https://api.themoviedb.org/3/movie/${movieID}/recommendations?api_key=${this.API}&language=${language}`;
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onload = () => {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            reject(Error(xhr.statusText));
          }
        };
        xhr.send();
      });
    getCurrentMovieTMDB().then(result => (this.movie = result));
    getCurrentMovieTMDB().then(result => (this.genres = result.genres));
    getCurrentMovieTMDB().then(result => (this.imdb_code = result.imdb_id));
    getVideosTMDB().then(result => getYoutubeVideo(result));
    const getYoutubeVideo = result => {
      result.forEach(el => {
        if (el.site == "YouTube") {
          this.trailer = el.key;
        }
      });
    };
    getImagesTMDB().then(result => (this.images = result.backdrops));
    getCastTMDB().then(result => (this.cast = result.cast));
    getReviewsTMDB().then(result => (this.reviews = result.results));
    getRecommendationsTMDB().then(
      result => (this.recommendations = result.results)
    );
    setTimeout(() => {
      const getCurrentMovieYTS = () =>
        new Promise((resolve, reject) => {
          const url = `https://yts.mx/api/v2/list_movies.json?query_term=${this.imdb_code}`;
          const xhr = new XMLHttpRequest();
          xhr.open("GET", url, true);
          xhr.onload = () => {
            if (xhr.status === 200) {
              resolve(JSON.parse(xhr.responseText).data.movies);
            } else {
              reject(Error(xhr.statusText));
            }
          };
          xhr.send();
        });
      getCurrentMovieYTS(this.title).then(
        result => (this.torrents = result[0].torrents)
      );
    }, 200);
  },
  methods: {
    openTab: function(evt, tab) {
      var i, x, tablinks;
      x = document.getElementsByClassName("tab");
      for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
      }
      tablinks = document.getElementsByClassName("tab-button");
      for (i = 0; i < x.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(
          " tab-active",
          ""
        );
      }
      document.getElementById(tab).style.display = "block";
      evt.currentTarget.className += " tab-active";
      console.log(evt.currentTarget.className);
    },
    showTrailer: function() {
      this.$router.push({ query: { trailer: this.movie.id } });
      this.mute = 0;
    },
    closeTrailer: function() {
      this.$router.go(-2);
      return (this.mute = 1);
    }
  }
};
</script>
<style>
.movie-item-carrousel {
  display: inline-block;
  margin-right: 10px;
  width: 170px;
}
</style>
