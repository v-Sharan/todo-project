import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { LogOut } from "../../store/authSlice";
import { Button } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { UserData } from "../../store/userSlice";
import { ErrorModel } from "..";
import axios from "axios";

const NavBar = () => {
  const userDataRedux = useSelector((state) => state.auth);
  const user = useSelector((state) => state.userData.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/users/${userDataRedux.userId}`)
      .then((res) => {
        dispatch(UserData({ user: res.data.user }));
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  }, []);

  return (
    <React.Fragment>
      <ErrorModel
        error={error}
        onClear={() => {
          setError("");
        }}
      />
      <nav className="border-gray-200 bg-[#6a00f4]  dark:bg-gray-900 shadow-lg">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" className="flex items-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS27MZDQYf1Mo7PYVBY2Z6Etc0ncpgy6JPiaJ_y7H2mug&s"
              className="h-12 w-12 mr-3 rounded-full"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
              Todo List
            </span>
          </Link>
          <div className="flex items-center md:order-2">
            <div className="dropdown dropdown-end dropdown-hover">
              <button
                id="dropdownHoverButton"
                type="button"
                className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                aria-expanded="false"
                tabIndex={0}
              >
                <img
                  className="w-12 h-12 rounded-full"
                  src={user.userPhoto}
                  alt="user photo"
                />
              </button>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow-lg bg-base-100 rounded-box w-52 border"
              >
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `${isActive && "text-white bg-violet-700"}`
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/complete"}
                    className={({ isActive }) =>
                      `${isActive && "text-white bg-violet-700"}`
                    }
                  >
                    Completed
                  </NavLink>
                </li>
                <li>
                  <Button
                    onClick={() => {
                      dispatch(LogOut());
                      navigate("/");
                    }}
                  >
                    Sign out
                  </Button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default NavBar;
