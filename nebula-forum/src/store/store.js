import Vue from 'vue';
import Vuex from 'vuex';
import { firebaseMutations } from 'vuexfire';

import { currentUser, questions } from './getters';
import {
  setUser,
  setQuestionsRef,
  getQuestion,
  submitQuestion,
  setUserQuestions,
} from './actions';
import {
  changeUser,
  removeQuestion,
  updateQuestions,
  setQuestions,
} from './mutations';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    questions: [],
    currentUser: null,
    answered: {},
    userQuestions: [],
  },
  getters: {
    currentUser,
    questions,
  },
  mutations: {
    ...firebaseMutations,
    changeUser,
    removeQuestion,
    updateQuestions,
    setQuestions,
  },
  actions: {
    setUser,
    setQuestionsRef,
    getQuestion,
    submitQuestion,
    setUserQuestions,
  },
});

export default store;
