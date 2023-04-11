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
};

export default migrations;
