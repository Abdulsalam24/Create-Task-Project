export const loginUser = (data) => async (dispatch) => {
  try {
    dispatch({ type: "LOGIN_USER", payload: data.results });
  } catch (error) {
    console.log(error, "LOGIN ERROR");
  }
};
