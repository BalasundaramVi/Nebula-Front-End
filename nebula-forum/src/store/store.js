import Vue from 'vue';
import Vuex from 'vuex';

import { currentUser } from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    currentUser: null,
  },
  getters: {
    currentUser,
  },
});

export default store;
