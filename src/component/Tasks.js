import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createTask,
  updateTask,
  setEditTask,
  deleteTask,
} from "../Redux/actions/task";
import Task from "./Task";

import { MdShower } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";

const Tasks = ({ setId, tasks }) => {
  const [view, setview] = useState(false);
  const [issEdit, setIssEdit] = useState(false);
  const [postData, setPostData] = useState({
    task_msg: "",
    task_date: "",
    task_time: "",
    user: "",
  });

  const handleView = () => {
    setview(!view);
  };

  const dispatch = useDispatch();

  const allTasks = useSelector((state) => state.tasks);
  const currentPost = useSelector((state) => state.currentPost);

  const setEdit = (editId) => {
    setIssEdit(true);

    const res = allTasks.tasks.filter((task) => task.id === editId);

    const { task_msg, task_time, task_date, id } = res[0];

    const edit = {
      id,
      task_msg,
      task_date,
      task_time: new Date(task_time * 1000).toISOString().slice(11, 19),
      user: "",
    };
    setPostData(edit);
    setview(true);
  };

  const clear = () => {
    setPostData({
      id: "",
      task_msg: "",
      task_date: "",
      task_time: "",
      user: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (issEdit) {
      dispatch(updateTask(postData.id, postData));
      clear();
    } else {
      dispatch(createTask(postData));
      clear();
    }
    handleView();
  };

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  return (
    <div className="tasks">
      <div className="task-head">
        <h5>
          Task <span>{tasks?.length}</span>
        </h5>
        <div
          onClick={() => {
            handleView();
            setIssEdit(false);
            clear();
          }}
        >
          <AiOutlinePlus />
        </div>
      </div>

      <form className={view ? "task-info" : "task-info unview"}>
        <div className="description">
          <label>Task Description</label>
          <input
            type="text"
            placeholder="follow up"
            value={postData.task_msg}
            onChange={(e) =>
              setPostData({ ...postData, task_msg: e.target.value })
            }
          />
          <MdShower />
        </div>
        <div className="date-time">
          <div>
            <label>Date</label>
            <input
              type="date"
              placeholder="follow up"
              value={postData.task_date}
              onChange={(e) =>
                setPostData({ ...postData, task_date: e.target.value })
              }
            />
          </div>
          <div>
            <label>Time</label>
            <input
              type="time"
              value={postData.task_time}
              onChange={(e) =>
                setPostData({ ...postData, task_time: e.target.value })
              }
            />
          </div>
        </div>
        <div className="user">
          <label>Assign user</label>
          <input
            type="text"
            placeholder="Assign Task"
            value={postData.user}
            onChange={(e) => setPostData({ ...postData, user: e.target.value })}
          />

        </div>
        <div className="save">
          <div></div>
          <div className="btn">
            <button
              onClick={(e) => {
                e.preventDefault();
                setview(false);
                setIssEdit(false);
                clear();
              }}
            >
              cancel
            </button>
            <button onClick={handleSubmit}>{issEdit ? "Edit" : "Save"}</button>
          </div>
        </div>
      </form>

      <Task
        setEdit={setEdit}
        tasks={tasks}
        handleView={handleView}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default Tasks;
