import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./Redux/actions/auth";
import { fetchTasks } from "./Redux/actions/task";

import "./asset/styles/style.scss";
import * as api from "./api";

import Tasks from "./component/Tasks";

const App = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const tasks = useSelector((state) => state.tasks.tasks);

  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const auth = async () => {
      try {
        setLoading(true);
        const userData = {
          email: "smithwills1989@gmail.com",
          password: "12345678",
        };
        const { data } = await api.loginUser(userData);
        dispatch(loginUser(data));
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(false);
      }
    };
    auth();
  }, []);

  return (
    <div className="app">
      {loading && !error && <div>Loading ....</div>}
      {error && (
        <div>
          <h1>Something went wrong with the authentication </h1>
          <h3>Kindly reload page</h3>
        </div>
      )}
      {!error && !loading && (
        <>
          <div className="header"></div>
          <div className="sidebar"></div>
          <Tasks id={id} setId={setId} tasks={tasks} />
        </>
      )}
    </div>
  );
};

export default App;
