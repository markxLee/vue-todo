import TodoList from "./page/Todo/TodoList";
import TodoListFireBase from "./page/Todo/TodoListFireBase";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<TodoList />} />
        <Route path="localStorage" element={<TodoList />} />
        <Route path="firestore" element={<TodoListFireBase />} />
      </Routes>
    </div>
  );
}

export default App;
