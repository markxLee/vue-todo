import reportWebVitals from "./reportWebVitals";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import Login from "./page/auth/Login";
import TodoList from "./page/todo/TodoList";
import TodoListFireBase from "./page/todo/TodoListFireBase";
import TodoListSpring from "./page/todo/TodoListSpring";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/login" element={<Login />} />
        <Route path="/localStorage" element={<TodoList />}></Route>
        <Route path="/firestore" element={<TodoListFireBase />}></Route>
        <Route path="/spring" element={<TodoListSpring />}></Route>
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
