<template>
  <div id="list-messages">
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
  name: "ListMessages",
  props: {
    location: {
      type: Object,
      default: null
    }
  },
  async mounted() {
    console.log(this.location.lat);
    try {
      const res = await this.axios.get("/messages", {
        params: {
          lat: this.location.lat,
          long: this.location.lng
        }
      });
      this.$store.commit("setMessages", { messages: res.data });
    } catch (e) {
      console.log(e);
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
    }
  }
};
</script>