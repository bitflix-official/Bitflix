<template>
  <div class="container movies">
    <ul id="search-ul" class="movie-list">
      <li :id="movie.imdb_id" v-for="movie in movies" :class="['filterDiv' + ' ', {'favorites show': moviesVotes[movie.id]}, movie.genres]" :key="movie.id">
        <router-link :to="{ name: 'movieDetails', params: { imdb_id: movie.imdb_id } }" class="item-poster">
          <img class="poster" :src="'https://image.tmdb.org/t/p/w600_and_h900_bestv2' + movie.poster_path" :alt="movie.title" />
          <div class="rate-item">
            <p class="rate-item-text"><i class="fa fa-star"></i> {{movie.vote_average}}</p>
          </div>
        </router-link>
        <h2 class="movie-title" data-toggle="tooltip" data-placement="bottom" :title="movie.title" >{{ movie.title }}</h2>
        <p class="year">{{ movie.release_date }}</p>
      </li>
    </ul>
  </div>
</template>
<script>
// @ is an alias to /src
import list from "@/list.js";
export default {
  data() {
    return {
      genres: list.genres,
      movies: list.movies,
      moviesVotes: {}
    };
  },
  mounted() {
    let appScript = document.createElement("script");
    appScript.setAttribute("src", "/js/favorites.js");
    document.head.appendChild(appScript);
    this.setVotesFromPersistence();
  },
  methods: {
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
  }
}
</script>
