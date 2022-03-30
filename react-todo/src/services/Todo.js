import { apiData } from "./Api";

const index = () => {
  return apiData().get("/todolist");
};
const create = (payload) => {
  return apiData().post("/add-todo", payload);
};
const deleteTodo = (payload) => {
  return apiData().delete("/delete-todo", { data: payload });
};
const done = (payload) => {
  return apiData().put("/update-todo-status", payload);
};
const check = (payload) => {
  return apiData().put("/update-check", payload);
};
const pin = (payload) => {
  return apiData().put("/update-pin-number", payload);
};

export { index, create, deleteTodo, done, check, pin };
