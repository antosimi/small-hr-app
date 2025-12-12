package com.example.hrApp.service;

import com.example.hrApp.dto.ManagerDTO;
import com.example.hrApp.entity.Employee;
import com.example.hrApp.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
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


    public List<Employee> getAll() {
        return repository.findAll();
    }


    public Employee getById(UUID id) {
        return repository.findById(id).orElse(null);
    }


    public Employee create(Employee e) {
        return repository.save(e);
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
}
