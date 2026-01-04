package com.example.hrApp.service;

import com.example.hrApp.entity.LoginUser;
import com.example.hrApp.repository.LoginUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private LoginUserRepository loginUserRepository;

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        LoginUser user = loginUserRepository.findByUsernameAndEnabledTrue(username)
                .orElseThrow(() -> new UsernameNotFoundException("The user was not found or was disabled."));

        System.out.println("DEBUG: Parola primită din DB: [" + user.getPassword() + "]");
        // ADAUGĂ ACESTE LINII:
        System.out.println("--- DEBUG AUTH ---");
        System.out.println("User gasit: " + user.getUsername());
        System.out.println("Hash din DB: [" + user.getPassword() + "]");
        System.out.println("Lungime hash: " + (user.getPassword() != null ? user.getPassword().length() : "NULL"));
        System.out.println("------------------");

        List<SimpleGrantedAuthority> authorities = user.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role.getName()))
                .collect(Collectors.toList());

        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                user.isEnabled(),
                true,
                true,
                true,
                authorities
        );
    }
}
