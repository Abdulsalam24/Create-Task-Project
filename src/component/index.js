import axios from "axios";

const url = "https://stage.api.sloovi.com";

export const loginUser = (userData) => axios.post(`${url}/login`, userData);

export const fetchTasks = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return axios.get(
    `${url}/task/lead_465c14d0e99e4972b6b21ffecf3dd691?company_id=${user.company_id}`,
    {
      headers: {
        Authorization: `Bearer ${user.token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
};

export const createTask = (newTask) => {
  const user = JSON.parse(localStorage.getItem("user")); 

  const taskBody = {
    assigned_user: user.user_id,
    task_date: newTask.task_date,
    task_time: new Date().getTime(newTask.task_time),
    is_completed: 0,
    time_zone: 19800,
    task_msg: newTask.task_time,
  };

  return axios.post(
    `${url}/task/lead_465c14d0e99e4972b6b21ffecf3dd691?company_id=${user.company_id}`,
    taskBody,
    {
      headers: {
        Authorization: `Bearer ${user.token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
};

export const updateTask = (editedTask) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return axios.post(
    `${url}/task/lead_465c14d0e99e4972b6b21ffecf3dd691/${editedTask.id}?company_id=${user.company_id}`,
    editedTask,
    {
      headers: {
        Authorization: `Bearer ${user.token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
};
