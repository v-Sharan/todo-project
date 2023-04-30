import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { ErrorModel } from "./index";
import axios from "axios";

const TodoMap = ({ title, completed, _id, refetch, options }) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const handleComplete = () => {
    axios
      .patch(`https://todo-auth-i48l.onrender.com/api/todo/${_id}`, { data: "hi" }, options)
      .then((res) => {
        setMessage(res.data.message);
        setTimeout(() => {
          navigate("/complete");
        }, 1000);
        refetch();
      })
      .catch((err) => setError(err.response.data.message));
  };

  const handleDelete = () => {
    axios
      .delete(`https://todo-auth-i48l.onrender.com/api/todo/${_id}`, options)
      .then((res) => {
        setMessage(res.data.message);
        setTimeout(() => {
          refetch();
        }, 1000);
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };

  return (
    <React.Fragment>
      <ErrorModel
        error={error}
        onClear={() => {
          setError("");
        }}
      />
      {!!message && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-success">
            <div>
              <span>{message}</span>
            </div>
          </div>
        </div>
      )}
      <div className="bg-gray-700 group cursor-pointer rounded-lg">
        <div className="flex justify-between group-hover:bg-teal-300 p-4 group-hover:rounded-lg text-white font-semibold text-xl group-hover:text-black">
          {title}
          <div className="flex items-center gap-5">
            <div className="tooltip" data-tip="Delete">
              <FaTrashAlt onClick={handleDelete} />
            </div>
            {!completed && (
              <div className="tooltip" data-tip="Make as complete">
                <FaCheck onClick={handleComplete} />
              </div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default TodoMap;
