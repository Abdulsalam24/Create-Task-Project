import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, setEditTask } from "../Redux/actions/task";

import { MdModeEditOutline } from "react-icons/md";
import { GrCheckmark } from "react-icons/gr";
import { FaBell } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";

import fruit from "../asset/img/fruit.jpg";

const Task = ({ handleView, handleDelete, setEdit }) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  return (
    <div className="single-task">
      {tasks.tasks &&
        tasks.tasks?.map((item) => (
          <div className="task" key={item.id}>
            <div className="info">
              <img src={fruit} alt="img" />
              <div>
                <h6>{item.task_msg}</h6>
                <span>{item.task_date_time_in_utc_string}</span>
              </div>
            </div>
            <div className="icons flex">
              <div onClick={() => handleDelete(item.id)}>
                <RiDeleteBin5Line />
              </div>
              <div onClick={() => setEdit(item.id)}>
                <MdModeEditOutline />
              </div>

              <div className="flex">
                <div>
                  <FaBell />
                </div>
                <div>
                  <GrCheckmark />
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Task;
