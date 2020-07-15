<template>
  <button @click="goBack" class="btn back">
    <i class="fas fa-chevron-left"></i> {{ $t("content.back") }}
  </button>
</template>

<script>
export default {
  methods: {
    goBack() {
      return this.$router.go(-1);
    }
  }
};
</script>
