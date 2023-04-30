import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { LoginPage, SignIn } from "./Auth";
import { Navbar } from "./components";
import { Home, Complete } from "./contents";
import { Login } from "./store/authSlice";

function App() {
  const { isLogin } = useSelector((state) => state.auth);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();

  useEffect(() => {
    if (token && userId) {
      axios
        .post("https://todo-auth-i48l.onrender.com", { token })
        .then((res) => {
          if (res.data.login) {
            dispatch(Login({ userId, token }));
          }
        })
        .catch((err) => {
          if (err.response.data.login) {
            localStorage.removeItem("userId");
            localStorage.removeItem("token");
          }
        });
    }
  }, []);

  const route = isLogin ? (
    <div className="bg-indigo-200 min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/complete" element={<Complete />} />
      </Routes>
    </div>
  ) : (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );

  return <React.Fragment>{route}</React.Fragment>;
}

export default App;
