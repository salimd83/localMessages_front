<template>
  <div id="app">
    <Header />
    <p
      class="lead"
    >Say something about where you are now whether it's a touristic site, a beautifull landmark or a business site.</p>

    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import Header from "./components/layouts/Header"

export default {
  name: "app",
  components: {
    Header
  }
};
</script>

<style lang="scss">
@import "./assets/styles/imports";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 20px;
  margin: 0 auto;
  background-color: #fefefe;
}

main {
  padding: 20px 0;
}
</style>
