import reportWebVitals from "./reportWebVitals";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import TodoList from "./page/Todo/TodoList";
import TodoListFireBase from "./page/Todo/TodoListFireBase";
import TodoListSpring from "./page/Todo/TodoListSpring";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
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
