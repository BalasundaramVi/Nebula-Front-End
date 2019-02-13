const changeUser = (state, user) => {
  if (user) {
    Object.assign(state, { currentUser: user });
  } else {
    Object.assign(state, { currentUser: null });
  }
};

const setQuestions = (state, questions) => {
  Object.assign(state, { userQuestions: questions });
};

const updateQuestions = (state, key) => {
  state.userQuestions.shift();
  state.answered[key] = true;
};

export {
  changeUser,
  setQuestions,
  updateQuestions,
};
