const changeUser = (state, user) => {
  if (user) {
    Object.assign(state, { currentUser: user });
  } else {
    Object.assign(state, { currentUser: null });
  }
};

export { changeUser };
