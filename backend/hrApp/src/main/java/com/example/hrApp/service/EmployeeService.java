package com.example.hrApp.service;

import com.example.hrApp.dto.EmployeeDTO;
import com.example.hrApp.dto.ManagerDTO;
import com.example.hrApp.entity.Employee;
import com.example.hrApp.repository.EmployeeRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    @Autowired
    public EmployeeService(EmployeeRepository repository) {
        this.employeeRepository = repository;
    }


    public Page<EmployeeDTO> getAll(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Employee> employees = employeeRepository.findAll(pageable);

        // Map the Entity to DTO
        return employees.map(employee -> EmployeeDTO.builder()
                .id(employee.getId())
                .firstName(employee.getFirstName())
                .lastName(employee.getLastName())
                .email(employee.getEmail())
                .jobTitle(employee.getJobTitle())
                .department(employee.getDepartment())
                .build());
    }


    public Employee getById(UUID id) {
        return employeeRepository.findById(id).orElse(null);
    }


    @Transactional
    public void create(Employee e) {
        employeeRepository.save(e);
    }


    public Employee update(UUID id, Employee data) {
        return employeeRepository.findById(id).map(existing -> {
            existing.setFirstName(data.getFirstName());
            existing.setLastName(data.getLastName());
            existing.setEmail(data.getEmail());
            return employeeRepository.save(existing);
        }).orElse(null);
    }


    public void delete(UUID id) {
        employeeRepository.deleteById(id);
    }

    public List<ManagerDTO> getAllManagers() {
        return employeeRepository.findByJobTitleStartingWith("Manager")
                .stream()
                .map(e -> new ManagerDTO(e.getId(), e.getFirstName() + " " + e.getLastName()))
                .toList();
    }

    // SOFT DELETE
    @Transactional
    public void deactivateEmployees(List<UUID> ids ){
        if (ids == null || ids.isEmpty()) {
            throw new IllegalArgumentException("No employee IDs provided");
        }
        for(UUID id : ids) {

            Employee employee = employeeRepository.findById(id)
                    .orElseThrow(() -> new IllegalArgumentException("Employee with ID " + id + " does not exist"));

            employee.setDeletedAt(LocalDateTime.now());

            if (employee.getLoginUser() != null) {
                employee.getLoginUser().setEnabled(false);
            }

            employeeRepository.save(employee);
        }
    }

    // HARD DELETE
    @Transactional
    public void deleteEmployees(List<UUID> ids) {
        if (ids == null || ids.isEmpty()) {
            throw new IllegalArgumentException("No employee IDs provided");
        }

        for(UUID id : ids) {
            Employee employee = employeeRepository.findById(id)
                    .orElseThrow(() -> new IllegalArgumentException("Employee with ID " + id + " does not exist"));

            boolean isSoftDeleted = employee.getDeletedAt() != null;
            boolean isLoginDisabled = (employee.getLoginUser() == null) || !employee.getLoginUser().isEnabled();

            if (isSoftDeleted && isLoginDisabled) {
                employeeRepository.delete(employee);
            } else {
                throw new IllegalStateException("Can't delete a user that was not deactivated before.");
            }
        }

    }

}
