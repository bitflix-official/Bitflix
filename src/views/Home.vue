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
                    <button class="filter filter-active" id="sortByPopularity">{{ $t("content.popularity") }}</button>
                    <li class="dropdown-submenu"><a class="btn filter btn-secondary dropdown-item dropdown-toggle btn-group dropright" href="#">{{ $t("content.genre") }}</a>
                      <ul class="dropdown-menu">
                        <button class="btn btn-primary genre" onclick="filterSelection('all')">
                          {{ $t("content.all") }}
                        </button>
                        <button class="genre btn"></button>
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
                <button class="filter btn-secondary dropdown-toggle filter-container-button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  {{ $t("content.order") }} 
                  <p v-if="$route.query.sort_by==='popularity.desc'" class="current">{{$t('content.popularity')}}</p>
                  <p v-if="$route.query.sort_by==='primary_release_date.desc'" class="current">{{$t('content.year')}}</p>
                  <p v-if="$route.query.sort_by==='vote_average.desc'" class="current">{{$t('content.rate')}}</p>
                </button>
                <div class="dropdown-menu filter-dropdown" aria-labelledby="dropdownMenuButton">
                  <a :href="$router.resolve({name: 'home', query: { sort_by: 'popularity.desc', with_genres: this.$route.query.with_genres} }).href">
                    <button v-if="$route.query.sort_by==='popularity.desc'" class="btn genre-link active">{{$t('content.popularity')}}</button>
                    <button v-else class="btn genre-link">{{$t('content.popularity')}}</button>
                  </a>
                  <a :href="$router.resolve({name: 'home', query: { sort_by: 'primary_release_date.desc', with_genres: this.$route.query.with_genres} }).href">
                    <button v-if="$route.query.sort_by==='primary_release_date.desc'" class="btn genre-link active">{{$t('content.year')}}</button>
                    <button v-else class="btn genre-link">{{$t('content.year')}}</button>
                  </a>
                  <a :href="$router.resolve({name: 'home', query: { sort_by: 'vote_average.desc', with_genres: this.$route.query.with_genres} }).href">
                    <button v-if="$route.query.sort_by==='vote_average.desc'" class="btn genre-link active">{{$t('content.rate')}}</button>
                    <button v-else class="btn genre-link">{{$t('content.rate')}}</button>
                  </a>
                </div>
              </div>
              <div class="dropdown">
                <button class="filter genre btn-secondary dropdown-toggle filter-container-button" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  {{ $t("content.genre") }}
                  <p v-if="$route.query.with_genres===''||$route.query.with_genres===undefined" class="current">{{$t('content.all')}}</p>
                  <p v-else id="current" class="current"></p>
                </button>
                <div class="dropdown-menu genres-dropdown" aria-labelledby="dropdownMenu2">
                  <a v-if="$route.query.with_genres===''||$route.query.with_genres===undefined" class="btn genre-link active" :href="$router.resolve({ query: { sort_by: $route.query.sort_by, with_genres: '' }}).href">
                    <button class="btn genre-link" @click="select($event)">{{$t('content.all')}}</button>
                  </a>
                  <a v-else class="btn genre-link" :href="$router.resolve({ query: { sort_by: $route.query.sort_by, with_genres: '' }}).href">
                    <button class="btn genre-link" @click="select($event)">{{$t('content.all')}}</button>
                  </a>
                  <a v-for="genre in genres" :key="genre.id" :id="genre.id" class="btn genre-link" :href="$router.resolve({ query: { sort_by: $route.query.sort_by, with_genres: genre.id} }).href">
                    <button class="btn genre-link">{{genre.name}}</button>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-md-6">
            <div class="col-sm-12 col-md-8 searchContainer">
              <input id="search" @keyup.enter="search($event)" @focus="activeSearch()" @blur="quitSearch()" type="text" :placeholder="$t('content.search')" autocomplete="off" /><i id="searchIcon" class="fas fa-search"></i>
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
      langs: ['Español', 'English'],
      genres: '',
      genreSelected: this.$route.query.with_genres
    };
  },
  mounted() {
    if(localStorage.name) this.name = localStorage.name;
    if(localStorage.avatar) this.avatar = localStorage.avatar;
    if (this.$route.fullPath == '/') {
      window.location.replace('/?sort_by=popularity.desc')
    }
    const getGenres = () => new Promise((resolve, reject)=> {
      const APIKey = '8352f04eb7024b5a4dd28b1f096b629b';
      let language = this.$i18n.locale;
      const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${APIKey}&language=${language}`;
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(Error(xhr.statusText));
        }
      }
      xhr.send();
    });
    getGenres().then(result => this.genres = result.genres);
    setTimeout(()=> {
      this.genres.forEach((el)=> {
        if (el.id == this.genreSelected) {
          this.genreSelected = el;
          let button = document.getElementById('current');
          button.innerHTML = this.genreSelected.name;
          let active = document.getElementById(this.genreSelected.id)
          active.classList.add('active');
        }
      })
    });
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
    search: (e) => {
      window.location.href = `/search?query=${e.target.value}`
    },
    activeSearch() {
      let searchIcon = document.querySelector('#searchIcon');
      searchIcon.style.color = 'var(--blue)';
    },
    quitSearch() {
      let searchIcon = document.querySelector('#searchIcon');
      searchIcon.style.color = '#585858';
    }
  }
};
</script>
<style>
  .filter-dropdown {
    transform: initial;
    width: 210px;
    height: 550px;
    overflow-y: scroll;
  }
  .dropdown-menu {
    top: 10px;
    border-radius: 5px;
    -webkit-box-shadow: 0px 0px 8px 5px #06060666;
    -moz-box-shadow: 0px 0px 8px 5px #06060666;
    box-shadow: 0px 0px 8px 5px #06060666;
    background: #080808fc;
  }
  .genres-dropdown {
    transform: initial;
    width: 210px;
    height: 550px;
    overflow-y: scroll;
  }
  .filter {
    width: 100%;
    text-align: left;
    padding-left: 0;
    padding-right: 0;
    margin-left: -15px;
    margin-right: -15px;
  }
  .filter-container-button {
    width: 115%;
    padding-left: 15px;
    padding-right: 15px;
  }
  .genre {
    margin-left: 25px;
  }
  .genre-link {
    width: 100%;
    text-align: left;
    padding-left: 15px;
    padding-right: 0;
    margin-left: 0;
    margin-right: 0;
  }
  .active {
    background-color: var(--blue);
    border-radius: 0px;
  }
</style>
