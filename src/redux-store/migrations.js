const migrations = {
  0: (state) => ({
    // migration clear out pending state
    return: {
      ...state,
      pending: [],
    },
  }),
  1: (state) =>
    // migration to keep only gems state
    ({
      gems: state.gems,
    }),
  2: (state) => ({
    // clear out gems state
  }),
};

export default migrations;
