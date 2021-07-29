<template>
  <div class="ns-container-fluid">
    <div id="app">
      <div id="nav">
        <router-link to="/">Home</router-link>
        <span v-if="!isAuth">
          |
          <router-link to="/login">Login</router-link> |
          <router-link to="/register">Register</router-link>
        </span>
        <span v-if="isAuth">
          |
          <router-link to="/secret">Secret</router-link> |
          <a href="#" @click="logout">Logout</a>
        </span>
      </div>
      <router-view />
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
<script>
export default {
  data() {
    return {
      isAuth: localStorage.getItem("token") ? true : false
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      alert("Çıkış Yapıldı");
    }
  },
  watch: {
    $route() {
      this.isAuth = localStorage.getItem("token") ? true : false;
    }
  }
};
</script>
