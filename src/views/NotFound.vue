<template>
  <div class="error">
    <img class="about-logo" src="/assets/logo.png"/>
    <h1>Not Found</h1>
    <p>Oops we couldn't find that movie or page</p>
      <router-link :to="{ name: 'home' }">
        <button class="btn btn-primary" type="button" name="button">Go home</button>
      </router-link>
  </div>
</template>
<style media="screen">
  .error {
    text-align: center;
    width: 600px;
    height: 600px;
    position:absolute;
    left:0; right:0;
    top:0; bottom:0;
    margin:auto;
    max-width:100%;
    max-height:100%;
    overflow:auto;
  }
  .error p {
    margin-top: 1.5vh;
    margin-bottom: 4.5vh;
    color: var(--grey);
  }
</style>
