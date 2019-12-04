<template>
  <div class="add-message">
    <form @submit.prevent="postMessage">
      <input type="text" v-model="message" placeholder="Say something about this place" />
      <button type="submit">Post</button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    location: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      message: "",
      error: ""
    };
  },
  methods: {
    async postMessage() {
      try {
        const res = await this.axios.post("/messages", {
          message: this.message,
          lat: this.location.lat,
          long: this.location.lng
        });
        // this.messages = [message.data, ...this.messages];
        this.$store.commit("addMessages", { messages: [res.data] });
        this.message = "";
      } catch (e) {
        console.log(e);
        this.error = e.response.data.message;
      }
    }
  }
};
</script>