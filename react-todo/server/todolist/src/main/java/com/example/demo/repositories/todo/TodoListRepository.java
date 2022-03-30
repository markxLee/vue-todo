package com.example.demo.repositories.todo;

import java.util.UUID;

import com.example.demo.entities.todo.TodoList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TodoListRepository extends JpaRepository<TodoList, UUID> {
}
