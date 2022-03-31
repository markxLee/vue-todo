package com.example.demo.entities.user;

import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "userstodo")
public class Users {

    @Id
    @Column(name = "id")
    @GeneratedValue(generator = "UUID")
    private UUID id;

    @Column(nullable = false, unique = true)
    private String username;
    @Column(name = "password")
    private String password;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
