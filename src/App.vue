<template>
  <div id="app">
    <h1>Location Message</h1>
    <a href="#" @click.prevent="logout">Logout</a>
    <hr />
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  methods: {
    async logout() {
      await this.axios.post("/users/logout");
      localStorage.removeItem("token");
      this.$router.push({ name: "login" });
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
