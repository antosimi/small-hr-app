package com.example.hrApp.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class MyProfileDTO {
    private String id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String jobTitle;
    private String department;
    private String managerName;
    private LocalDate hiringDate;
    private LocalDate startingDate;
    private String image;
}
