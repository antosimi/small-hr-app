package com.example.hrApp.service;

import com.example.hrApp.dto.VacationRequestDTO;
import com.example.hrApp.dto.VacationResponseDTO;
import com.example.hrApp.entity.Employee;
import com.example.hrApp.entity.Vacation;
import com.example.hrApp.enums.RequestStatus;
import com.example.hrApp.repository.EmployeeRepository;
import com.example.hrApp.repository.VacationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class VacationService {

    @Autowired
    private  VacationRepository vacationRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    public Vacation createRequest(VacationRequestDTO dto) {
        Employee emp = employeeRepository.findById(UUID.fromString(dto.getEmployeeId()))
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        Vacation request = Vacation.builder()
                .employeeId(UUID.fromString(dto.getEmployeeId()))
                .employeeName(emp.getFirstName() + " " + emp.getLastName())
                .managerId(emp.getManager()!=null?UUID.fromString(emp.getManager()):null)
                .startDate(dto.getStartDate())
                .endDate(dto.getEndDate())
                .status(RequestStatus.PENDING)
                .build();

        return vacationRepository.save(request);
    }

    public Vacation updateStatus(String requestId, VacationResponseDTO dto) {
        Vacation request = vacationRepository.findById(UUID.fromString(requestId))
                .orElseThrow(() -> new RuntimeException("Request not found"));

        request.setStatus(RequestStatus.valueOf(dto.getStatus().toUpperCase()));
        request.setManagerNote(dto.getNote());

        return vacationRepository.save(request);
    }


    public List<Vacation> getRequestsByEmployee(String employeeId) {
        return vacationRepository.findByEmployeeId(UUID.fromString(employeeId));
    }


    public List<Vacation> getRequestsByManager(String managerId) {
        return vacationRepository.findByManagerId(UUID.fromString(managerId));
    }

}

