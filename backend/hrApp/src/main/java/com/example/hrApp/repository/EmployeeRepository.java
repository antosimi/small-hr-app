package com.example.hrApp.repository;

import com.example.hrApp.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, UUID> {
    List<Employee> findByJobTitleStartingWith(String prefix);

//    @Query("SELECT e FROM Employee e WHERE e.jobTitle LIKE :prefix%")
//    List<Employee> findManagers(@Param("prefix") String prefix);
}
