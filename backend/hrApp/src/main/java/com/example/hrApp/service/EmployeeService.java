package com.example.hrApp.service;

import com.example.hrApp.dto.EmployeeCreationDTO;
import com.example.hrApp.dto.EmployeeDTO;
import com.example.hrApp.dto.ManagerDTO;
import com.example.hrApp.dto.MyProfileDTO;
import com.example.hrApp.entity.Employee;
import com.example.hrApp.entity.LoginUser;
import com.example.hrApp.entity.Role;
import com.example.hrApp.entity.UserRole;
import com.example.hrApp.repository.EmployeeRepository;
import com.example.hrApp.repository.LoginUserRepository;
import com.example.hrApp.repository.RoleRepository;
import com.example.hrApp.repository.UserRoleRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class EmployeeService {

    @Autowired
    private  EmployeeRepository employeeRepository;

    @Autowired
    private LoginUserRepository loginUserRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRoleRepository userRoleRepository;

    @Autowired
    private RoleRepository roleRepository;



    public Page<EmployeeDTO> getAll(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Employee> employees = employeeRepository.findAll(pageable);

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

    public MyProfileDTO getProfileData(UUID id){
        Employee e = employeeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Employee not found with id: " + id));

        String managerFullName = "N/A";
        if (e.getManager() != null) {
            Employee manager = employeeRepository.findById(UUID.fromString(e.getManager()))
                    .orElseThrow(() -> new EntityNotFoundException("Manager not found with id: " + UUID.fromString(e.getManager())));
            managerFullName = manager.getFirstName() + " " + manager.getLastName();
        }

        String base64Image = null;
        if (e.getImage() != null && e.getImage().length > 0) {
            // The prefix "data:image/png;base64," (or image/jpeg) is vital for the <img> tag
            base64Image = "data:image/png;base64," + Base64.getEncoder().encodeToString(e.getImage());
        }


        return  MyProfileDTO.builder()
                .id(e.getId().toString())
                .firstName(e.getFirstName())
                .lastName(e.getLastName())
                .email(e.getEmail())
                .phone(e.getPhone())
                .jobTitle(e.getJobTitle())
                .department(e.getDepartment())
                .managerName(managerFullName)
                .hiringDate(e.getHiringDate())
                .startingDate(e.getStartingDate())
                .image(base64Image)
                .build();
    }


    @Transactional
    public void create(Employee e) {
        employeeRepository.save(e);
    }

    public void createEmployeeWithLogin(EmployeeCreationDTO dto, MultipartFile imageFile ) throws IOException {
       // Save employee
        Employee employee = new Employee();
        employee.setFirstName(dto.getFirstName());
        employee.setLastName(dto.getLastName());
        employee.setEmail(dto.getEmail());
        employee.setPhone(dto.getPhone());
        employee.setJobTitle(dto.getJobTitle());
        employee.setDepartment(dto.getDepartment());
        employee.setHiringDate(dto.getHiringDate());
        employee.setStartingDate(dto.getStartingDate());
        employee.setBirthday(dto.getBirthday());
        employee.setManager(dto.getManagerId());
        if (imageFile != null && !imageFile.isEmpty()) {
            employee.setImage(imageFile.getBytes());
        }

        Employee savedEmployee = employeeRepository.save(employee);

        // Save login user
        LoginUser loginUser = new LoginUser();
        loginUser.setUsername(dto.getUsername());
        loginUser.setPassword(passwordEncoder.encode(dto.getPassword()));
        loginUser.setEnabled(true);
        loginUser.setEmployee(savedEmployee);

        loginUserRepository.save(loginUser);


        Set<Role> roles = new HashSet<>();
        if(dto.getRoles()!=null) {
            if(dto.getRoles().isEmpty()){
                Role defaultRole = roleRepository.findByName("EMPLOYEE")
                        .orElseThrow(() -> new IllegalArgumentException("Default role EMPLOYEE not found"));
                roles.add(defaultRole);
            }
            for (String roleName : dto.getRoles()) {
                roleRepository.findByName(roleName).ifPresent(roles::add);
            }
            loginUser.setRoles(roles);
        }

        loginUserRepository.save(loginUser);
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
