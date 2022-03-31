package com.example.demo.services.user;

import com.example.demo.auth.payload.CustomUserDetails;
import com.example.demo.entities.user.Users;
import com.example.demo.repositories.user.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository usRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Users user = usRepository.findByUsername(username);
        return new CustomUserDetails(user);
    }
}
