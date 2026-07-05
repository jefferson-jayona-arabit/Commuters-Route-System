package com.commutersroute.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

/**
 * Generic paginated list wrapper, e.g. the result of GET /api/users
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PageResponse<T> {

    private List<T> items;
    private int page;          // 1-indexed, mirrors the frontend's Pagination component
    private int pageSize;
    private long totalItems;
    private int totalPages;
}