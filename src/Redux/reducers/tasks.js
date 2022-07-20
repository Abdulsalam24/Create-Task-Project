const initialstate = {
  tasks: [],
  currentPost: [],
};

export default (state = initialstate, action) => {
  switch (action.type) {
    case "UPDATE":
      return { ...state, currentPost: action.payload };

    case "FETCH_TASKS":
      return { ...state, tasks: action.payload };
    case "SET_EDIT":
      return {
        ...state,
        currentPost: state.tasks.filter(
          (task, i) => task.id === action.payload
        ),
      };
    case "CREATE":
      return { ...state, tasks: [...state.tasks, action.payload] };
    default:
      return state;
  }
};
