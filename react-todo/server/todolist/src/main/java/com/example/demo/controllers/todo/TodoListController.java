package com.example.demo.controllers.todo;

import java.util.List;

import com.example.demo.entities.todo.TodoList;
import com.example.demo.services.todo.TodoListService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "*")
public class TodoListController {
    @Autowired
    TodoListService todoListService;

    @GetMapping("todolist")
    public List<TodoList> getTodoList() {
        return todoListService.getTodoList();
    }

    @PostMapping("add-todo")
    public TodoList saveTodoList(@RequestBody TodoList todoList){
        return todoListService.saveTodoList(todoList);
    }

    @PutMapping("update-todo-status")
    public TodoList updateTodoStatus(@RequestBody TodoList todoList){
        return todoListService.updateTodoStatus(todoList);
    }

    @PutMapping("update-pin-number")
    public TodoList updatePinNumber(@RequestBody TodoList todoList){
        return todoListService.updatePinNumber(todoList);
    }

    @PutMapping("update-check")
    public TodoList updateCheck(@RequestBody TodoList todoList){
        return todoListService.updateCheck(todoList);
    }

    @DeleteMapping("delete-todo")
    public Boolean deleteTodo(@RequestBody TodoList todoList){
        return todoListService.deleteTodo(todoList);
    }
}
