import { firebaseAction } from 'vuexfire';

const setQuestionsRef = firebaseAction(({ bindFirebaseRef }, { ref }) => {
  bindFirebaseRef('questions', ref);
});

const setUser = ({ commit }, user) => {
  commit('changeUser', user);
};

export { setUser, setQuestionsRef };
