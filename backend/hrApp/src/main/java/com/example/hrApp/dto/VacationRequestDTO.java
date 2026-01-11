package com.example.hrApp.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class VacationRequestDTO {
    private String employeeId; // String to match your Employee ID
    private LocalDate startDate;
    private LocalDate endDate;
}