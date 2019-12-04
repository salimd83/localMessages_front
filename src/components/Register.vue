<template>
  <div class="register">
    <h1>Create a new account</h1>

    <form @submit.prevent="login">
      <input type="text" v-model="firstName" placeholder="First name" required />
      <br />
      <input type="text" v-model="lastName" placeholder="Last name" required />
      <br />
      <input type="text" v-model="mobile" placeholder="Mobile number" required />
      <br />
      <input type="email" v-model="email" placeholder="Email address" required />
      <br />
      <input type="password" v-model="password" placeholder="Password" required />
      <br />
      <input type="password" v-model="confirm" placeholder="Confirm password" required />
      <br />
      <button type="submit">Sign in</button> Already have an account? <router-link :to='{name: "login"}'>login here</router-link>
    </form>
    {{message}}
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      firstName: "",
      lastName: "",
      mobile: "",
      email: "",
      password: "",
      message: "",
      confirm: ""
    };
  },
  methods: {
    async register() {
      try {
        const res = await this.axios.post("/users", {
          firstName: this.firstName,
          lastName: this.lastName,
          mobile: this.mobile,
          email: this.email,
          password: this.password
        });
        localStorage.setItem("token", res.data.token);
        this.$router.push({ name: "home" });
      } catch (e) {
        console.log(e.response.status);
        this.message = e.response.data.message;
      }
    }
  }
};
</script>