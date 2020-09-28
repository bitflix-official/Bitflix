<template>
  <div>
    <div id="menu" class="container-fluid header-sticky sticky-top">
      <div class="container">
        <div class="row main-navbar">
          <div class="col-sm-12 col-md-6">
            <GoBack/>
          </div>
        </div>
      </div>
    </div>
    <div v-if="movies.length==0" class="container results">
      <h3 class="results-for">{{$t('content.resultsNotFound')}}</h3>
      <p class="user-suggestion">{{$t('content.notResultsSuggestion')}}</p>
      <div class="col-sm-12 col-md-6 searchContainer search-suggestion">
        <input id="search" @keyup.enter="search($event)" type="text" :placeholder="$t('content.search')" autocomplete="off" /><i id="searchIcon" class="fas fa-search"></i>
      </div>
    </div>
    <div v-else class="container movies">
      <div class="results">
        <h3 class="results-for">{{$t('content.resultsFor')}}</h3>
        <h3 class="user-search"> "{{userSearch}}"</h3>
        <p class="user-suggestion">{{$t('content.resultsSuggestion')}}</p>
        <div class="col-sm-12 col-md-6 searchContainer search-suggestion">
          <input id="search" @keyup.enter="search($event)" type="text" :placeholder="$t('content.search')" autocomplete="off" /><i id="searchIcon" class="fas fa-search"></i>
        </div>
      </div>
      <ul id="search-ul" class="movie-list">
        <li :id="movie.id" v-for="movie in movies" class="movie-item" :key="movie.id">
          <router-link :to="{ name: 'movieDetails', params: { id: movie.id } }" class="item-poster">
            <img v-if="movie.poster_path!=null" class="poster" :src="'https://image.tmdb.org/t/p/w600_and_h900_bestv2' + movie.poster_path" :alt="movie.title" />
            <img v-else class="poster" src="/assets/poster.png" :alt="movie.title" />
            <div class="rate-item">
              <p class="rate-item-text"><i class="fa fa-star"></i> {{movie.vote_average}}</p>
            </div>
          </router-link>
          <h2 class="movie-title" data-toggle="tooltip" data-placement="bottom" :title="movie.title" >{{ movie.title }}</h2>
          <p class="year">{{ movie.release_date }}</p>
        </li>
      </ul>
    </div>
    <Footer />
  </div>
</template>
<script>
import GoBack from "@/components/GoBack";
import Footer from "@/components/Footer";
export default {
  name: 'search',
  components: {
    GoBack,
    Footer
  },
  data() {
    return {
      movies: '',
      page: '',
      name: 'Stranger',
      avatar: 'cat',
      langs: ['Español', 'English'],
      userSearch: this.$route.query.query
    }
  },
  mounted() {
    if(localStorage.name) this.name = localStorage.name;
    if(localStorage.avatar) this.avatar = localStorage.avatar;
    const getMovies = () => new Promise((resolve, reject)=> {
      const APIKey = '8352f04eb7024b5a4dd28b1f096b629b';
      let language = this.$i18n.locale;
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${APIKey}&language=${language}&query=${this.userSearch}&page=${this.page}&include_adult=false`;
      console.log(url);
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText).results);
        } else {
          reject(Error(xhr.statusText));
        }
      }
      xhr.send();
    });
    this.page = 1;
    getMovies(this.userSearch, this.page).then(result => this.movies = result);
    let newPage;
    window.onscroll = () => {
      let appBottom = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
      if (appBottom) {
        this.page++;
        getMovies(this.page).then(result => newPage = result);
        setTimeout(()=> {
          newPage.forEach((el)=> {
            this.movies.push(el)
          })
        },500);
      }
    };
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
      window.location.href = `search?query=${e.target.value}`
    },
    goBack() {
      return this.$router.go(-1);
    }
  }
}
</script>
<style media="screen">
.movie-list {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-template-rows: 1fr;
}
.results {
  margin-top: 50px;
  margin-bottom: 30px;
}
.results-for {
  display: inline;
  color: var(--white);
  font-weight: 500;
}
.user-search {
  display: inline;
  color: var(--grey);
  font-weight: 400;
}
.user-suggestion {
  padding-top: 10px;
  color: var(--grey);
  font-weight: 400;
  padding-bottom: 5px;
}
.search-suggestion {
  float: none;
  margin-bottom: 40px;
}
</style>

