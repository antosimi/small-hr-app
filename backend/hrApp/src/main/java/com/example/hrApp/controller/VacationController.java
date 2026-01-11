package com.example.hrApp.controller;

import com.example.hrApp.dto.VacationRequestDTO;
import com.example.hrApp.dto.VacationResponseDTO;
import com.example.hrApp.entity.Vacation;
import com.example.hrApp.service.VacationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vacations")
@RequiredArgsConstructor
public class VacationController {

    private final VacationService vacationService;

    // Create request using the DTO
    @PostMapping("/createVacation")
    public ResponseEntity<Vacation> create(@RequestBody VacationRequestDTO dto) {
        return ResponseEntity.ok(vacationService.createRequest(dto));
    }

    // Approve/Reject using the Response DTO
    @PatchMapping("/{id}/status")
    public ResponseEntity<Vacation> updateStatus(
            @PathVariable String id,
            @RequestBody VacationResponseDTO responseDto) {
        return ResponseEntity.ok(vacationService.updateStatus(id, responseDto));
    }

    @GetMapping("/employee/{employeeId}")
    public List<Vacation> getByEmployee(@PathVariable String employeeId) {
        return vacationService.getRequestsByEmployee(employeeId);
    }

    @GetMapping("/manager/{managerId}")
    public List<Vacation> getByManager(@PathVariable String managerId) {
        return vacationService.getRequestsByManager(managerId);
    }
}

