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
        <img class="profile-pic" src="/assets/pic.png"/>
        <br>
        <h3 class="user-welcome">{{name}}</h3>
        <button type="button" class="btn edit-name" data-toggle="modal" data-target="#changeName">
          <i class="fas fa-pen"></i>
        </button>
        <div class="modal fade" id="changeName" tabindex="-1" role="dialog" aria-labelledby="changeNameTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-body">
                <h4 class="text-center">Enter your name</h4>
                <input type="text" class="form-control input-name" v-model="name" placeholder="Name">
              </div>
              <div class="closediv text-center">
                <button type="button" class="btn btn-primary" data-dismiss="modal">Nice</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h5 class="marked text-center">Movies marked as favorites</h5>
      <MovieList />
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
      genres: list.genres
    };
  },
  mounted() {
    if(localStorage.name) this.name = localStorage.name;
  },
  watch:{
    name(newName) {
      localStorage.name = newName;
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
  .input-name {
    margin-top: 30px;
    margin-bottom: 10px;
    color: var(--white);
    border: none;
    background: #0e0e0e;
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
