<template>
  <div class="ns-row">

    <div class="ns-col-lg-4" style="margin:0 auto;">
      <div class="status" v-if="getLoginStatus">{{ getLoginStatus }}</div>
      <form @submit.prevent="login">
        <div class="input-field col s12">
          <input
            type="text"
            class="validate"
            placeholder="Email"
            v-model="email"
          />
        </div>
        <div class="input-field col s12">
          <input type="password" placeholder="Password" v-model="password" />
        </div>
        <button
          class="btn waves-effect waves-light"
          type="submit"
          name="action"
        >
          Login
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  computed: {
    getLoginStatus() {
      return this.$store.getters.getLoginStatus;
    }
  },
  watch: {
    getLoginStatus(val) {
      if (val == "Başarıyla Giriş Yapıldı") {
        this.$router.push({ path: "/" });
        this.$store.dispatch("clearStatus")
      }
    }
  },
  methods: {
    login() {
      this.$store.dispatch("loginUser", {
        email: this.email,
        password: this.password
      });
    }
  }
};
</script>
<style scoped>
.status {
  background-color: rgb(222, 222, 228);
  padding: 0.2rem;
}
</style>
