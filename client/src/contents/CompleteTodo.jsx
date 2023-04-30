import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TodoMap } from "../components";
import { todoStore } from "../store/todoSlice";
import { useTodoFetch } from "../hook/use-TodoFetch";

const CompleteTodo = () => {
  const token = useSelector((state) => state.auth.token);
  const user = localStorage.getItem("userId");
  const dispatch = useDispatch();
  const { completed_todo, Todo } = useSelector((state) => state.userTodo);
  console.log(completed_todo, Todo);
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { todoData } = useTodoFetch(
    `http://localhost:8080/api/todo/${user}`,
    options
  );

  useEffect(() => {
    if (!!todoData?.data?.data) {
      dispatch(
        todoStore({
          completed_todo: todoData?.data?.data?.completed_todo,
        })
      );
    }
  }, [todoData?.data?.data?.completed_todo]);

  return (
    <div className="flex flex-col justify-center items-center min-h-[80vh]">
      <div className="text-5xl font-semibold">Completed Todo</div>
      <div className="flex flex-col mt-10 gap-4 w-[55vh]">
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
  );
};

export default CompleteTodo;
