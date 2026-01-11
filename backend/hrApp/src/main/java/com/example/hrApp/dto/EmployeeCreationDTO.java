package com.example.hrApp.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.util.Set;

@Data
@Builder
public class EmployeeCreationDTO {
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private LocalDate birthday;
    private String jobTitle;
    private String department;
    private String managerId;
    private LocalDate hiringDate;
    private LocalDate startingDate;
    private String username;
    private String password;
    private Set<String> roles;
}
