package com.example.hrApp.service;

import com.example.hrApp.entity.LoginUser;
import com.example.hrApp.repository.LoginUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
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
    @Lazy
    private LoginUserRepository loginUserRepository;

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return loginUserRepository.findByUsernameAndEnabledTrue(username)
                .orElseThrow(() -> new UsernameNotFoundException("The user was not found or was disabled."));
    }

}
