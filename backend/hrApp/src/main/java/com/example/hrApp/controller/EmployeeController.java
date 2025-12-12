package com.example.hrApp.controller;

import com.example.hrApp.dto.ManagerDTO;
import com.example.hrApp.entity.Employee;
import com.example.hrApp.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/employee")
public class EmployeeController {


    @Autowired
    private EmployeeService service;



    @GetMapping("/all")
    public List<Employee> getAll() {
        return service.getAll();
    }


    @GetMapping("/{id}")
    public ResponseEntity<Employee> getById(@PathVariable UUID id) {
        Employee e = service.getById(id);
        return e != null ? ResponseEntity.ok(e) : ResponseEntity.notFound().build();
    }


//    @PostMapping("/create")
//    public Employee create(@RequestBody Employee e) {
//        return service.create(e);
//    }

    @PostMapping(value = "/create", consumes = {"multipart/form-data"})
    public Employee create(
            @RequestPart("employee") Employee employee,
            @RequestPart(value = "image", required = false) MultipartFile imageFile
    ) throws Exception {
        if (imageFile != null && !imageFile.isEmpty()) {
            employee.setImage(imageFile.getBytes());
        }
        return service.create(employee);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Employee> update(@PathVariable UUID id, @RequestBody Employee e) {
        Employee updated = service.update(id, e);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @GetMapping("/managers/all")
    public ResponseEntity<List<ManagerDTO>> getAllManagers() {
        List<ManagerDTO> response = service.getAllManagers();
        return  ResponseEntity.ok(response);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }


}


