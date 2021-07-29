<template>
  <div class="ns-row">
    <div class="ns-col-lg-4" style="margin:0 auto;">
      <div class="status" v-if="getRegisterStatus">{{ getRegisterStatus }}</div>

      <form @submit.prevent="register">
        <div class="input-field col s12">
          <input id="Name" type="text" placeholder="Name" v-model="name" />
        </div>
        <div class="input-field col s12">
          <input id="email" type="email" placeholder="Email" v-model="email" />
        </div>
        <div class="input-field col s12">
          <input
            id="password"
            type="password"
            placeholder="Password"
            v-model="password"
          />
        </div>
        <button
          class="btn waves-effect waves-light"
          type="submit"
          name="action"
        >
          Register
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
      password: "",
      name: ""
    };
  },
  computed: {
    getRegisterStatus() {
      return this.$store.getters.getRegisterStatus;
    }
  },
  watch: {
    getRegisterStatus(val) {
      if (val == "Başarıyla Kayıt Olundu") {
        alert("Başarıyla Kayıt Olundu");
        this.$store.dispatch("clearStatus");
      }
    }
  },
  methods: {
    register() {
      this.$store.dispatch("registerUser", {
        email: this.email,
        password: this.password,
        name: this.name
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
