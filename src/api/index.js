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

  const convertTime = (hms) => {
    const [hours, minutes] = hms.split(":");
    return +hours * 60 * 60 + +minutes * 60;
  };
  const taskBody = {
    assigned_user: user.user_id,
    task_date: newTask.task_date,
    task_time: convertTime(newTask.task_time),
    is_completed: 0,
    time_zone: 19800,
    task_msg: newTask.task_msg,
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

export const updateTask = (taskid, editedTask) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const convertTime = (hms) => {
    const [hours, minutes] = hms.split(":");
    return +hours * 60 * 60 + +minutes * 60;
  };
  const taskBody = {
    assigned_user: user.user_id,
    task_date: editedTask.task_date,
    task_time: convertTime(editedTask.task_time),
    is_completed: 0,
    time_zone: 19800,
    task_msg: editedTask.task_msg,
  };

  return axios.put(
    `${url}/task/lead_465c14d0e99e4972b6b21ffecf3dd691/${taskid}?company_id=${user.company_id}`,
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

export const deleteTask = (task_id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return axios.delete(
    `${url}/task/lead_465c14d0e99e4972b6b21ffecf3dd691/${task_id}?company_id=${user.company_id}`,
    {
      headers: {
        Authorization: `Bearer ${user.token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
};
