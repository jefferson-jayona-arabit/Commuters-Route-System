package com.commutersroute.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Payload for POST /api/users (Admin > Users > Add User)
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserCreateRequest {

    @NotBlank(message = "First name is required")
    @Size(max = 100, message = "First name must be at most 100 characters")
    private String firstName;

    @NotBlank(message = "Last name is required")
    @Size(max = 100, message = "Last name must be at most 100 characters")
    private String lastName;

    @NotBlank(message = "Email is required")
    @Email(message = "Enter a valid email address")
    @Size(max = 150, message = "Email must be at most 150 characters")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters")
    @Pattern(
        regexp = "^(?=.*[A-Za-z])(?=.*\\d).+$",
        message = "Password must contain at least one letter and one number"
    )
    private String password;

    @Pattern(regexp = "^$|^[0-9+\\-\\s]{7,20}$", message = "Enter a valid phone number")
    private String phoneNumber;

    @Size(max = 255, message = "Address must be at most 255 characters")
    private String address;

    @NotBlank(message = "Role is required")
    @Pattern(regexp = "(?i)admin|user", message = "Role must be either 'admin' or 'user'")
    private String role;

    @NotBlank(message = "Status is required")
    @Pattern(regexp = "(?i)active|inactive", message = "Status must be either 'active' or 'inactive'")
    private String status;

    /** Filename/URL only for now — actual file upload/storage is a later phase. */
    private String profilePhoto;
}