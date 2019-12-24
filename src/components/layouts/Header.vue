<template>
  <header>
    <h1 class="mb-0" id="logo">
      <router-link :to="{name: 'home'}">LOCABRI</router-link>
    </h1>
    <div class="action-bar">
      <div class="logged-user" v-if="user" v-click-outside="() => open = false">
        <div class="avatar" @click="open ^= true">
          <img :src="user.avatar" alt />
        </div>
        <ul class="toggle-menu card" :class="{open}">
          <li>
            <router-link :to="{name:'profile'}">Profile</router-link>
          </li>
          <li>
            <a href="#" @click.prevent="logout">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      open: false
    };
  },
  computed: {
    user() {
      return this.$store.state.profile;
    }
  },
  methods: {
    async logout() {
      await this.axios.post("/users/logout");
      localStorage.removeItem("token");
      this.$router.push({ name: "login" });
    }
  }
};
</script>

<style scoped lang="scss">
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  #logo {
    margin: 0;
  }
  .action-bar {
    .logged-user {
      position: relative;
      .avatar {
        border-radius: 100%;
        border: #444 1px solid;
        padding: 3px;
        cursor: pointer;
        img {
          border-radius: 100%;
          width: 40px;
          height: 40px;
          display: block;
        }
      }
      .toggle-menu {
        opacity: 0;
        pointer-events: none;
        position: absolute;
        top: 45px;
        right: 0;
        list-style: none;
        padding: 10px;
        min-width: 150px;
        text-align: center;
        opacity: 0;
        transition: opacity 0.1s ease-in-out;
        &.open {
          opacity: 1;
          pointer-events: all;
        }
        li {
          padding: 10px;
        }
      }
    }
  }
}
</style>