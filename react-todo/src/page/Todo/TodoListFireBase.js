import React, { useState, useEffect, useRef, useCallback } from "react";
import { List, FormControl } from "@mui/material/";

import TodoInput from "../../components/Todo/TodoInput/TodoInput";
import TodoItem from "../../components/Todo/TodoItem/TodoItem";
import db from "../../firebase-config";
import {
  collection,
  query,
  orderBy,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";

function TodoList() {
  const [todoItem, setTodoItem] = useState({});
  const [todoList, setTodoList] = useState([]);
  const [decreaseNumber, setDecreaseNumber] = useState(0);
  const [sortByIndex, setSortByIndex] = useState(false);
  const listData = useRef();
  listData.current = todoList;

  useEffect(() => {
    const todoListRef = collection(db, "todos");
    const listIncreaseQuery = query(todoListRef, orderBy("timestamp", "asc"));
    const getTodoList = async () => {
      const data = await getDocs(listIncreaseQuery);
      let hasPinNumber = false;
      let sortByPinNumberList = data.docs.map((doc) => {
        if (doc.data().pinNumber !== 0) {
          hasPinNumber = true;
        }
        return {
          ...doc.data(),
          id: doc.id,
        };
      });
      if (hasPinNumber) {
        sortByPinNumberList.sort(function (a, b) {
          return b.pinNumber - a.pinNumber;
        });
      }
      setTodoList(() => {
        setDecreaseNumber(data.docs.length);
        return sortByPinNumberList;
      });
    };
    getTodoList();
  }, []);

  useEffect(() => {
    setTodoList((prev) => {
      return prev.sort(function (a, b) {
        return a.index - b.index;
      });
    });
  }, [sortByIndex]);

  const handleChange = (e) => {
    let data = {
      content: e.target.value,
      timestamp: serverTimestamp(),
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
    const todoListRef = collection(db, "todos");
    const docRef = await addDoc(todoListRef, todoItem);

    setTodoItem((prev) => {
      const newTodoItem = {
        ...prev,
        id: docRef.id,
      };
      setTodoList([...todoList, newTodoItem]);
      return newTodoItem;
    });
    setTodoItem({});
  };

  const handleCheck = useCallback(async (id) => {
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
      return newTodoList;
    });

    const docRef = doc(db, "todos", id);
    const todoList = listData.current;
    const isChecked = todoList.find((todoItem) => todoItem.id === id).isChecked;
    const payload = { isChecked: !isChecked };
    await updateDoc(docRef, payload);
  }, []);

  const handleRemove = useCallback(async (id) => {
    setTodoList((prev) => {
      const newTodoList = prev.filter((todo) => todo.id !== id);
      return newTodoList;
    });

    const docRef = doc(db, "todos", id);
    await deleteDoc(docRef);
  }, []);

  const handleDone = useCallback(async (id) => {
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
      return newTodoList;
    });

    const docRef = doc(db, "todos", id);
    const payload = { todoStatus: 2 };
    await updateDoc(docRef, payload);
  }, []);

  const handlePin = useCallback(
    async (id) => {
      setTodoList((prev) => {
        const itemPinCounts =
          prev.filter((data) => data.pinNumber !== 0).length || 0;
        let newTodoList = prev.map((data) => {
          if (data.id === id) {
            const isNotPinned = !data.pinNumber ? true : false;
            setDecreaseNumber((prev) => prev && prev.length - itemPinCounts);
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

        newTodoList.sort(function (a, b) {
          return b.pinNumber - a.pinNumber;
        });
        return newTodoList;
      });
      const docRef = doc(db, "todos", id);
      const todoList = listData.current;
      const pinNumber = todoList.find(
        (todoItem) => todoItem.id === id
      ).pinNumber;
      const payload = { pinNumber: pinNumber };
      await updateDoc(docRef, payload);
    },
    [decreaseNumber, sortByIndex]
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
