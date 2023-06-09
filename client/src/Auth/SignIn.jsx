import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { useDispatch } from "react-redux";
import { ErrorModel } from "../components";
import { Login } from "../store/authSlice";
import { Button } from "flowbite-react";

const SignIn = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    userPhoto: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [preview, setPreview] = useState();
  const [loading, setLoading] = useState(false);
  const openref = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!form.userPhoto) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreview(fileReader.result);
    };
    fileReader.readAsDataURL(form.userPhoto);
  }, [form.userPhoto]);

  const handleChange = ({ target }) => {
    setForm({ ...form, [target.name]: target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // setLoading(true);
    // axios
    //   .post("https://todo-auth-i48l.onrender.com/api/users/signup", form)
    //   .then((res) => {
    //     dispatch(Login({ userId: res.data.user._id, token: res.data.token }));
    //   })
    //   .catch((err) => setError(err.response.data.message))
    //   .finally(() => {
    //     setLoading(false);
    //   });
    console.log(form)
  };

  return (
    <React.Fragment>
      <ErrorModel
        error={error}
        onClear={() => {
          setError("");
        }}
      />
      <section className="flex items-center justify-center h-[120vh] min-h-screen bg-center bg-no-repeat bg-[url('https://res.cloudinary.com/dfje97i0k/image/upload/c_scale,h_1200,w_1500/v1680861064/checklist-check-list-marker_s1mwyu.jpg')] bg-gray-700 bg-blend-multiply">
        <div className="w-[600px] text-center py-10 lg:py-14">
          <div className="w-full my-auto mx-auto max-w-lg px-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <form onSubmit={handleSubmit} className="space-y-2">
              <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                Sign up to our platform
              </h5>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm text-left font-medium text-gray-900 dark:text-white"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="ex: sharan"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm text-left font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="ex: name@company.com"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="userPhoto"
                  className="block mb-2 text-sm text-left font-medium text-gray-900 dark:text-white"
                >
                  Your Photo url
                </label>
                <div className="mx-auto flex justify-center items-center w-[50%] h-[20vh] border rounded-lg border-black mb-8">
                  <img
                    src={preview}
                    alt="preview"
                    className="w-[50%] h-[20vh]"
                  />
                </div>
                <input
                  ref={openref}
                  type="file"
                  name="userPhoto"
                  id="userPhoto"
                  placeholder="ex: https://photo.com"
                  className="hidden"
                  accept="image/jpeg"
                  onChange={({ target }) => {
                    setForm({ ...form, userPhoto: target.files[0] });
                  }}
                  required
                />
                <div className="flex justify-center">
                  <Button
                    onClick={() => {
                      openref.current.click();
                    }}
                  >
                    Upload Image
                  </Button>
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm text-left font-medium text-gray-900 dark:text-white"
                >
                  Your password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                  onChange={handleChange}
                />
              </div>
              {!loading ? (
                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Signup
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <div role="status" className="flex justify-center">
                    <svg
                      aria-hidden="true"
                      className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 flex justify-center"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                </button>
              )}
              <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                Already have an account?
                <Link
                  to="/login"
                  className="text-blue-700 hover:underline dark:text-blue-500"
                >
                  Click to Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default SignIn;
