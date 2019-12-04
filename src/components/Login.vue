<template>
  <div class="login">
    <h1>Login</h1>

    <form @submit.prevent="login">
      <input type="email" v-model="email" placeholder="Email address" required />
      <br />
      <input type="password" v-model="password" placeholder="Password" required />
      <br />
      <router-link :to="{name:'forgotPassword'}">Forgot password?</router-link>
      <br>
      <button type="submit">Sign in</button> New user? <router-link :to="{name: 'register'}">Register here</router-link>
    </form>
    {{message}}
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
      message: ""
    };
  },
  methods: {
    async login() {
      try {
        const res = await this.axios.post("/users/login", {
          email: this.email,
          password: this.password
        });
        localStorage.setItem('token', res.data.token)
        this.$router.push({name: 'home'})
      } catch (e) {
        console.log(e.response.status);
        this.message = e.response.data.message;
      }
    }
  }
};
</script>