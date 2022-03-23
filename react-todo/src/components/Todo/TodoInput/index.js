import React from "react";
import { OutlinedInput, IconButton, InputAdornment } from "@mui/material/";
import AddIcon from "@mui/icons-material/Add";

function TodoInput({ data, listLength, ...event }) {
  const { onAdd, onDataChange, onEnterDown } = event;

  return (
    <OutlinedInput
      id="outlined-basic"
      variant="outlined"
      color="secondary"
      fullWidth
      placeholder="Enter task"
      value={data}
      onChange={onDataChange}
      onKeyDown={onEnterDown}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={onAdd}
            edge="end"
          >
            <AddIcon />
          </IconButton>
        </InputAdornment>
      }
    />
  );
}

export default TodoInput;
