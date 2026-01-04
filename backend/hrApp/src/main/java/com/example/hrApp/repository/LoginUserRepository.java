package com.example.hrApp.repository;

import com.example.hrApp.entity.LoginUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface LoginUserRepository extends JpaRepository<LoginUser, UUID> {

    Optional<LoginUser> findByUsernameAndEnabledTrue(String username);
}

