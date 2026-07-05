package com.commutersroute.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Generic wrapper for simple success/message responses,
 * e.g. the result of POST /api/auth/register
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse {

    private boolean success;
    private String message;

    public static ApiResponse of(boolean success, String message) {
        return new ApiResponse(success, message);
    }
}
