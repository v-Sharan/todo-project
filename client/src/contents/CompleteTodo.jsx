import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TodoMap } from "../components";
import { todoStore } from "../store/todoSlice";
import { useTodoFetch } from "../hook/use-TodoFetch";
import { ErrorModel } from "../components";
import { useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";

const CompleteTodo = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const user = localStorage.getItem("userId");
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const { completed_todo } = useSelector((state) => state.userTodo);

  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { todoData } = useTodoFetch(
    `https://todo-auth-i48l.onrender.com/api/todo/${user}`,
    options
  );

  if (todoData?.isError) {
    setError(todoData.error);
  }

  useEffect(() => {
    if (!!todoData?.data?.data?.completed_todo) {
      dispatch(
        todoStore({
          completed_todo: todoData?.data?.data?.completed_todo,
        })
      );
    }
  }, [todoData?.data?.data?.completed_todo]);

  return (
    <React.Fragment>
      <ErrorModel
        error={error}
        onClear={() => {
          setError("");
        }}
      />
      <div className="flex flex-col justify-center items-center min-h-[80vh]">
        <div className="text-5xl font-semibold">Completed Todo</div>
        <div className="flex flex-col mt-10 gap-4 w-[55vh]">
          {completed_todo?.length === 0 && (
            <div className="text-center font-bold bg-white p-5 rounded-md">
              Todo Not found!
              <div className="flex justify-center mt-4">
                <Button onClick={() => navigate("/")}>Go to Home</Button>
              </div>
            </div>
          )}
          {completed_todo?.map((todo) => (
            <TodoMap
              key={`${todo._id}`}
              {...todo}
              options={options}
              refetch={todoData.refetch}
            />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default CompleteTodo;
