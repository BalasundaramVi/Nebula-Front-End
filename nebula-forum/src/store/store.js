import Vue from 'vue';
import Vuex from 'vuex';
import { firebaseMutations } from 'vuexfire';

import { currentUser, getQuestions } from './getters';
import { setUser, setQuestionsRef } from './actions';
import { changeUser } from './mutations';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    questions: [],
    currentUser: null,
  },
  getters: {
    currentUser,
    getQuestions,
  },
  mutations: {
    ...firebaseMutations,
    changeUser,
  },
  actions: {
    setUser,
    setQuestionsRef,
  },
});

export default store;
