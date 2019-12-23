<template>
  <div class="add-message">
    <Modal :open="open" @close="open = false">
      <form @submit.prevent="postMessage">
        <h4>Say something about this place</h4>
        <div class="form-control">
          <textarea type="text" required v-model="message" placeholder="Say something about this place" />
        </div>
        <div class="float-right">
          <button class="secondary mr-1" @click.prevent="open = false">Cancel</button> 
          <button type="submit">Post</button>
        </div>
      </form>
    </Modal>
    <button class="secondary" @click.prevent="open = !open">Say something</button>
  </div>
</template>

<script>
import Modal from "../UI/Modal";

export default {
  name: "AddMessage",
  components: {
    Modal
  },
  props: {
    location: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      message: "",
      error: "",
      open: false
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
        this.open = false
      } catch (e) {
        console.log(e);
        this.error = e.response.data.message;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.add-message {
  margin: 20px 0;
  max-width: 600px;
  textarea {
    height: 60px;
    width: 100%;
    max-width: 600px;
  }
}
</style>