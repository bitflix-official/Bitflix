<template>
  <div>
    <div class="background-movie" :style="'background-image: url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/' + movie.backdrop_path + ')'"></div>
    <div class="movie-streaming-container">
      <div class="top">
        <div class="container">
          <div class="row">
            <div class="col-6">
              <GoBack />
            </div>
            <div class="col-6">
              <div class="favorites-container">
                <a id="downloadButton" class="btn btn-primary" :href="'https://server-bitflix.herokuapp.com/api/torrent/serve/' + movie.torrent + '/:video'" data-toggle="tooltip" data-placement="bottom" title="Download movie"><i class="fas fa-download"></i> Download</a>
                <a @click="setVote(movie.id)" class="btn" :class="moviesVotes[movie.id] ? 'unfavorite' : 'favorite'" data-toggle="tooltip" data-placement="bottom" title="Favorites"><i class="fa fa-heart"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
        <div class="container">
          <div class="playerContainer text-center">
            <h4 class="movie-info-title">Watching: {{movie.title}}</h4>
            <vue-plyr v-if="subsUrlEs && subsUrlEn" class="player" style="--plyr-color-main: var(--blue)!important; --plyr-captions-background: transparent!important;">
              <video id="player" playsinline autoplay preload="metadata" controls :data-poster="'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/' + movie.backdrop_path" crossorigin="anonymous">
                <source :src="'https://sv-bitflx.herokuapp.com/api/torrent/serve/' + movie.torrent + '/:video'">
                <source :src="'https://server-bitflix.herokuapp.com/api/torrent/serve/' + movie.torrent + '/:video'">
                <source :src="'https://sv-bitflix.herokuapp.com/api/torrent/serve/' + movie.torrent + '/:video'">
                <source :src="'https://nm-bitflix.herokuapp.com//api/torrent/serve/' + movie.torrent + '/:video'">
                <!--<track kind="subtitles" :src="subsUrlAr" srclang="ar" label="Arabic">
                <track kind="subtitles" :src="subsUrlBn" srclang="bn" label="Bengali">
                <track kind="subtitles" :src="subsUrlPb" srclang="pb" label="Brazilian Portuguese">
                <track kind="subtitles" :src="subsUrlZh" srclang="zh" label="Chinese">
                <track kind="subtitles" :src="subsUrlHr" srclang="hr" label="Croatian">
                <track kind="subtitles" :src="subsUrlDa" srclang="da" label="Danish">
                <track kind="subtitles" :src="subsUrlNl" srclang="nl" label="Dutch">-->
                <!-- The Simpsons -->
                <track kind="subtitles" v-if="movie.imdb_id === 'tt0462538'" src="https://www.seedr.cc/subtitles/1952184131/spa/dl.opensubtitles.org%2Fen%2Fdownload%2Fsrc-api%2Fvrf-199c0c4c%2Fsid-mv14fkl4OEuwLbbUoK3cZwCFQz2%2Ffilead%2F1952184131.gz/sub.vtt" srclang="es" label="Spanish (2)">
                <!-- High School Musical -->
                <track kind="subtitles" v-if="movie.imdb_id === 'tt0475293'" src="https://www.seedr.cc/subtitles/1951657604/spa/dl.opensubtitles.org%2Fen%2Fdownload%2Fsrc-api%2Fvrf-19bc0c55%2Fsid-5d6ZExBj6o3Yss6OBsdwASYVnu1%2Ffilead%2F1951657604.gz/sub.vtt" srclang="es" label="Spanish (2)">
                <!-- High School Musical 2 -->
                <track kind="subtitles" v-if="movie.imdb_id === 'tt0810900'" src="https://www.seedr.cc/subtitles/1954219657/spa/dl.opensubtitles.org%2Fen%2Fdownload%2Fsrc-api%2Fvrf-19ba0c5a%2Fsid-vlBfK6CtJHBCEZXXArpkimrr8a4%2Ffilead%2F1954219657.gz/sub.vtt" srclang="es" label="Spanish (2)">
                  <!-- High School Musical 3 -->
                <track kind="subtitles" v-if="movie.imdb_id === 'tt0962726'" src="https://www.seedr.cc/subtitles/1954113792/spa/dl.opensubtitles.org%2Fen%2Fdownload%2Fsrc-api%2Fvrf-19a20c53%2Fsid-alKzS11sqV66Rn5sQllDZzk3Uxa%2Ffilead%2F1954113792.gz/sub.vtt" srclang="es" label="Spanish (2)">
                <track kind="subtitles" :src="subsUrlEn" srclang="en" label="English">
                <!-- <track kind="subtitles" :src="subsUrlFa" srclang="fa" label="Farsi/Persian">
                <track kind="subtitles" :src="subsUrlFr" srclang="fr" label="French">
                <track kind="subtitles" :src="subsUrlEl" srclang="el" label="Greek">
                <track kind="subtitles" :src="subsUrlHu" srclang="hu" label="Hungarian">
                <track kind="subtitles" :src="subsUrlKo" srclang="ko" label="Korean">
                <track kind="subtitles" :src="subsUrlMs" srclang="ms" label="Malay">
                <track kind="subtitles" :src="subsUrlPl" srclang="pl" label="Polish">
                <track kind="subtitles" :src="subsUrlPt" srclang="pt" label="Portuguese">
                <track kind="subtitles" :src="subsUrlRo" srclang="ro" label="Romanian">
                <track kind="subtitles" :src="subsUrlRu" srclang="ru" label="Russian">
                <track kind="subtitles" :src="subsUrlSr" srclang="sr" label="Serbian"> -->
                <track kind="subtitles" :src="subsUrlEs" srclang="es" label="Spanish">
                <!-- <track kind="subtitles" :src="subsUrlSv" srclang="sv" label="Swedish">
                <track kind="subtitles" :src="subsUrlTr" srclang="tr" label="Turkish">
                <track kind="subtitles" :src="subsUrlVi" srclang="vi" label="Vietnamese"> -->
              </video>
            </vue-plyr>
            <div class="share-buttons text-center">
              <div class="mobile-download">
                <a id="downloadButtonMobile" class="btn btn-primary" :href="'https://sv-bitflx.herokuapp.com/api/torrent/serve/' + movie.torrent + '/:video'" data-toggle="tooltip" data-placement="bottom" title="Download movie"><i class="fas fa-download"></i> Download movie</a>
              </div>
              <a class="btn twitter-share-button" :href="'https://twitter.com/intent/tweet?text=Hey!%20I\'m%20watching%20' + movie.title + '%20on%20Bitflix.%20' + 'https://bitflix.now.sh/' + 'movie/' + movie.imdb_id" target="_blank" data-size="large"><i class="fab fa-twitter"></i> Share on Twitter</a>
              <a class="btn whatsapp-share-button" :href="'https://wa.me/?text=Hey!%20I\'m%20watching%20' + movie.title + '%20on%20Bitflix.%20' + 'https://bitflix.now.sh/' + 'movie/' + movie.imdb_id" target="_blank" data-size="large"><i class="fab fa-whatsapp"></i> Share on WhatsApp</a>
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
  components: {
    GoBack,
    Footer
  },
  data() {
    return {
      movies: list.movies,
      moviesVotes: {},
      subsUrlAr: 'null',
      subsUrlBn: 'null',
      subsUrlPb: 'null',
      subsUrlZh: 'null',
      subsUrlHr: 'null',
      subsUrlDa: 'null',
      subsUrlNl: 'null',
      subsUrlEn: 'null',
      subsUrlFa: 'null',
      subsUrlFr: 'null',
      subsUrlEl: 'null',
      subsUrlHu: 'null',
      subsUrlKo: 'null',
      subsUrlMs: 'null',
      subsUrlPl: 'null',
      subsUrlPt: 'null',
      subsUrlRo: 'null',
      subsUrlRu: 'null',
      subsUrlSr: 'null',
      subsUrlEs: 'null',
      subsUrlSv: 'null',
      subsUrlTr: 'null',
      subsUrlVi: 'null'
    };
  },
  props: {
    imdb_id: {
      type: String,
      required: true
    }
  },
  async mounted() {
    let appScript = document.createElement("script");
    appScript.setAttribute("src", "/js/script.js");
    document.head.appendChild(appScript);
    this.setVotesFromPersistence();
    const allsubs = await fetch(`https://bitflix-subs.herokuapp.com/subs/` + this.imdb_id).then(res => res.json())

    //Find subtitles

    // const firstAr = allsubs.find(s => s.langShort === 'ar')
    // const firstBn = allsubs.find(s => s.langShort === 'bn')
    // const firstPb = allsubs.find(s => s.langShort === 'pb')
    // const firstZh = allsubs.find(s => s.langShort === 'zh')
    // const firstHr = allsubs.find(s => s.langShort === 'hr')
    // const firstDa = allsubs.find(s => s.langShort === 'da')
    // const firstNl = allsubs.find(s => s.langShort === 'nl')
    const firstEn = allsubs.find(s => s.langShort === 'en')
    // const firstFa = allsubs.find(s => s.langShort === 'fa')
    // const firstFr = allsubs.find(s => s.langShort === 'fr')
    // const firstEl = allsubs.find(s => s.langShort === 'el')
    // const firstHu = allsubs.find(s => s.langShort === 'hu')
    // const firstKo = allsubs.find(s => s.langShort === 'ko')
    // const firstMs = allsubs.find(s => s.langShort === 'ms')
    // const firstPl = allsubs.find(s => s.langShort === 'pl')
    // const firstPt = allsubs.find(s => s.langShort === 'pt')
    // const firstRo = allsubs.find(s => s.langShort === 'ro')
    // const firstRu = allsubs.find(s => s.langShort === 'ru')
    // const firstSr = allsubs.find(s => s.langShort === 'sr')
    const firstEs = allsubs.find(s => s.langShort === 'es')
    // const firstSv = allsubs.find(s => s.langShort === 'sv')
    // const firstTr = allsubs.find(s => s.langShort === 'tr')
    // const firstVi = allsubs.find(s => s.langShort === 'vi')

    //Get best subtitles

    // const firstIndexAr = firstAr.subs[0].index
    // const firstIndexBn = firstBn.subs[0].index
    // const firstIndexPb = firstPb.subs[0].index
    // const firstIndexZh = firstZh.subs[0].index
    // const firstIndexHr = firstHr.subs[0].index
    // const firstIndexDa = firstDa.subs[0].index
    // const firstIndexNl = firstNl.subs[0].index
    const firstIndexEn = firstEn.subs[0].index
    // const firstIndexFa = firstFa.subs[0].index
    // const firstIndexFr = firstFr.subs[0].index
    // const firstIndexEl = firstEl.subs[0].index
    // const firstIndexHu = firstHu.subs[0].index
    // const firstIndexKo = firstKo.subs[0].index
    // const firstIndexMs = firstMs.subs[0].index
    // const firstIndexPl = firstPl.subs[0].index
    // const firstIndexPt = firstPt.subs[0].index
    // const firstIndexRo = firstRo.subs[0].index
    // const firstIndexRu = firstRu.subs[0].index
    // const firstIndexSr = firstSr.subs[0].index
    const firstIndexEs = firstEs.subs[0].index
    // const firstIndexSv = firstSv.subs[0].index
    // const firstIndexTr = firstTr.subs[0].index
    // const firstIndexVi = firstVi.subs[0].index

    //Final subtitles

    // this.subsUrlAr = `https://bitflix-subs.herokuapp.com/subs/` + this.imdb_id + `/${firstIndexAr}`
    // this.subsUrlBn = `https://bitflix-subs.herokuapp.com/subs/` + this.imdb_id + `/${firstIndexBn}`
    // this.subsUrlPb = `https://bitflix-subs.herokuapp.com/subs/` + this.imdb_id + `/${firstIndexPb}`
    // this.subsUrlZh = `https://bitflix-subs.herokuapp.com/subs/` + this.imdb_id + `/${firstIndexZh}`
    // this.subsUrlHr = `https://bitflix-subs.herokuapp.com/subs/` + this.imdb_id + `/${firstIndexHr}`
    // this.subsUrlDa = `https://bitflix-subs.herokuapp.com/subs/` + this.imdb_id + `/${firstIndexDa}`
    // this.subsUrlNl = `https://bitflix-subs.herokuapp.com/subs/` + this.imdb_id + `/${firstIndexNl}`
    this.subsUrlEn = `https://bitflix-subs.herokuapp.com/subs/` + this.imdb_id + `/${firstIndexEn}`
    // this.subsUrlFa = `https://bitflix-subs.herokuapp.com/subs/` + this.imdb_id + `/${firstIndexFa}`
    // this.subsUrlFr = `https://bitflix-subs.herokuapp.com/subs/` + this.imdb_id + `/${firstIndexFr}`
    // this.subsUrlEl = `https://bitflix-subs.herokuapp.com/subs/` + this.imdb_id + `/${firstIndexEl}`
    // this.subsUrlHu = `https://bitflix-subs.herokuapp.com/subs/` + this.imdb_id + `/${firstIndexHu}`
    // this.subsUrlKo = `https://bitflix-subs.herokuapp.com/subs/` + this.imdb_id + `/${firstIndexKo}`
    // this.subsUrlMs = `https://bitflix-subs.herokuapp.com/subs/` + this.imdb_id + `/${firstIndexMs}`
    // this.subsUrlPl = `https://bitflix-subs.herokuapp.com/subs/` + this.imdb_id + `/${firstIndexPl}`
    // this.subsUrlPt = `https://bitflix-subs.herokuapp.com/subs/` + this.imdb_id + `/${firstIndexPt}`
    // this.subsUrlRo = `https://bitflix-subs.herokuapp.com/subs/` + this.imdb_id + `/${firstIndexRo}`
    // this.subsUrlRu = `https://bitflix-subs.herokuapp.com/subs/` + this.imdb_id + `/${firstIndexRu}`
    // this.subsUrlSr = `https://bitflix-subs.herokuapp.com/subs/` + this.imdb_id + `/${firstIndexSr}`
    this.subsUrlEs = `https://bitflix-subs.herokuapp.com/subs/` + this.imdb_id + `/${firstIndexEs}`
    // this.subsUrlSv = `https://bitflix-subs.herokuapp.com/subs/` + this.imdb_id + `/${firstIndexSv}`
    // this.subsUrlTr = `https://bitflix-subs.herokuapp.com/subs/` + this.imdb_id + `/${firstIndexTr}`
    // this.subsUrlVi = `https://bitflix-subs.herokuapp.com/subs/` + this.imdb_id + `/${firstIndexVi}`
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
<style>
.plyr__captions .plyr__caption {
  background: transparent!important;
  text-shadow: 0 0 5px black!important;
}
.plyr__menu__container {
  background-color: var(--bg)!important;
}
.plyr--full-ui input[type=range] {
  color: var(--blue)!important;
}
.plyr__control--overlaid {
  background: var(--blue)!important;
}
.plyr--video .plyr__control.plyr__tab-focus, .plyr--video .plyr__control:hover, .plyr--video .plyr__control[aria-expanded=true] {
  background: var(--blue)!important;
}
</style>
