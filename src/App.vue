<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view :key="$route.path" />
    </transition>
  </div>
</template>
<script>
export default {
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
}
</script>