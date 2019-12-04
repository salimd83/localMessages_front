<template>
  <div class="login">
    <h1>Login</h1>

    <form @submit.prevent="forgotPassword">
        <p>Please provide your account email address:</p>
      <input type="email" v-model="email" placeholder="Account email address" required />
      <br />
      <button type="submit">Reset password</button>
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
      message: ""
    };
  },
  methods: {
    async forgotPassword() {
      try {
        const res = await this.axios.post("/users/forgotPassword", {
          email: this.email,
          redirect: "http://localhost:8080/reset-password"
        });
        this.message = "Please follow instructions in the email sent to you to change your password."
      } catch (e) {
        console.log(e.response.status);
        this.message = e.response.data.message;
      }
    }
  }
};
</script>