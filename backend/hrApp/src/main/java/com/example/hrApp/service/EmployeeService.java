package com.example.hrApp.service;

import com.example.hrApp.dto.ManagerDTO;
import com.example.hrApp.entity.Employee;
import com.example.hrApp.repository.EmployeeRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class EmployeeService {

    private final EmployeeRepository repository;

    @Autowired
    public EmployeeService(EmployeeRepository repository) {
        this.repository = repository;
    }


    public Page<Employee> getAll(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return repository.findAll(pageable);
    }


    public Employee getById(UUID id) {
        return repository.findById(id).orElse(null);
    }


    @Transactional
    public void create(Employee e) {
        repository.save(e);
    }


    public Employee update(UUID id, Employee data) {
        return repository.findById(id).map(existing -> {
            existing.setFirstName(data.getFirstName());
            existing.setLastName(data.getLastName());
            existing.setEmail(data.getEmail());
            return repository.save(existing);
        }).orElse(null);
    }


    public void delete(UUID id) {
        repository.deleteById(id);
    }

    public List<ManagerDTO> getAllManagers() {
        return repository.findByJobTitleStartingWith("Manager")
                .stream()
                .map(e -> new ManagerDTO(e.getId(), e.getFirstName() + " " + e.getLastName()))
                .toList();
    }

    @Transactional
    public void deleteEmployees(List<UUID> ids) {
        if (ids == null || ids.isEmpty()) {
            throw new IllegalArgumentException("No employee IDs provided");
        }
        repository.deleteAllById(ids);
    }
}
