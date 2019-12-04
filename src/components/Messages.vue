<template>
  <div id="messages">
    Location: {{`${location.lat} ${location.lng}`}}
    <br />

    <div class="add-message">
      <form @submit.prevent="postMessage">
        <input type="text" v-model="message" placeholder="Say something about this place" />
        <button type="submit">Post</button>
      </form>
    </div>

    <div class="list-messages" v-for="message in messages" :key="message._id">
      {{message.message}}
      <br />
      {{`${message.user.firstName} ${message.user.lastName} ${dateFormate(message.createdAt)}`}}
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: "HelloWorld",
  data() {
    return {
      location: {
        lat: localStorage.getItem("lat"),
        lng: localStorage.getItem("lng")
      },
      messages: [],
      message: "",
      error: ""
    };
  },
  async mounted() {
    try {
      const res = await this.axios.get("/messages", {
        params: {
          lat: localStorage.getItem("lat"),
          long: localStorage.getItem("lng")
        }
      });
      this.messages = res.data;
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    dateFormate(d) {
      return moment(d).fromNow()
    },
    async postMessage() {
      try {
        const message = await this.axios.post("/messages", {
          message: this.message,
          lat: this.location.lat,
          long: this.location.lng
        });
        this.messages = [...this.messages, message.data];
      } catch (e) {
        this.error = e.response.data.message;
      }
    }
  }
};
</script>
