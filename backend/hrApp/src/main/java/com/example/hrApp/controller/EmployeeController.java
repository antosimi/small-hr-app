package com.example.hrApp.controller;

import com.example.hrApp.dto.EmployeeDTO;
import com.example.hrApp.dto.ManagerDTO;
import com.example.hrApp.dto.PagedResponse;
import com.example.hrApp.entity.Employee;
import com.example.hrApp.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/employee")
public class EmployeeController {


    @Autowired
    private EmployeeService employeeService;


    @GetMapping("/all")
    public ResponseEntity<PagedResponse<EmployeeDTO>> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Page<EmployeeDTO> pageResult = employeeService.getAll(page, size);

        return ResponseEntity.ok(
                new PagedResponse<>(
                        pageResult.getContent(),
                        pageResult.getTotalElements()
                )
        );
    }



    @GetMapping("/{id}")
    public ResponseEntity<Employee> getById(@PathVariable UUID id) {
        Employee e = employeeService.getById(id);
        return e != null ? ResponseEntity.ok(e) : ResponseEntity.notFound().build();
    }


    @PostMapping(value = "/create", consumes = {"multipart/form-data"})
    //@PreAuthorize("hasAnyRole('ADMIN', 'HR')")
    public ResponseEntity<Void> create(
            @RequestPart("employee") Employee employee,
            @RequestPart(value = "image", required = false) MultipartFile imageFile
    ) throws Exception {
        if (imageFile != null && !imageFile.isEmpty()) {
            employee.setImage(imageFile.getBytes());
        }
         employeeService.create(employee);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }


    @PutMapping("/{id}")
    public ResponseEntity<Employee> update(@PathVariable UUID id, @RequestBody Employee e) {
        Employee updated = employeeService.update(id, e);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @GetMapping("/managers/all")
    public ResponseEntity<List<ManagerDTO>> getAllManagers() {
        List<ManagerDTO> response = employeeService.getAllManagers();
        return  ResponseEntity.ok(response);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        employeeService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/delete")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteEmployees(
            @RequestBody List<UUID> ids
    ) {
        employeeService.deleteEmployees(ids);
        return ResponseEntity.noContent().build();
    }


}


