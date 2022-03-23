import React from "react";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  ButtonGroup,
  Button,
} from "@mui/material/";

function TodoItem({ data, ...event }) {
  let { id, content, pinNumber, todoStatus, isChecked } = data;
  const {onCheck, onRemove, onDone, onPin} = event;

  return (
    <ListItem disablePadding>
      <ListItemIcon>
        <Checkbox
          checked={isChecked}
          onChange={() => onCheck(id)}
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
          onClick={() => onRemove(id)}
        >
          REMOVE
        </Button>
        <Button
          style={{ flex: "1", minWidth: "83px" }}
          variant="contained"
          color="success"
          onClick={() => onDone(id)}
        >
          DONE
        </Button>
        <Button
          style={{ flex: "1", minWidth: "83px" }}
          onClick={() => onPin(id)}
        >
          {pinNumber ? "UNPIN" : "PIN"}
        </Button>
      </ButtonGroup>
    </ListItem>
  );
}

export default TodoItem;
