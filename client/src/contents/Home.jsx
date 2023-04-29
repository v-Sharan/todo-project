import React from "react";
import { Button } from "flowbite-react";

import { useDispatch } from "react-redux";
import { LogOut } from "../store/authSlice";

const Home = () => {
  const dispatch = useDispatch();
  return (
    <Button
      onClick={() => {
        dispatch(LogOut());
      }}
    >
      Logout
    </Button>
  );
};

export default Home;
