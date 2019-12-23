<template>
  <div id="messages" v-if="location.lat">
    Location: {{`${location.lat} ${location.lng} - ${location.accuracy}`}}

    <AddMessage :location="location" />

    <ListMessages :location="location" />
  </div>
</template>

<script>
import AddMessage from './AddMessage'
import ListMessages from './ListMessages'

export default {
  name: "Wall",
  components: {
    AddMessage,
    ListMessages
  },
  computed: {
    location() {
      return this.$store.state.location
    }
  }
};
</script>
