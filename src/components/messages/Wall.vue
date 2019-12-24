<template>
  <div id="messages" v-if="location.lat">
    <div style="width:600px;">
      Location: {{`${location.lat} ${location.lng} - ${location.accuracy}`}}
      <location-map :location="location"></location-map>
    </div>

    <div>
      <AddMessage :location="location" />

      <ListMessages :location="location" />
    </div>
  </div>
</template>

<script>
import AddMessage from "./AddMessage";
import ListMessages from "./ListMessages";
import LocationMap from "../locationMap/LocationMap";

export default {
  name: "Wall",
  components: {
    AddMessage,
    ListMessages,
    LocationMap
  },
  computed: {
    location() {
      return this.$store.state.location;
    }
  }
};
</script>
