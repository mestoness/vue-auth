<template>
  <div>
    <div>
      <div v-if="userData.email">
        Email : <b>{{ userData.email }}</b>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    this.$store.dispatch("userData");
  },
  computed: {
    userData() {
      return this.$store.getters.getUserData;
    }
  }
};
</script>
