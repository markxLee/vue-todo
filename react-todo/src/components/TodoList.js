import React, { useState, useEffect } from "react";
import {
  OutlinedInput,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  IconButton,
  FormControl,
  InputAdornment,
  ButtonGroup,
  Button,
} from "@mui/material/";
import AddIcon from "@mui/icons-material/Add";
import { v4 as uuidv4 } from "uuid";

function TodoList() {
  const [todoItem, setTodoItem] = useState({});
  const [todoList, setTodoList] = useState(
    JSON.parse(localStorage.getItem("todoList")) || []
  );
  const [decreaseNumber, setDecreaseNumber] = useState(todoList.length);
  const [sortByIndex, setSortByIndex] = useState(false);

  useEffect(() => {
    console.log(sortByIndex);
    setTodoList((prev) => {
      const newTodoList = prev.sort(function(a,b){
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
          setDecreaseNumber((prev) => prev && todoList.length);
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
      newTodoList = newTodoList.sort(function(a,b){
        return b.pinNumber - a.pinNumber;
      });
      return newTodoList;
    });
  };

  return (
    <FormControl sx={{ ml: 25, mt: 5, width: "75%" }} variant="outlined">
      <OutlinedInput
        id="outlined-basic"
        variant="outlined"
        color="secondary"
        fullWidth
        placeholder="Enter task"
        value={todoItem.content || ""}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleAdd}
              edge="end"
            >
              <AddIcon />
            </IconButton>
          </InputAdornment>
        }
      />
      <List sx={{ maxWidth: "100%" }}>
        {todoList.map((todo) => {
          const id = todo.id;
          const content = todo.content;
          //   const index = todo.index;
          const pinNumber = todo.pinNumber;
          const todoStatus = todo.todoStatus;
          const isChecked = todo.isChecked;
          return (
            <ListItem key={id} disablePadding>
              <ListItemIcon>
                <Checkbox
                  checked={isChecked}
                  onChange={() => handleCheck(id)}
                  disabled={todoStatus === 2}
                />
              </ListItemIcon>
              <ListItemText
                id={id}
                primary={content}
                sx={{
                  textDecoration: todoStatus === 2 ? "line-through" : "none",
                }}
              />
              <ButtonGroup
                style={{
                  display: isChecked ? "flex" : "none",
                  justifyContent: "space-between",
                }}
                disabled={todoStatus === 2}
              >
                <Button
                  style={{ flex: "1", minWidth: "83px" }}
                  variant="contained"
                  color="error"
                  onClick={() => handleRemove(id)}
                >
                  REMOVE
                </Button>
                <Button
                  style={{ flex: "1", minWidth: "83px" }}
                  variant="contained"
                  color="success"
                  onClick={() => handleDone(id)}
                >
                  DONE
                </Button>
                <Button
                  style={{ flex: "1", minWidth: "83px" }}
                  onClick={() => handlePin(id)}
                >
                  {pinNumber ? "UNPIN" : "PIN"}
                </Button>
              </ButtonGroup>
            </ListItem>
          );
        })}
      </List>
    </FormControl>
  );
}
export default TodoList;
