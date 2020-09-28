<template>
  <div>
    <div v-if="streaming && indexsubs">
      <div
        class="background-movie"
        :style="
          'background-image: url(https://image.tmdb.org/t/p/w600_and_h900_bestv2' +
            movie.poster_path +
            ')'
        "
      ></div>
      <div class="movie-streaming-container">
        <div class="top">
          <div class="container">
            <div class="row">
              <div class="col-6">
                <GoBack />
              </div>
              <div class="col-6">
                <div class="favorites-container">
                  <router-link
                    :to="{ name: 'Download', params: { id: movie.id } }"
                  >
                    <button
                      id="downloadButton"
                      class="btn btn-primary"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      :title="$t('content.offline')"
                    >
                      <i class="fas fa-download"></i>
                      {{ $t("content.offline") }}
                    </button>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="$route.query.quality === '720p'" class="container">
          <div class="playerContainer text-center">
            <h4 class="movie-info-title">
              {{ $t("content.watching") }}: {{ movie.title }}
            </h4>
            <vue-plyr
              class="player"
              style="--plyr-color-main: var(--blue)!important; --plyr-captions-background: transparent!important;"
            >
              <video
                autoplay
                preload="metadata"
                controls
                :data-poster="
                  'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/' +
                    movie.backdrop_path
                "
                crossorigin="anonymous"
              >
                <source :src="streaming" type="video/mp4" />
                <track
                  kind="subtitles"
                  v-for="sub in indexsubs"
                  :key="sub.index"
                  :src="
                    'https://bitflix-subs.herokuapp.com/subs/' +
                      imdb_code +
                      '/' +
                      sub.index
                  "
                  :srclang="sub.langShort"
                  :label="sub.langLong"
                />
              </video>
            </vue-plyr>
            <div class="share-buttons text-center">
              <div class="mobile-download">
                <a
                  id="downloadButtonMobile"
                  class="btn btn-primary"
                  :href="option4"
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="Download movie"
                  ><i class="fas fa-download"></i> Download movie</a
                >
              </div>
              <a
                class="btn twitter-share-button"
                :href="
                  'https://twitter.com/intent/tweet?text=Hey!%20I\'m%20watching%20' +
                    movie.title +
                    '%20on%20Bitflix.%20' +
                    'https://bitflix.surge.sh/' +
                    'movie/' +
                    movie.id
                "
                target="_blank"
                data-size="large"
                ><i class="fab fa-twitter"></i> Share on Twitter</a
              >
              <a
                class="btn whatsapp-share-button"
                :href="
                  'https://wa.me/?text=Hey!%20I\'m%20watching%20' +
                    movie.title +
                    '%20on%20Bitflix.%20' +
                    'https://bitflix.surge.sh/' +
                    'movie/' +
                    movie.id
                "
                target="_blank"
                data-size="large"
                ><i class="fab fa-whatsapp"></i> Share on WhatsApp</a
              >
            </div>
          </div>
        </div>
        <div v-if="$route.query.quality === '1080p'" class="container">
          <div class="playerContainer text-center">
            <h4 class="movie-info-title">
              {{ $t("content.watching") }}: {{ movie.title }}
            </h4>
            <vue-plyr
              class="player"
              style="--plyr-color-main: var(--blue)!important; --plyr-captions-background: transparent!important;"
            >
              <video
                autoplay
                preload="metadata"
                controls
                :data-poster="
                  'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/' +
                    movie.backdrop_path
                "
                crossorigin="anonymous"
              >
                <source :src="streaming" type="video/mp4" />
                <track
                  kind="subtitles"
                  v-for="sub in indexsubs"
                  :key="sub.index"
                  :src="
                    'https://bitflix-subs.herokuapp.com/subs/' +
                      imdb_code +
                      '/' +
                      sub.index
                  "
                  :srclang="sub.langShort"
                  :label="sub.langLong"
                />
              </video>
            </vue-plyr>
            <div class="share-buttons text-center">
              <div class="mobile-download">
                <a
                  id="downloadButtonMobile"
                  class="btn btn-primary"
                  :href="option4"
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="Download movie"
                  ><i class="fas fa-download"></i> Download movie</a
                >
              </div>
              <a
                class="btn twitter-share-button"
                :href="
                  'https://twitter.com/intent/tweet?text=Hey!%20I\'m%20watching%20' +
                    movie.title +
                    '%20on%20Bitflix.%20' +
                    'https://bitflix.surge.sh/' +
                    'movie/' +
                    movie.id
                "
                target="_blank"
                data-size="large"
                ><i class="fab fa-twitter"></i> Share on Twitter</a
              >
              <a
                class="btn whatsapp-share-button"
                :href="
                  'https://wa.me/?text=Hey!%20I\'m%20watching%20' +
                    movie.title +
                    '%20on%20Bitflix.%20' +
                    'https://bitflix.surge.sh/' +
                    'movie/' +
                    movie.id
                "
                target="_blank"
                data-size="large"
                ><i class="fab fa-whatsapp"></i> Share on WhatsApp</a
              >
            </div>
          </div>
        </div>
        <div
          v-if="
            $route.query.quality != '720p' && $route.query.quality != '1080p'
          "
          class="container"
        >
          <div class="playerContainer text-center">
            <h4 class="movie-info-title">
              {{ $t("content.selectquality") }}: {{ movie.title }}
            </h4>
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
        <h3>Loading</h3>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script>
import GoBack from "@/components/GoBack";
import Footer from "@/components/Footer";
export default {
  components: {
    GoBack,
    Footer
  },
  data() {
    return {
      movie: [],
      genres: "",
      API: process.env.VUE_APP_API_KEY,
      streamUrl: "https://live-torrent.herokuapp.com/api/torrent/serve/",
      torrents: [],
      torrent720: "",
      torrent1080: "",
      streaming: "",
      imdb_code: "",
      allsubs: "",
      indexsubs: ""
    };
  },
  mounted() {
    const getCurrentMovieTMDB = () =>
      new Promise((resolve, reject) => {
        let movieID = this.$route.path.slice(8);
        let language = this.$i18n.locale;
        const url = `https://api.themoviedb.org/3/movie/${movieID}?api_key=${this.API}&language=${language}`;
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
      getCurrentMovieYTS().then(result => getFinalTorrents(result));
      const getFinalTorrents = result => {
        this.torrents = result[0].torrents;
        this.torrents.forEach(el => {
          if (el.quality == "720p" && el.type == "web") {
            this.torrent720 = `${el.hash}`;
          } else if (el.quality == "720p" && el.type == "bluray") {
            this.torrent720 = `${el.hash}`;
          }
        });
        this.torrents.forEach(el => {
          if (el.quality == "1080p" && el.type == "web") {
            this.torrent1080 = `${el.hash}`;
          } else if (el.quality == "1080p" && el.type == "bluray") {
            this.torrent1080 = `${el.hash}`;
          }
        });
      };
      setTimeout(() => {
        console.log(this.$route.query.quality);
        if (this.$route.query.quality === "720p") {
          fetch("https://palomitas-dl.fuken.xyz/torrents/", {
            method: "POST",
            body: JSON.stringify({
              link: `${this.torrent720}`
            }),
            headers: {
              "Content-type": "application/json"
            }
          })
            .then(response => response.json())
            .then(json => (this.torrent720 = json.infoHash));
          setTimeout(() => {
            const getStreaming = () =>
              new Promise((resolve, reject) => {
                const url = `https://palomitas-dl.fuken.xyz/torrents/${this.torrent720}`;
                const xhr = new XMLHttpRequest();
                xhr.open("GET", url, true);
                xhr.onload = () => {
                  if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText).files);
                  } else {
                    reject(Error(xhr.statusText));
                  }
                };
                xhr.send();
              });
            getStreaming().then(result => streaming(result));
            const streaming = result => {
              result.forEach(el => {
                if (el.mime == "video/mp4") {
                  this.streaming = `https://palomitas-dl.fuken.xyz${el.link}`;
                }
              });
            };
          }, 10000);
        } else if (this.$route.query.quality === "1080p") {
          fetch("https://palomitas-dl.fuken.xyz/torrents/", {
            method: "POST",
            body: JSON.stringify({
              link: `${this.torrent1080}`
            }),
            headers: {
              "Content-type": "application/json"
            }
          })
            .then(response => response.json())
            .then(json => (this.torrent1080 = json.infoHash));
          setTimeout(() => {
            const getStreaming = () =>
              new Promise((resolve, reject) => {
                const url = `https://palomitas-dl.fuken.xyz/torrents/${this.torrent1080}`;
                const xhr = new XMLHttpRequest();
                xhr.open("GET", url, true);
                xhr.onload = () => {
                  if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText).files);
                  } else {
                    reject(Error(xhr.statusText));
                  }
                };
                xhr.send();
              });
            getStreaming().then(result => streaming(result));
            const streaming = result => {
              result.forEach(el => {
                if (el.mime == "video/mp4") {
                  this.streaming = `https://palomitas-dl.fuken.xyz${el.link}`;
                }
              });
            };
          }, 10000);
        }
      }, 15000);
      const getAllSubtitles = () =>
        new Promise((resolve, reject) => {
          const url = `https://bitflix-subs.herokuapp.com/subs/${this.imdb_code}`;
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
      getAllSubtitles().then(result => getFinalSubtitles(result));
      const getFinalSubtitles = result => {
        this.allsubs = result;
        this.allsubs.forEach(el => {
          if (el.langShort === this.$i18n.locale) {
            this.indexsubs = el.subs;
          }
        });
      };
    }, 30000);
  }
};
</script>
<style>
.plyr__captions .plyr__caption {
  background: transparent !important;
  text-shadow: 0 0 5px black !important;
}
.plyr__menu__container {
  background-color: var(--bg) !important;
}
.plyr--full-ui input[type="range"] {
  color: var(--blue) !important;
}
.plyr__control--overlaid {
  background: var(--blue) !important;
}
.plyr--video .plyr__control.plyr__tab-focus,
.plyr--video .plyr__control:hover,
.plyr--video .plyr__control[aria-expanded="true"] {
  background: var(--blue) !important;
}
.plyr__menu__container
  .plyr__control[role="menuitemradio"][aria-checked="true"]::before {
  background: var(--blue) !important;
}
.plyr__menu__container [role="menu"] {
  max-height: 21rem !important;
  overflow-y: scroll !important;
}
@media only screen and (max-width: 768px) {
  .plyr__menu__container [role="menu"] {
    max-height: 15rem !important;
    overflow-y: scroll !important;
  }
}
</style>
