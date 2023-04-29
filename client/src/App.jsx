import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Login, SignIn } from "./Auth";
import { Home } from "./contents";
import React from "react";

function App() {
  const { isLogin } = useSelector((state) => state.auth);

  const route = isLogin ? (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  ) : (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );

  return <React.Fragment>{route}</React.Fragment>;
}

export default App;
