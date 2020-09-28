<template>
  <div class="profile">
    <div class="top">
      <div class="container">
        <div class="row">
          <div class="col-6">
            <router-link :to="{ name: 'home', query: {sort_by:'popularity.desc'} }">
              <button class="btn back">
                <i class="fas fa-chevron-left"></i> {{ $t("content.back") }}
              </button>
            </router-link>
          </div>
          <div class="col-6">
            <div class="locale-changer">
              <select v-model="$i18n.locale" @change="lang($i18n.locale)" class="btn locale-selector">
                <option disabled>{{ $t("content.language") }}</option>
                <option v-for="(lang, i) in $i18n.availableLocales" :key="`Lang${i}`" :value="lang">{{ lang }}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="text-center">
        <img class="profile-pic" :src="'/assets/' + this.avatar + '.png'"/>
        <br>
        <h3 class="user-welcome">{{name}}</h3>
        <button type="button" class="btn edit-name" data-toggle="modal" data-target="#changeName">
          <i class="fas fa-pen"></i>
        </button>
        <div class="modal fade" id="changeName" tabindex="-1" role="dialog" aria-labelledby="changeNameTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-body">
                <h4 class="text-center">{{ $t("content.editProfile") }}</h4>
                <img class="profile-pic" :src="'/assets/' + this.avatar + '.png'"/>
                <br>
                <input type="text" class="form-control input-name" v-model="name" placeholder="Name">
                <br>
                <input class="image-select" type="radio" id="cat" value="cat" v-model="avatar">
                <label for="cat">
                  <img class="avatar-selection" src="/assets/cat.png"/>
                </label>
                <input class="image-select" type="radio" id="lion" value="lion" v-model="avatar">
                <label for="lion">
                  <img class="avatar-selection" src="/assets/lion.png"/>
                </label>
                <input class="image-select" type="radio" id="dog" value="dog" v-model="avatar">
                <label for="dog">
                  <img class="avatar-selection" src="/assets/dog.png"/>
                </label>
                <input class="image-select" type="radio" id="cow" value="cow" v-model="avatar">
                <label for="cow">
                  <img class="avatar-selection" src="/assets/cow.png"/>
                </label>
                <input class="image-select" type="radio" id="bear" value="bear" v-model="avatar">
                <label for="bear">
                  <img class="avatar-selection" src="/assets/bear.png"/>
                </label>
                <input class="image-select" type="radio" id="giraffe" value="giraffe" v-model="avatar">
                <label for="giraffe">
                  <img class="avatar-selection" src="/assets/giraffe.png"/>
                </label>
              </div>
              <div class="closediv text-center">
                <button type="button" class="btn btn-primary" data-dismiss="modal">{{ $t("content.nice") }}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from "@/components/Footer";
export default {
  name: "account",
  components: {
    Footer
  },
  data() {
    return {
      name: 'Stranger',
      avatar: 'cat',
      langs: ['es', 'en']
    }
  },
  mounted() {
    if (localStorage.name) this.name = localStorage.name;
    if (localStorage.avatar) this.avatar = localStorage.avatar;
  },
  watch: {
    name(newName) {
      localStorage.name = newName;
    },
    avatar(newAvatar) {
      localStorage.avatar = newAvatar;
    }
  },
  created: function() {
    if (process.browser) {
      if (localStorage.getItem("lang")) {
        if (this.$route.query.lang) {
          this.$i18n.locale = this.$route.query.lang;
        } else {
            this.$i18n.locale = localStorage.getItem("lang");
          }
      }
    }
  },
  methods: {
    lang: function(l) {
      this.$router.push({
        query: {
          lang: l
        }
      });
      this.$i18n.locale = l;
        if (process.browser) {
          localStorage.setItem("lang", l);
        }
    }
  }
};
</script>
<style>
  .locale-changer {
    float: right;
  }
  .locale-selector {
    font-size: 1.3rem;
    width: 58%;
  }
  .profile-pic {
    width: 130px;
    border-radius: 50%;
    box-shadow: 0 0 8px black;
    margin-top: 30px;
    margin-bottom: 20px;
  }
  .user-welcome {
    display: inline-block;
    margin-bottom: 30px;
  }
  .marked {
    color: var(--grey);
    padding-bottom: 20px;
  }
  .edit-name {
    display: inline-block;
    margin-left: 10px;
    margin-top: -8px;
  }
  .modal-content {
    -webkit-box-shadow: 0 0 10px black;
    box-shadow: 0 0 10px black;
    background: var(--bg);
  }
  .image-select[type="radio"]{
    display:none;
  }
  .image-select[type="radio"] + label {
    cursor: pointer;
    margin: 15px;
    height: 100px;
    width: 100px;
    display: inline-block;
    padding: 0 0 0 0px;
  }
  .image-select[type="radio"]:checked + label {
    height: 100px;
    width: 100px;
    display:inline-block;
    padding: 0 0 0 0px;
    border: 5px solid var(--blue);
  }
  .avatar-selection {
    width: 90px;
    height: 90px;
  }
  .input-name {
    text-align: center;
    margin-top: 10px;
    margin-bottom: 10px;
    color: var(--white);
    border: none;
    font-size: 1.6rem;
    background: #151515;
    -webkit-box-shadow: 0 0 14px #00000042;
    box-shadow: 0 0 14px #00000042;
  }
  .input-name:focus {
    color: var(--white);
    background: #0e0e0e;
  }
  .closediv {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  @media only screen and (max-width: 768px) {
    .locale-selector {
      width: 50%;
    }
  }
</style>
