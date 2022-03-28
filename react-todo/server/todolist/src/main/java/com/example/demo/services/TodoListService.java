package com.example.demo.services;

import java.util.List;

import com.example.demo.entities.TodoList;
import com.example.demo.repositories.TodoListRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TodoListService {

    @Autowired
    TodoListRepository todoListRepository;

    public TodoListService() {

    }

    public List<TodoList> getTodoList() {
        return todoListRepository.findAll();
    }

    public TodoList saveTodoList(TodoList todoList) {
        return todoListRepository.save(todoList);
    }

    public TodoList updateTodoStatus(TodoList todoList) {
        TodoList todo = todoListRepository.findById(todoList.getId())
                .orElseThrow(() -> new RuntimeException("Compte Introublevable"));
        ;
        todo.setTodoStatus(2);
        return todoListRepository.save(todo);
    }

    public TodoList updatePinNumber(TodoList todoList) {
        TodoList todo = todoListRepository.findById(todoList.getId())
                .orElseThrow(() -> new RuntimeException("Compte Introublevable"));
        ;
        todo.setPinNumber(todoList.getPinNumber());
        return todoListRepository.save(todo);
    }

    public TodoList updateCheck(TodoList todoList) {
        TodoList todo = todoListRepository.findById(todoList.getId())
                .orElseThrow(() -> new RuntimeException("Compte Introublevable"));
        ;
        todo.setIsChecked(!todoList.getIsChecked());
        return todoListRepository.save(todo);
    }

    public Boolean deleteTodo(TodoList todoList) {
        todoListRepository.deleteById(todoList.getId());
        return true;
    }
}
