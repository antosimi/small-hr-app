package com.example.hrApp.repository;

import com.example.hrApp.entity.Vacation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface VacationRepository extends JpaRepository<Vacation, UUID> {

    List<Vacation> findByEmployeeId(UUID employeeId);

    List<Vacation> findByManagerId(UUID managerId);
}
