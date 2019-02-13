import { firebaseAction } from 'vuexfire';
import { dbQuestionsRef, dbUsersRef } from '../firebaseConfig';
import store from './store';

const setQuestionsRef = firebaseAction(({ bindFirebaseRef }, { ref }) => {
  bindFirebaseRef('questions', ref);
});

const setUser = ({ commit }, user) => {
  commit('changeUser', user);
};

const getQuestion = ({ state }) => state.userQuestions;

const submitQuestion = ({ commit, state }, payload) => {
  const questionRef = dbQuestionsRef.child(payload.key).child('choices').child(payload.selected);
  questionRef.update({
    voteCount: payload.votes,
  });
  questionRef.child('selectedBy').push(state.currentUser.email);
  commit('updateQuestions', payload.key);
  const s = JSON.parse(JSON.stringify(state));
  const userRef = dbUsersRef.child(s.currentUser.key).child('answered');
  userRef.update({
    [payload.key]: true,
  });
};

const setUserQuestions = ({ commit, state }, answers) => {
  let answered = {};
  if (answers !== undefined) {
    answered = JSON.parse(JSON.stringify(answers));
  }
  const questions = [];
  const allQuestions = JSON.parse(JSON.stringify(state.questions));
  allQuestions.forEach((question) => {
    const key = question['.key'];
    const newQuestion = {
      key: '',
    };
    if (answered[key] !== true) {
      const ref = dbQuestionsRef.child(key);
      ref.once('value', (snapshot) => {
        newQuestion.key = snapshot.key;
        newQuestion.choices = snapshot.val().choices;
        newQuestion.correctAnswer = snapshot.val().correctAnswer;
        newQuestion.question = snapshot.val().question;
      });

      questions.push(newQuestion);
    }
  });
  commit('setQuestions', questions);
};

export {
  setUser,
  setQuestionsRef,
  getQuestion,
  submitQuestion,
  setUserQuestions,
};
