<template>
  <div class="container movies">
    <div class="loading-movies" v-if="loading">
      <div class="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
    <ul id="search-ul" class="movie-list">
      <li
        v-for="movie in movies"
        :key="movie.id"
        :id="movie.id"
        class="movie-item"
      >
        <router-link
          :to="{ name: 'movieDetails', params: { id: movie.id } }"
          class="item-poster"
        >
          <img
            v-if="movie.poster_path != null"
            class="poster"
            :src="
              'https://image.tmdb.org/t/p/w600_and_h900_bestv2' +
                movie.poster_path
            "
            :alt="movie.title"
          />
          <img
            v-else
            class="poster"
            src="/assets/poster.png"
            :alt="movie.title"
          />
          <div class="rate-item">
            <p class="rate-item-text">
              <i class="fa fa-star"></i> {{ movie.vote_average }}
            </p>
          </div>
        </router-link>
        <h2
          class="movie-title"
          data-toggle="tooltip"
          data-placement="bottom"
          :title="movie.title"
        >
          {{ movie.title }}
        </h2>
        <p class="year">{{ movie.release_date }}</p>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      movies: [],
      page: "1",
      filter: this.$route.fullPath.split("/?").join(""),
      loading: true,
      API: process.env.VUE_APP_API_KEY
    };
  },
  async mounted() {
    const list = document.querySelector("#search-ul");
    const fetchMovies = async () => {
      this.loading = true;
      const language = this.$i18n.locale;
      const url = `https://api.themoviedb.org/3/discover/movie?api_key=${this.API}&language=${language}&${this.filter}&release_date.lte=2020-03-31&vote_count.gte=80&include_adult=false&include_video=false&page=${this.page}`;
      const data = await fetch(url);
      const results = await data.json();
      results.results.forEach(async el => {
        const movieURL = `https://api.themoviedb.org/3/movie/${el.id}?api_key=${this.API}&language=${language}`;
        const movieData = await fetch(movieURL);
        const movieResults = await movieData.json();
        const torrentURL = `https://yts.mx/api/v2/list_movies.json?query_term=${movieResults.imdb_id}`;
        const torrentData = await fetch(torrentURL);
        const torrentResults = await torrentData.json();
        el = {
          ...el,
          torrents: await torrentResults.data.movies[0].torrents
        };
        this.movies.push(el);
        this.loading = false;
      });
    };
    fetchMovies();
    list.addEventListener("scroll", () => {
      if (Math.ceil(list.scrollTop) + list.clientHeight >= list.scrollHeight) {
        this.page++;
        fetchMovies();
      }
    });
  }
};
</script>
<style scoped>
body {
  overflow: hidden;
}
.movie-list {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-template-rows: 1fr;
}
.loading-movies {
  text-align: center;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}
</style>
