import React, { useState, useEffect } from "react";
import { List, FormControl } from "@mui/material/";
import { v4 as uuidv4 } from "uuid";

import TodoInput from "../../components/Todo/TodoInput/TodoInput";
import TodoItem from "../../components/Todo/TodoItem/TodoItem";

function TodoList() {
  const [todoItem, setTodoItem] = useState({});
  const [todoList, setTodoList] = useState(
    JSON.parse(localStorage.getItem("todoList")) || []
  );
  const [decreaseNumber, setDecreaseNumber] = useState(todoList.length);
  const [sortByIndex, setSortByIndex] = useState(false);

  useEffect(() => {
    setTodoList((prev) => {
      const newTodoList = prev.sort(function (a, b) {
        return a.index - b.index;
      });
      return newTodoList;
    });
  }, [sortByIndex]);

  const handleChange = (e) => {
    let data = {
      id: uuidv4(),
      content: e.target.value,
      index: +todoList.length + 1,
      pinNumber: 0,
      todoStatus: 1,
      isChecked: false,
    };
    setTodoItem(data);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleAdd();
    }
  };

  const handleAdd = () => {
    setTodoList((prev) => {
      const newTodoList = [...prev, todoItem];
      localStorage.setItem("todoList", JSON.stringify(newTodoList));
      return newTodoList;
    });
    setTodoItem({});
  };

  const handleCheck = (id) => {
    setTodoList((prev) => {
      const newTodoList = prev.map((data) => {
        if (data.id === id) {
          return {
            ...data,
            isChecked: !data.isChecked,
          };
        }
        return data;
      });
      localStorage.setItem("todoList", JSON.stringify(newTodoList));
      return newTodoList;
    });
  };

  const handleRemove = (id) => {
    const newTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(() => {
      localStorage.setItem("todoList", JSON.stringify(newTodoList));
      return newTodoList;
    });
  };

  const handleDone = (id) => {
    setTodoList((prev) => {
      const newTodoList = prev.map((data) => {
        if (data.id === id) {
          return {
            ...data,
            todoStatus: 2,
          };
        }
        return data;
      });
      localStorage.setItem("todoList", JSON.stringify(newTodoList));
      return newTodoList;
    });
  };

  const handlePin = (id) => {
    setTodoList((prev) => {
      let newTodoList = prev.map((data) => {
        if (data.id === id) {
          const isNotPinned = !data.pinNumber ? true : false;
          setDecreaseNumber((prev) => prev || todoList.length);
          if (isNotPinned) {
            if (data.pinNumber === 0) {
              data.pinNumber = decreaseNumber;
              setDecreaseNumber(decreaseNumber - 1);
            } else {
              if (data.pinNumber !== 0 && data.pinNumber < decreaseNumber) {
                data.pinNumber = decreaseNumber;
                setDecreaseNumber(decreaseNumber - 1);
              }
            }
            setSortByIndex(!sortByIndex);
          } else {
            data.pinNumber = 0;
            setDecreaseNumber(decreaseNumber + 1);
            setSortByIndex(!sortByIndex);
          }
          return {
            ...data,
          };
        }
        return data;
      });
      localStorage.setItem("todoList", JSON.stringify(newTodoList));
      newTodoList = newTodoList.sort(function (a, b) {
        return b.pinNumber - a.pinNumber;
      });
      return newTodoList;
    });
  };

  return (
    <FormControl sx={{ ml: 25, mt: 5, width: "75%" }} variant="outlined">
      <TodoInput
        data={todoItem.content || ""}
        listLength={todoList.length}
        onAdd={handleAdd}
        onDataChange={handleChange}
        onEnterDown={handleKeyDown}
      ></TodoInput>
      <List sx={{ maxWidth: "100%" }}>
        {todoList.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              data={todo}
              onCheck={handleCheck}
              onRemove={handleRemove}
              onDone={handleDone}
              onPin={handlePin}
            ></TodoItem>
          );
        })}
      </List>
    </FormControl>
  );
}
export default TodoList;
