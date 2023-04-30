import { useQuery } from "react-query";
import axios from "axios";

export const useTodoFetch = (url, headers) => {
  const todoData = useQuery("Todo Data", () => {
    return axios.get(url, headers);
  });
  return { todoData };
};
