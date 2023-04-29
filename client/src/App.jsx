import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { LoginPage, SignIn } from "./Auth";
import { Home } from "./contents";
import { Login } from "./store/authSlice";

function App() {
  const { isLogin } = useSelector((state) => state.auth);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      axios
        .post("http://localhost:8080", token)
        .then((res) => {
          // dispatch(Login({ userId: res.data._id }));
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("no token found");
    }
  }, []);

  const route = isLogin ? (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  ) : (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );

  return <React.Fragment>{route}</React.Fragment>;
}

export default App;
