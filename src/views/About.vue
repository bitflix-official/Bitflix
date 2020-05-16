<template>
  <div class="about">
      <div class="container sticky-top top">
        <div class="container">
          <div class="row">
            <div class="col-6">
              <GoBack />
            </div>
          </div>
        </div>
      </div>
      <div class="area" >
        <ul class="circles">
          <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
       </div>
       <div class="context">
         <img class="about-logo" src="assets/logo.png"/>
         <h2>You just have to make some delicious popcorn!</h2>
         <span>Bitflix is an open-source web application that allows you to watch movies through torrents in an easy and fast way.</span>
         <div class="social-container-about">
           <a class="btn about-social-icon instagram" href="https://instagram.com/bitflixapp" target="_blank"><i class="fa fa-instagram"></i></a>
           <a class="btn about-social-icon github" href="https://instagram.com/bitflixapp" target="_blank"><i class="fa fa-github"></i></a>
           <a class="btn about-social-icon twitter" href="https://twitter.com/bitflixapp" target="_blank"><i class="fa fa-twitter"></i></a>
         </div>
         <p>0.1.1 beta version</p>
      </div>
      <Footer/>
    </div>
</template>
<script>
import GoBack from "@/components/GoBack";
import Footer from "@/components/Footer";
export default {
  name: "movieDetails",
  components: {
    GoBack,
    Footer
  },
  data() {
    return {}
  },
}
</script>
<style media="screen">
.context {
  display: block;
  width: 100%;
  position: absolute;
  text-align: center;
  top:15vh;
}
.context {
  color: var(--white);
}
.context h1 {
  display: block;
  width: 90%;
}
.context span {
  display: inline-block;
  color: var(--grey);
  width: 90%;
  margin-top: 10px;
}
.about-logo {
  width: 80px;
  margin-bottom: 20px;
}
.social-container-about {
  display: block;
  margin-top: 5vh;
  margin-bottom: 10vh;
}
.about-social-icon {
  display: inline-block;
  font-size: 1.5rem;
  margin-right: 1.5rem;
}
.twitter {
  margin-right: 0px;
}
.twitter:hover {
  background: #1b7fbd;
}
.area {
  background: var(--bg);
  width: 100%;
  height:80vh;
}
.circles{
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.circles li{
  position: absolute;
  display: block;
  list-style: none;
  width: 20px;
  height: 20px;
  background: #2361e036;
  animation: animate 25s linear infinite;
  bottom: -150px;
}
.circles li:nth-child(1){
  left: 25%;
  width: 80px;
  height: 80px;
  animation-delay: 0s;
}
.circles li:nth-child(2){
  left: 10%;
  width: 20px;
  height: 20px;
  animation-delay: 2s;
  animation-duration: 12s;
}
.circles li:nth-child(3){
  left: 70%;
  width: 20px;
  height: 20px;
  animation-delay: 4s;
}
.circles li:nth-child(4){
  left: 40%;
  width: 60px;
  height: 60px;
  animation-delay: 0s;
  animation-duration: 18s;
}
.circles li:nth-child(5){
  left: 65%;
  width: 20px;
  height: 20px;
  animation-delay: 0s;
}
.circles li:nth-child(6){
  left: 75%;
  width: 110px;
  height: 110px;
  animation-delay: 3s;
}
.circles li:nth-child(7){
  left: 35%;
  width: 150px;
  height: 150px;
  animation-delay: 7s;
}
.circles li:nth-child(8){
  left: 50%;
  width: 25px;
  height: 25px;
  animation-delay: 15s;
  animation-duration: 45s;
}
.circles li:nth-child(9){
  left: 20%;
  width: 15px;
  height: 15px;
  animation-delay: 2s;
  animation-duration: 35s;
}
.circles li:nth-child(10){
  left: 85%;
  width: 150px;
  height: 150px;
  animation-delay: 0s;
  animation-duration: 11s;
}
@keyframes animate {
  0%{
      transform: translateY(0) rotate(0deg);
      opacity: 1;
      border-radius: 0;
  }
  100%{
      transform: translateY(-1000px) rotate(720deg);
      opacity: 0;
      border-radius: 50%;
  }
}
</style>
