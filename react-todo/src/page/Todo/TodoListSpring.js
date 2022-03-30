import React, { useState, useEffect, useRef, useCallback } from "react";
import { List, FormControl } from "@mui/material/";

import TodoInput from "../../components/Todo/TodoInput/TodoInput";
import TodoItem from "../../components/Todo/TodoItem/TodoItem";
import * as Todo from "../../services/Todo";

function TodoList() {
  const [decreaseNumber, setDecreaseNumber] = useState(0);
  const [todoItem, setTodoItem] = useState({});
  const [todoList, setTodoList] = useState([]);
  const listData = useRef();
  listData.current = todoList;

  useEffect(() => {
    const getTodoList = async () => {
      const data = await Todo.index();
      let hasPinNumber = false;
      let sortByPinNumberList = data.data.map((data) => {
        if (data.pinNumber !== 0) {
          hasPinNumber = true;
        }
        return data;
      });
      if (hasPinNumber) {
        sortByPinNumberList.sort(function (a, b) {
          return b.pinNumber - a.pinNumber;
        });
      }
      setTodoList(sortByPinNumberList);
      setDecreaseNumber(sortByPinNumberList.length);
    };
    getTodoList();
  }, []);

  useEffect(() => {
    setTodoList(
      listData.current.sort(function (a, b) {
        return new Date(a.timestamp) - new Date(b.timestamp);
      })
    );
  }, [decreaseNumber]);

  const handleChange = (e) => {
    let data = {
      content: e.target.value,
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

  const handleAdd = async () => {
    const addData = await Todo.create(todoItem);
    setTodoItem({});
    setTodoList([...todoList, addData.data]);
  };

  const handleCheck = useCallback(async (id) => {
    const newList = await listData.current.map(async (data) => {
      if (data.id === id) {
        const checkData = await Todo.check(data);
        return {
          ...data,
          isChecked: checkData.data.isChecked,
        };
      }
      return data;
    });
    setTodoList(await Promise.all(newList));
  }, []);

  const handleRemove = useCallback(async (id) => {
    const data = listData.current.find((data) => data.id === id);
    const removed = await Todo.deleteTodo(data);
    if (removed.data) {
      setTodoList((prev) => {
        const newTodoList = prev.filter((todo) => todo.id !== id);
        return newTodoList;
      });
    }
  }, []);

  const handleDone = useCallback(async (id) => {
    const newList = await listData.current.map(async (data) => {
      if (data.id === id) {
        const checkData = await Todo.done(data);
        return {
          ...data,
          todoStatus: checkData.data.todoStatus,
        };
      }
      return data;
    });
    setTodoList(await Promise.all(newList));
  }, []);

  const handlePin = useCallback(
    async (id) => {
      setTodoList((prev) => {
        const itemPinCounts =
          prev.filter((data) => data.pinNumber !== 0).length || 0;
        let newTodoList = prev.map((data) => {
          if (data.id === id) {
            const isNotPinned = !data.pinNumber ? true : false;
            setDecreaseNumber((prev) => prev || prev.length - itemPinCounts);
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
            } else {
              data.pinNumber = 0;
              setDecreaseNumber(decreaseNumber + 1);
            }
            return {
              ...data,
            };
          }
          return data;
        });

        newTodoList.sort(function (a, b) {
          return b.pinNumber - a.pinNumber;
        });
        return newTodoList;
      });
      const data = listData.current.find((data) => data.id === id);
      await Todo.pin(data);
    },
    [decreaseNumber]
  );

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
