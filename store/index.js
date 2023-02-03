import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default () =>
  new Vuex.Store({
    state: () => ({
      // Your state properties go here
      history: [],
    }),
    mutations: {
      // Your mutations go here
      addToHistory(state, payload) {
        state.history.push(payload);
      },
    },
    actions: {
      // Your actions go here
    },
    getters: {
      // Your getters go here
    },
    modules: {
      // Your modules go here
    },
  });
