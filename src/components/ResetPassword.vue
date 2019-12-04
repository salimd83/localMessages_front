<template>
  <div class="login">
    <h1>Reset your password</h1>

    <form @submit.prevent="resetPassword">
      <input type="password" v-model="password" placeholder="Enter new password" required />
      <br />
      <input type="password" v-model="confirm" placeholder="Confirm new password" required />
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
      confirm: "",
      password: "",
      message: ""
    };
  },
  methods: {
    async resetPassword() {
      if (this.password !== this.confirm) {
        this.message = "Password don't match";
        console.log("Password don't match");
        return;
      }
      try {
        const res = await this.axios.post("/users/resetPassword", {
          password: this.password,
          token: this.$route.query.t
        });
        console.log(res.data.token);
        localStorage.setItem("token", res.data.token);
        // this.message = "Password has been changed successfully."
        this.$toasted.success("Password has been changed.");
        window.location.href = "/";
      } catch (e) {
        console.log(e);
        this.message = e.response.data.message;
      }
    }
  }
};
</script>