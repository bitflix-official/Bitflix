<template>
  <div class="loading-container text-center">
    <div class="spinner-grow text-primary" role="status"></div>
    <div id="loading-time" class="loading-time">0</div>
    <div class="loading-movie-text">Making some popcorn</div>
    <div id="imdb_id">{{movie.imdb_id}}</div>
    <video id="player" style="width: 0.1px" playsinline autoplay preload="metadata" crossorigin="anonymous" muted>
      <source :src="option1" type="video/mp4">
      <source :src="option2" type="video/mp4">
      <source :src="option3" type="video/mp4">
      <source :src="option4" type="video/mp4">
      <source :src="option5" type="video/mp4">
    </video>
  </div>
</template>
<script>
import list from "@/list";
export default {
  data() {
    return {
      movies: list.movies,
      moviesVotes: {},
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      option5: '',
      option6: '',
    };
  },
  props: {
    imdb_id: {
      type: String,
      required: true
    }
  },
  async mounted() {
    this.option1 = 'https://live-torrent.herokuapp.com/api/torrent/serve/' + this.movie.torrent + '/:video'
    this.option2 = 'https://svflw.herokuapp.com/api/torrent/serve/' + this.movie.torrent + '/:video'
    this.option3 = 'https://nam-bitflix.herokuapp.com/api/torrent/serve/' + this.movie.torrent + '/:video'
    this.option4 = 'https://sv-bitflx.herokuapp.com/api/torrent/serve/' + this.movie.torrent + '/:video'
    this.option5 = 'https://svv-bitflix.herokuapp.com/api/torrent/serve/' + this.movie.torrent + '/:video'
    this.option6 = 'https://server-bitflix.herokuapp.com/api/torrent/serve/' + this.movie.torrent + '/:video'
    let refresh = document.createElement("meta");
    refresh.setAttribute("http-equiv", "refresh");
    refresh.setAttribute("content", "20; url=/stream/" + this.imdb_id);
    document.head.appendChild(refresh);
    let timer = document.createElement("script");
    timer.setAttribute("src", "/js/timer.js");
    document.body.appendChild(timer);
  },
  computed: {
    movie() {
      return list.movies.find(movie => movie.imdb_id === this.imdb_id);
    }
  }
};
</script>
<style media="screen">
  #imdb_id {
    display: none;
  }
  .loading-container {
    width: 20rem;
    height: max-content;
    position:absolute;
    left:0;
    right:0;
    top:0;
    bottom:0;
    margin:auto;
    max-width:100%;
    max-height:100%;
    overflow:auto;
  }
  .loading-time {
    margin-top: 2rem;
    font-size: 1.5rem;
  }
  .loading-movie-text {
    margin-top: 1rem;
    margin-bottom: 0.6rem;
    width: 20rem;
    text-align: center;
    font-size: 1.1rem;
    color: var(--grey);
  }
  .loading-movie-text:after {
    content: ' .';
    animation: dots 1s steps(5, end) infinite;
  }
  @keyframes dots {
    0%, 20% {
      color: var(--grey);
      text-shadow:
      .25em 0 0 rgba(0,0,0,0),
      .5em 0 0 rgba(0,0,0,0);
    }
    40% {
      color: var(--grey);
      text-shadow:
        .25em 0 0 rgba(0,0,0,0),
        .5em 0 0 rgba(0,0,0,0);}
    60% {
      text-shadow:
      .25em 0 0 white,
      .5em 0 0 rgba(0,0,0,0);
    }
    80%, 100% {
      text-shadow:
      .25em 0 0 white,
      .5em 0 0 white;
    }
  }
</style>
