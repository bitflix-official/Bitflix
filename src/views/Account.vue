<template>
  <div class="profile">
    <div class="top">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <GoBack />
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
                <h4 class="text-center">Edit profile</h4>
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
                <button type="button" class="btn btn-primary" data-dismiss="modal">Nice</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h5 class="marked text-center">Movies marked as favorites</h5>
      <MovieList/>
      <h6 class="thanks-for-using text-center">Thanks for using Bitflix <i class="fa fa-heart"></i></h6>
    </div>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import list from "@/list.js";
import MovieList from "@/components/AccountMovies";
import GoBack from "@/components/GoBack";
import Footer from "@/components/Footer";
export default {
  name: "home",
  components: {
    MovieList,
    GoBack,
    Footer
  },
  data() {
    return {
      name:'Stranger',
      genres: list.genres,
      avatar: 'cat'
    };
  },
  mounted() {
    if(localStorage.name) this.name = localStorage.name;
    if(localStorage.avatar) this.avatar = localStorage.avatar;
  },
  watch:{
    name(newName) {
      localStorage.name = newName;
    },
    avatar(newAvatar) {
      localStorage.avatar = newAvatar;
    }
  },
};
</script>
<style>
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
  .thanks-for-using {
    color: var(--grey);
    padding-bottom: 100px;
  }
  .thanks-for-using .fa-heart {
    color: #ff4343;
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
</style>
