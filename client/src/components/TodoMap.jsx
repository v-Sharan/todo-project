import React from "react";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import axios from "axios";

const TodoMap = ({ title, completed, _id, refetch, options }) => {
  const navigate = useNavigate();
  const handleComplete = () => {
    axios
      .patch(`http://localhost:8080/api/todo/${_id}`, { data: "hi" }, options)
      .then(() => {
        navigate("/complete");
        refetch();
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:8080/api/todo/${_id}`, options)
      .then(() => refetch());
  };

  return (
    <div className="bg-gray-700 group cursor-pointer rounded-lg">
      <div className="flex justify-between group-hover:bg-teal-400 p-4 group-hover:rounded-lg text-white">
        {title}
        <div className="flex items-center gap-5">
          <div className="tooltip" data-tip="Delete">
            <FaTrashAlt color="white" onClick={handleDelete} />
          </div>
          {!completed && (
            <div className="tooltip" data-tip="Make as complete">
              <FaCheck color="white" onClick={handleComplete} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoMap;
