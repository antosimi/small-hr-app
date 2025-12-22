package com.example.hrApp.dto;

import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class PagedResponse<T> {
    private List<T> items;
    private long total;
}
