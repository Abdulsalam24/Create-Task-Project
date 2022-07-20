import * as api from "../../api";

export const fetchTasks = () => async (dispatch) => {
  try {
    const { data } = await api.fetchTasks();
    dispatch({ type: "FETCH_TASKS", payload: data.results });
  } catch (error) {
    console.log(error, "fetchpostt error");
  }
};

export const createTask = (newTask) => async (dispatch) => {
  try {
    const { data } = await api.createTask(newTask);
    dispatch(fetchTasks())
  } catch (error) {
    console.log(error, "fetchpostt error");
  }
};

export const updateTask = (taskid, editedTask) => async (dispatch) => {
  try {
    const { data } = await api.updateTask(taskid, editedTask);
    dispatch(fetchTasks())
  } catch (error) {
    console.log(error, "fetchpostt error");
  }
};



export const setEditTask = (editedId) => async (dispatch) => {
  try {
    dispatch({ type: "SET_EDIT", payload: editedId });
  } catch (error) {
    console.log(error, "set edit error");
  }
};

export const deleteTask = (taskId) => async (dispatch) => {
  try {
    const { data } = await api.deleteTask(taskId);
    dispatch(fetchTasks())
  } catch (error) {
    console.log(error, "delete error");
  }
};
