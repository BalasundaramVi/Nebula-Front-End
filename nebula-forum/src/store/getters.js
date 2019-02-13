const currentUser = state => state.currentUser;

const getQuestions = (state) => { return (state.questions); };

export { currentUser, getQuestions };
