
  export default (state = [], action) => {
    switch (action.type) {
      case "LOGIN_USER":
        localStorage.setItem("user", JSON.stringify(action.payload))
        return [...state, action.payload]
      default:
        return state;
    }
  };
