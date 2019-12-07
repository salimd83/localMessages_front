<template>
  <div id="list-messages">
    Location: {{`${location.lat} ${location.lng} - ${location.accuracy}`}}
    <div class="list-messages" v-for="message in messages" :key="message._id">
      {{message.message}}
      <br />
      {{`${message.user.firstName} ${message.user.lastName} ${dateFormate(message.createdAt)}`}}
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "ListMessages",
  props: {
    location: {
      type: Object,
      default: null
    }
  },
  watch: {
    location(v) {
      this.fetchMessages()
    }
  },
  computed: {
    messages() {
      return this.$store.state.messages;
    }
  },
  methods: {
    dateFormate(d) {
      return moment(d).fromNow();
    },
    async fetchMessages() {
      try {
        const res = await this.axios.get("/messages", {
          params: {
            lat: this.location.lat,
            long: this.location.lng,
            distance:
              this.location.accuracy > 10 && this.location.accuracy < 100
                ? this.location.accuracy
                : 10
          }
        });
        this.$store.commit("setMessages", { messages: res.data });
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>