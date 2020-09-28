<template>
  <div>
    <div class="background-movie" :style="'background-image: url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/' + movie.backdrop_path + ')'"></div>
    <div class="movie-streaming-container">
      <div class="top">
        <div class="container">
          <div class="row">
            <div class="col-6">
              <GoBack/>
            </div>
            <div class="col-6">
              <div class="favorites-container">
                <a @click="setVote(movie.id)" class="btn" :class="moviesVotes[movie.id] ? 'unfavorite' : 'favorite'" data-toggle="tooltip" data-placement="bottom" :title="$t('content.favorites')"><i class="fa fa-heart"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
        <div class="container text-center">
          <div class="row">
            <div class="col-12">
              <a :href="option4" target="_blank" class="movie-download-poster">
                <div class="details-poster download-poster" :style="'background-image: url(https://image.tmdb.org/t/p/w600_and_h900_bestv2' + movie.poster_path + ')'"></div>
                <i class="far fa-arrow-alt-circle-down download-movie-button"></i>
              </a>
            </div>
          </div>
          <div class="container-fluid subtitles-container">
            <h4 class="movie-subs">{{ $t("content.subtitles") }} {{movie.title}}</h4>
            <p v-if="subsUrlEs" class="subtitle-file" id="subES" crossorigin="anonymous">{{this.subsUrlEs}}</p>
            <p v-if="subsUrlEn" class="subtitle-file" id="subEN" crossorigin="anonymous">{{this.subsUrlEn}}</p>
            <p v-if="subsUrlPb" class="subtitle-file" id="subPB" crossorigin="anonymous">{{this.subsUrlPb}}</p>
            <p v-if="subsUrlFr" class="subtitle-file" id="subFR" crossorigin="anonymous">{{this.subsUrlFr}}</p>
            <div class="row">
              <div class="col-sm-4 col-md-3">
                <a class="btn btn-outline-secondary subtitle-download" name="dl" id="dlES" download="subtitleES.vtt" target="_blank" crossorigin="anonymous"><i class="far fa-closed-captioning"></i> Spanish</a>
              </div>
              <div class="col-sm-4 col-md-3">
                <a class="btn btn-outline-secondary subtitle-download" name="dl" id="dlEN" download="subtitleEN.vtt" target="_blank" crossorigin="anonymous"><i class="far fa-closed-captioning"></i> English</a>
              </div>
              <div class="col-sm-4 col-md-3">
                <a class="btn btn-outline-secondary subtitle-download" name="dl" id="dlPB" download="subtitlePB.vtt" target="_blank" crossorigin="anonymous"><i class="far fa-closed-captioning"></i> Brazilian Portuguese</a>
              </div>
              <div class="col-sm-4 col-md-3">
                <a class="btn btn-outline-secondary subtitle-download" name="dl" id="dlFR" download="subtitleFR.vtt" target="_blank" crossorigin="anonymous"><i class="far fa-closed-captioning"></i> French</a>
              </div>
            </div>
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
  components: {
    GoBack,
    Footer
  },
  data() {
    return {
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      option5: '',
      option6: '',
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
    id: {
      type: String,
      required: true
    }
  },
  async mounted() {

    let subs = document.createElement("script");
    subs.setAttribute("src", "/js/subs.js");
    document.body.appendChild(subs);

    this.setVotesFromPersistence();
    this.setVotesFromPersistence();
    this.option1 = 'https://live-torrent.herokuapp.com/api/torrent/serve/' + this.movie.torrent + '/:video'
    this.option2 = 'https://svflw.herokuapp.com/api/torrent/serve/' + this.movie.torrent + '/:video'
    this.option3 = 'https://nam-bitflix.herokuapp.com/api/torrent/serve/' + this.movie.torrent + '/:video'
    this.option4 = 'https://sv-bitflx.herokuapp.com/api/torrent/serve/' + this.movie.torrent + '/:video'
    this.option5 = 'https://svv-bitflix.herokuapp.com/api/torrent/serve/' + this.movie.torrent + '/:video'
    this.option6 = 'https://server-bitflix.herokuapp.com/api/torrent/serve/' + this.movie.torrent + '/:video'

    // Get all subtitles

      const allsubs = await fetch(`https://bitflix-subs.herokuapp.com/subs/` + this.imdb_id).then(res => res.json())

    // Find subtitles

      // Ar
        var firstAr
        if (allsubs.find(s => s.langShort === 'ar') === undefined) {
          firstAr = ""
        } else {
          firstAr = allsubs.find(s => s.langShort === 'ar')
        }
      // Bn
        var firstBn
        if (allsubs.find(s => s.langShort === 'bn') === undefined) {
          firstBn = ""
        } else {
          firstBn = allsubs.find(s => s.langShort === 'bn')
        }
      // Pb
        var firstPb
        if (allsubs.find(s => s.langShort === 'pb') === undefined) {
          firstPb = ""
        } else {
          firstPb = allsubs.find(s => s.langShort === 'pb')
        }
      // Zh
        var firstZh
        if (allsubs.find(s => s.langShort === 'zh') === undefined) {
          firstZh = ""
        } else {
          firstZh = allsubs.find(s => s.langShort === 'zh')
        }
      // Hr
        var firstHr
        if (allsubs.find(s => s.langShort === 'hr') === undefined) {
          firstHr = ""
        } else {
          firstHr = allsubs.find(s => s.langShort === 'hr')
        }
      // Da
        var firstDa
        if (allsubs.find(s => s.langShort === 'da') === undefined) {
          firstDa = ""
        } else {
          firstDa = allsubs.find(s => s.langShort === 'da')
        }
      // Nl
        var firstNl
        if (allsubs.find(s => s.langShort === 'nl') === undefined) {
          firstNl = ""
        } else {
          firstNl = allsubs.find(s => s.langShort === 'nl')
        }
      // En
        var firstEn
        if (allsubs.find(s => s.langShort === 'en') === undefined) {
          firstEn = ""
        } else {
          firstEn = allsubs.find(s => s.langShort === 'en')
        }
      // Fa
        var firstFa
        if (allsubs.find(s => s.langShort === 'fa') === undefined) {
          firstFa = ""
        } else {
          firstFa = allsubs.find(s => s.langShort === 'fa')
        }
      // Fr
        var firstFr
        if (allsubs.find(s => s.langShort === 'fr') === undefined) {
          firstFr = ""
        } else {
          firstFr = allsubs.find(s => s.langShort === 'fr')
        }
      // El
        var firstEl
        if (allsubs.find(s => s.langShort === 'el') === undefined) {
          firstEl = ""
        } else {
          firstEl = allsubs.find(s => s.langShort === 'el')
        }
      // Hu
        var firstHu
        if (allsubs.find(s => s.langShort === 'hu') === undefined) {
          firstHu = ""
        } else {
          firstHu = allsubs.find(s => s.langShort === 'hu')
        }
      // Ko
        var firstKo
        if (allsubs.find(s => s.langShort === 'ko') === undefined) {
          firstKo = ""
        } else {
          firstKo = allsubs.find(s => s.langShort === 'ko')
        }
      // Ms
        var firstMs
        if (allsubs.find(s => s.langShort === 'ms') === undefined) {
          firstMs = ""
        } else {
          firstMs = allsubs.find(s => s.langShort === 'ms')
        }
      // Pl
        var firstPl
        if (allsubs.find(s => s.langShort === 'pl') === undefined) {
          firstPl = ""
        } else {
          firstPl = allsubs.find(s => s.langShort === 'pl')
        }
      // Pt
        var firstPt
        if (allsubs.find(s => s.langShort === 'pt') === undefined) {
          firstPt = ""
        } else {
          firstPt = allsubs.find(s => s.langShort === 'pt')
        }
      // Ro
        var firstRo
        if (allsubs.find(s => s.langShort === 'ro') === undefined) {
          firstRo = ""
        } else {
          firstRo = allsubs.find(s => s.langShort === 'ro')
        }
      // Ru
        var firstRu
        if (allsubs.find(s => s.langShort === 'ru') === undefined) {
          firstRu = ""
        } else {
          firstRu = allsubs.find(s => s.langShort === 'ru')
        }
      // Sr
        var firstSr
        if (allsubs.find(s => s.langShort === 'sr') === undefined) {
          firstSr = ""
        } else {
          firstSr = allsubs.find(s => s.langShort === 'sr')
        }
      // Es
        var firstEs
        if (allsubs.find(s => s.langShort === 'es') === undefined) {
          firstEs = ""
        } else {
          firstEs = allsubs.find(s => s.langShort === 'es')
        }
      // Sv
        var firstSv
        if (allsubs.find(s => s.langShort === 'sv') === undefined) {
          firstSv = ""
        } else {
          firstSv = allsubs.find(s => s.langShort === 'sv')
        }
      // Tr
        var firstTr
        if (allsubs.find(s => s.langShort === 'tr') === undefined) {
          firstTr = ""
        } else {
          firstTr = allsubs.find(s => s.langShort === 'tr')
        }
      // Vi
        var firstVi
        if (allsubs.find(s => s.langShort === 'vi') === undefined) {
          firstVi = ""
        } else {
          firstVi = allsubs.find(s => s.langShort === 'vi')
        }

    //Get best subtitles

    var firstIndexAr
    if (firstAr === "") {
      firstIndexAr = ""
    } else if (firstAr === allsubs.find(s => s.langShort === 'ar')) {
      firstIndexAr = firstAr.subs[0].index
    }
    var firstIndexBn
    if (firstBn === "") {
      firstIndexBn = ""
    } else if (firstBn === allsubs.find(s => s.langShort === 'bn')) {
      firstIndexBn = firstBn.subs[0].index
    }
    var firstIndexPb
    if (firstPb === "") {
      firstIndexPb = ""
    } else if (firstPb === allsubs.find(s => s.langShort === 'pb')) {
      firstIndexPb = firstPb.subs[0].index
    }
    var firstIndexZh
    if (firstZh === "") {
      firstIndexZh = ""
    } else if (firstZh === allsubs.find(s => s.langShort === 'zh')) {
      firstIndexZh = firstZh.subs[0].index
    }
    var firstIndexHr
    if (firstHr === "") {
      firstIndexHr = ""
    } else if (firstHr === allsubs.find(s => s.langShort === 'hr')) {
      firstIndexHr = firstHr.subs[0].index
    }
    var firstIndexDa
    if (firstDa === "") {
      firstIndexDa = ""
    } else if (firstDa === allsubs.find(s => s.langShort === 'da')) {
      firstIndexDa = firstDa.subs[0].index
    }
    var firstIndexNl
    if (firstNl === "") {
      firstIndexNl = ""
    } else if (firstNl === allsubs.find(s => s.langShort === 'nl')) {
      firstIndexNl = firstNl.subs[0].index
    }
    var firstIndexEn
    if (firstEn === "") {
      firstIndexEn = ""
    } else if (firstEn === allsubs.find(s => s.langShort === 'en')) {
      firstIndexEn = firstEn.subs[0].index
    }
    var firstIndexFa
    if (firstFa === "") {
      firstIndexFa = ""
    } else if (firstFa === allsubs.find(s => s.langShort === 'fa')) {
      firstIndexFa = firstFa.subs[0].index
    }
    var firstIndexFr
    if (firstFr === "") {
      firstIndexFr = ""
    } else if (firstFr === allsubs.find(s => s.langShort === 'fr')) {
      firstIndexFr = firstFr.subs[0].index
    }
    var firstIndexEl
    if (firstEl === "") {
      firstIndexEl = ""
    } else if (firstEl === allsubs.find(s => s.langShort === 'el')) {
      firstIndexEl = firstEl.subs[0].index
    }
    var firstIndexHu
    if (firstHu === "") {
      firstIndexHu = ""
    } else if (firstHu === allsubs.find(s => s.langShort === 'hu')) {
      firstIndexHu = firstHu.subs[0].index
    }
    var firstIndexKo
    if (firstKo === "") {
      firstIndexKo = ""
    } else if (firstKo === allsubs.find(s => s.langShort === 'ko')) {
      firstIndexKo = firstKo.subs[0].index
    }
    var firstIndexMs
    if (firstMs === "") {
      firstIndexMs = ""
    } else if (firstMs === allsubs.find(s => s.langShort === 'ms')) {
      firstIndexMs = firstMs.subs[0].index
    }
    var firstIndexPl
    if (firstPl === "") {
      firstIndexPl = ""
    } else if (firstPl === allsubs.find(s => s.langShort === 'pl')) {
      firstIndexPl = firstPl.subs[0].index
    }
    var firstIndexPt
    if (firstPt === "") {
      firstIndexPt = ""
    } else if (firstPt === allsubs.find(s => s.langShort === 'pt')) {
      firstIndexPt = firstPt.subs[0].index
    }
    var firstIndexRo
    if (firstRo === "") {
      firstIndexRo = ""
    } else if (firstRo === allsubs.find(s => s.langShort === 'ro')) {
      firstIndexRo = firstRo.subs[0].index
    }
    var firstIndexRu
    if (firstRu === "") {
      firstIndexRu = ""
    } else if (firstRu === allsubs.find(s => s.langShort === 'ru')) {
      firstIndexRu = firstRu.subs[0].index
    }
    var firstIndexSr
    if (firstSr === "") {
      firstIndexSr = ""
    } else if (firstSr === allsubs.find(s => s.langShort === 'sr')) {
      firstIndexSr = firstSr.subs[0].index
    }
    var firstIndexEs
    if (firstEs === "") {
      firstIndexEs = ""
    } else if (firstEs === allsubs.find(s => s.langShort === 'es')) {
      firstIndexEs = firstEs.subs[0].index
    }
    var firstIndexSv
    if (firstSv === "") {
      firstIndexSv = ""
    } else if (firstSv === allsubs.find(s => s.langShort === 'sv')) {
      firstIndexSv = firstSv.subs[0].index
    }
    var firstIndexTr
    if (firstTr === "") {
      firstIndexTr = ""
    } else if (firstTr === allsubs.find(s => s.langShort === 'tr')) {
      firstIndexTr = firstTr.subs[0].index
    }
    var firstIndexVi
    if (firstVi === "") {
      firstIndexVi = ""
    } else if (firstVi === allsubs.find(s => s.langShort === 'vi')) {
      firstIndexVi = firstVi.subs[0].index
    }

    //Final subtitles

    this.subsUrlAr = `https://bitflix-subs.herokuapp.com/subs/` + this.imdb_id + `/${firstIndexAr}`
    this.subsUrlBn = `https://bitflix-subs.herokuapp.com/subs/` + this.imdb_id + `/${firstIndexBn}`
    this.subsUrlPb = `https://bitflix-subs.herokuapp.com/subs/` + this.imdb_id + `/${firstIndexPb}`
    this.subsUrlZh = `https://bitflix-subs.herokuapp.com/subs/` + this.imdb_id + `/${firstIndexZh}`
    this.subsUrlHr = `https://bitflix-subs.herokuapp.com/subs/` + this.imdb_id + `/${firstIndexHr}`
    this.subsUrlDa = `https://bitflix-subs.herokuapp.com/subs/` + this.imdb_id + `/${firstIndexDa}`
    this.subsUrlNl = `https://bitflix-subs.herokuapp.com/subs/` + this.imdb_id + `/${firstIndexNl}`
    this.subsUrlEn = `https://bitflix-subs.herokuapp.com/subs/` + this.imdb_id + `/${firstIndexEn}`
    this.subsUrlFa = `https://bitflix-subs.herokuapp.com/subs/` + this.imdb_id + `/${firstIndexFa}`
    this.subsUrlFr = `https://bitflix-subs.herokuapp.com/subs/` + this.imdb_id + `/${firstIndexFr}`
    this.subsUrlEl = `https://bitflix-subs.herokuapp.com/subs/` + this.imdb_id + `/${firstIndexEl}`
    this.subsUrlHu = `https://bitflix-subs.herokuapp.com/subs/` + this.imdb_id + `/${firstIndexHu}`
    this.subsUrlKo = `https://bitflix-subs.herokuapp.com/subs/` + this.imdb_id + `/${firstIndexKo}`
    this.subsUrlMs = `https://bitflix-subs.herokuapp.com/subs/` + this.imdb_id + `/${firstIndexMs}`
    this.subsUrlPl = `https://bitflix-subs.herokuapp.com/subs/` + this.imdb_id + `/${firstIndexPl}`
    this.subsUrlPt = `https://bitflix-subs.herokuapp.com/subs/` + this.imdb_id + `/${firstIndexPt}`
    this.subsUrlRo = `https://bitflix-subs.herokuapp.com/subs/` + this.imdb_id + `/${firstIndexRo}`
    this.subsUrlRu = `https://bitflix-subs.herokuapp.com/subs/` + this.imdb_id + `/${firstIndexRu}`
    this.subsUrlSr = `https://bitflix-subs.herokuapp.com/subs/` + this.imdb_id + `/${firstIndexSr}`
    this.subsUrlEs = `https://bitflix-subs.herokuapp.com/subs/` + this.imdb_id + `/${firstIndexEs}`
    this.subsUrlSv = `https://bitflix-subs.herokuapp.com/subs/` + this.imdb_id + `/${firstIndexSv}`
    this.subsUrlTr = `https://bitflix-subs.herokuapp.com/subs/` + this.imdb_id + `/${firstIndexTr}`
    this.subsUrlVi = `https://bitflix-subs.herokuapp.com/subs/` + this.imdb_id + `/${firstIndexVi}`
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
  .plyr__menu__container [role=menu] {
  max-height: 21rem!important;
  overflow-y: scroll!important;
  }
  @media only screen and (max-width: 768px) {
    .plyr__menu__container [role=menu] {
      max-height: 15rem!important;
      overflow-y: scroll!important;
    }
  }
</style>
