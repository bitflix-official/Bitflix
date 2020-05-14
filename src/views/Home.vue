<template>
  <div class="home">
    <header class="container-fluid header-wrapper">
      <div class="container header">
        <div class="row">
          <div class="col-sm-6 current-movies">
            <h2>Movies</h2>
          </div>
          <div class="col-sm-6">
            <div class="profile-menu">
              <div class="dropdown">
                <button class="btn dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img class="menu-pic" :src="'/assets/' + this.avatar + '.png'"> Hi, {{name}}</button>
                <div class="dropdown-menu dropdown-profile dropdown-menu-right" aria-labelledby="dropdownMenu2">
                  <router-link :to="{ name: 'account', params: {} }">
                    <button class="btn dropdown-item profile-item" type="button">Profile</button>
                  </router-link>
                  <a href="https://twitter.com/bitflixapp" target="_blank">
                    <button class="btn dropdown-item profile-item" type="button"><i class="fa fa-twitter twitter-support"></i> Support</button>
                  </a>
                  <router-link :to="{ name: 'about', params: {} }">
                    <button class="btn dropdown-item profile-item" type="button">About</button>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    <div id="menu" class="container-fluid header-sticky sticky-top">
      <div class="container">
        <div class="row main-navbar">
          <div class="col-sm-12 col-md-6">
            <div id="btn-container">
              <div class="dropdown">
                <button class="filter btn-secondary dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Order by: <p id="currentFilter" class="current"></p></button>
                <div class="dropdown-menu filter-dropdown" aria-labelledby="dropdownMenuButton">
                  <button class="filter filter-active" @click="sortByTrending" id="sortByTrending">Trending</button>
                  <button class="filter filter-active" @click="sortByPopularity" id="sortByPopularity">Popularity</button>
                  <button class="filter" @click="sortByYear" id="sortByYear">Year</button>
                  <button class="filter" @click="sortByRate" id="sortByRate">Rating</button>
                </div>
              </div>
              <div class="dropdown">
                <button class="filter btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Genre: <p id="current">All</p></button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                  <button class="btn btn-primary genre" onclick="filterSelection('all')">
                    All
                  </button>
                  <button class="genre btn" v-for="(genre, index) of genres" :key="index" :onclick="'filterSelection(\'' + genre.name + '\')'">{{ genre.name }}</button>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-md-6">
            <div class="searchContainer">
              <input id="search" type="text" placeholder="Search movies.." autocomplete="off" /><i id="searchIcon" class="fas fa-search"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <MovieList />
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import list from "@/list.js";
import MovieList from "@/components/MovieList";
import Footer from "@/components/Footer";
export default {
  name: "home",
  components: {
    MovieList,
    Footer
  },
  data() {
    return {
      name: 'Stranger',
      avatar: 'cat',
      genres: list.genres,
      movies: list.movies,
    };
  },
  mounted() {
    if(localStorage.name) this.name = localStorage.name;
    if(localStorage.avatar) this.avatar = localStorage.avatar;
    this.sortByTrending();
  },
  watch:{
    name(newName) {
      localStorage.name = newName;
    },
    avatar(newAvatar) {
      localStorage.avatar = newAvatar;
    }
  },
  methods: {
    sortByTrending() {
      document.getElementById('currentFilter').innerHTML = "Trending";
      document.getElementById('sortByTrending').classList.add("filter-active");
      document.getElementById('sortByRate').classList.remove("filter-active");
      document.getElementById('sortByYear').classList.remove("filter-active");
      document.getElementById('sortByPopularity').classList.remove("filter-active");
      this.movies = this.movies.sort(function(a, b) { return b.popularity - a.popularity });
    },
    sortByRate() {
      document.getElementById('currentFilter').innerHTML = "Rating";
      document.getElementById('sortByRate').classList.add("filter-active");
      document.getElementById('sortByTrending').classList.remove("filter-active");
      document.getElementById('sortByYear').classList.remove("filter-active");
      document.getElementById('sortByPopularity').classList.remove("filter-active");
      this.movies = this.movies.sort(function(a, b) { return b.vote_average - a.vote_average });
    },
    sortByYear() {
      document.getElementById('currentFilter').innerHTML = "Year";
      document.getElementById('sortByYear').classList.add("filter-active");
      document.getElementById('sortByTrending').classList.remove("filter-active");
      document.getElementById('sortByRate').classList.remove("filter-active");
      document.getElementById('sortByPopularity').classList.remove("filter-active");
      this.movies = this.movies.sort(function(a, b) { return b.release_date - a.release_date });
    },
    sortByPopularity() {
      document.getElementById('currentFilter').innerHTML = "Popularity";
      document.getElementById('sortByPopularity').classList.add("filter-active");
      document.getElementById('sortByTrending').classList.remove("filter-active");
      document.getElementById('sortByRate').classList.remove("filter-active");
      document.getElementById('sortByYear').classList.remove("filter-active");
      this.movies = this.movies.sort(function(a, b) { return b.vote_count - a.vote_count });
    }
  }
};
</script>
