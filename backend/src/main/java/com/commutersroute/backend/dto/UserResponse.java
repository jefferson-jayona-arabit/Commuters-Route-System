package com.commutersroute.backend.dto;

import com.commutersroute.backend.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

/**
 * Response returned by the Users CRUD endpoints.
 * role/status are exposed as lowercase strings ("admin"/"user",
 * "active"/"inactive") to match the values already used by the
 * Users panel UI (RoleBadge.jsx / StatusBadge.jsx).
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponse {

    private Long userId;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String address;
    private String role;
    private String status;
    private String profilePhoto;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static UserResponse fromEntity(User user) {
        return UserResponse.builder()
                .userId(user.getUserId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .address(user.getAddress())
                .role(user.getRole().name().toLowerCase())
                .status(user.getStatus().name().toLowerCase())
                .profilePhoto(user.getProfilePhoto())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();
    }
}