<template>
  <div class="home">
    <header class="container-fluid header-wrapper">
      <div class="container header">
        <div class="row">
          <div class="col-sm-6 current-movies">
            <!-- Mobile menu -->
            <div class="mobile-menu">
              <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                <li class="nav-item dropdown">
                  <a class="nav-link" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="fas fa-bars"></i>
                  </a>
                  <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <button class="filter filter-active" @click="sortByTrending" id="sortByTrending">{{ $t("content.trending") }}</button>
                    <button class="filter" @click="sortByPopularity" id="sortByPopularity">{{ $t("content.popularity") }}</button>
                    <button class="filter" @click="sortByYear" id="sortByYear">{{ $t("content.year") }}</button>
                    <button class="filter" @click="sortByRate" id="sortByRate">{{ $t("content.rate") }}</button>
                    <li class="dropdown-submenu"><a class="btn filter btn-secondary dropdown-item dropdown-toggle btn-group dropright" href="#">{{ $t("content.genre") }}</a>
                      <ul class="dropdown-menu">
                        <button class="btn btn-primary genre" onclick="filterSelection('all')">
                          {{ $t("content.all") }}
                        </button>
                        <button class="genre btn" v-for="(genre, index) of genres" :key="index" :onclick="'filterSelection(\'' + genre.name + '\')'">{{genre.name}}</button>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <h2 class="desktop-title">{{ $t("content.title") }}</h2>
            <h4 id="mobile-title" class="mobile-title">{{ $t("content.title") }}</h4>
          </div>
          <div class="col-sm-6">
            <div class="profile-menu">
              <div class="dropdown">
                <button class="btn dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img class="menu-pic" :src="'/assets/' + this.avatar + '.png'"> <p class="profile-name-home">{{ $t("content.hello") }}, {{name}}</p></button>
                <div class="dropdown-menu dropdown-profile dropdown-menu-right" aria-labelledby="dropdownMenu2">
                  <router-link :to="{ name: 'account', params: {} }">
                    <button class="btn dropdown-item profile-item" type="button">{{ $t("content.profile") }}</button>
                  </router-link>
                  <a href="https://twitter.com/bitflixapp" target="_blank">
                    <button class="btn dropdown-item profile-item" type="button"><i class="fa fa-twitter twitter-support"></i> {{ $t("content.support") }}</button>
                  </a>
                  <router-link :to="{ name: 'about', params: {} }">
                    <button class="btn dropdown-item profile-item" type="button">{{ $t("content.about") }}</button>
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
                <button class="filter btn-secondary dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{ $t("content.order") }} <p id="currentFilter" class="current"></p></button>
                <div class="dropdown-menu filter-dropdown" aria-labelledby="dropdownMenuButton">
                  <button class="filter filter-active" @click="sortByTrending" id="sortByTrending">{{ $t("content.trending") }}</button>
                  <button class="filter" @click="sortByPopularity" id="sortByPopularity">{{ $t("content.popularity") }}</button>
                  <button class="filter" @click="sortByYear" id="sortByYear">{{ $t("content.year") }}</button>
                  <button class="filter" @click="sortByRate" id="sortByRate">{{ $t("content.rate") }}</button>
                </div>
              </div>
              <div class="dropdown">
                <button class="filter btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{ $t("content.genre") }} <p id="current">{{ $t("content.all") }}</p></button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                  <button class="btn btn-primary genre" onclick="filterSelection('all')">
                    {{ $t("content.all") }}
                  </button>
                  <button class="genre btn" v-for="(genre, index) of genres" :key="index" :onclick="'filterSelection(\'' + genre.name + '\')'">{{genre.name}}</button>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-md-6">
            <div class="col-sm-12 col-md-8 searchContainer">
              <input id="search" type="text" :placeholder="$t('content.search')" autocomplete="off" /><i id="searchIcon" class="fas fa-search"></i>
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
  name: 'home',
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
      langs: ['Español', 'English']
    };
  },
  mounted() {
    if(localStorage.name) this.name = localStorage.name;
    if(localStorage.avatar) this.avatar = localStorage.avatar;
    this.sortByTrending();
  },
  watch: {
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
