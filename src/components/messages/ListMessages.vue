<template>
  <div class="list-messages">
    <div class="message" v-for="message in messages" :key="message._id">
      <div class="info">
        <div class="avatar">
          <img src="https://lifeatbrio.com/wp-content/uploads/2016/11/user-placeholder.jpg" alt="">
        </div>
        <div>
          <span class="user">
            <a href="#" class="text-bold">{{`${message.user.firstName} ${message.user.lastName}`}}</a>
          </span>
          <span class="date">{{dateFormate(message.createdAt)}}</span>
        </div>
      </div>
      <div class="text">
        {{message.message}}
      </div>
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
      this.fetchMessages();
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

<style lang="scss" scoped>
.list-messages {
  margin: 20px 0;
  .message {
    margin: 30px 0;
    .text {
      margin-left: 45px
    }
    .info {
      margin: 10px 0;
      font-size: 15px;
      display: flex;
      align-items: center;
      .avatar {
        border-radius: 100%;
        margin-right: 8px;
        img {
          border-radius: 100%;
          width: 36px;
          height: 36px;
        }
      }
      span {
        padding-right: 7px;
        display: block;
        margin-bottom: 3px;
        &.date {
          font-style: italic;
          color: #777;
          font-size: 13px;
        }
      }
    }
  }
}
</style>