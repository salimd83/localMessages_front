import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    messages: [],
    location: {
        lat: null,
        lng: null,
        accuracy: null
    },
    profile: null
  },
  mutations: {
    addMessages(state, payload) {
      state.messages = [...payload.messages, ...state.messages];
    },
    setMessages(state, payload) {
      state.messages = payload.messages;
    },
    setCoordinates(state, {lat, lng, accuracy}) {
      this.state.location = {lat, lng, accuracy}
    },
    setProfile(state, {profile}) {
      this.state.profile = profile
    }
  }
});
