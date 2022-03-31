package com.example.demo.repositories.user;

import java.util.UUID;

import com.example.demo.entities.user.Users;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<Users, UUID> {
    Users findByUsername(String username);
}
