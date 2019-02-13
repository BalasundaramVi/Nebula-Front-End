const changeUser = (state, user) => {
  if (user) {
    Object.assign(state, { currentUser: user });
  } else {
    Object.assign(state, { currentUser: null });
  }
};

const removeQuestion = (state, key) => {
  console.log(state.currentUser);
};

const setQuestions = (state, questions) => {
  Object.assign(state, { userQuestions: questions });
};

const updateQuestions = (state, key) => {
  console.log(JSON.parse(JSON.stringify(state)));
  state.userQuestions.shift();
  state.answered[key] = true;
  console.log(JSON.parse(JSON.stringify(state)));
};

export {
  changeUser,
  removeQuestion,
  setQuestions,
  updateQuestions,
};
