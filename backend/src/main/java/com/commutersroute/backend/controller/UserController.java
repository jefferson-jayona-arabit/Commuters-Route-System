package com.commutersroute.backend.controller;

import com.commutersroute.backend.dto.ApiResponse;
import com.commutersroute.backend.dto.PageResponse;
import com.commutersroute.backend.dto.UserCreateRequest;
import com.commutersroute.backend.dto.UserResponse;
import com.commutersroute.backend.dto.UserUpdateRequest;
import com.commutersroute.backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Exposes the CRUD endpoints used by the Admin > Users panel:
 *   GET    /api/users?search=&role=&status=&page=&size=
 *   GET    /api/users/{id}
 *   POST   /api/users
 *   PUT    /api/users/{id}
 *   DELETE /api/users/{id}
 */
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<PageResponse<UserResponse>> listUsers(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String role,
            @RequestParam(required = false) String status,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "5") int size) {
        return ResponseEntity.ok(userService.listUsers(search, role, status, page, size));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUser(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUser(id));
    }

    @PostMapping
    public ResponseEntity<UserResponse> createUser(@Valid @RequestBody UserCreateRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.createUser(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserResponse> updateUser(
            @PathVariable Long id,
            @Valid @RequestBody UserUpdateRequest request) {
        return ResponseEntity.ok(userService.updateUser(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok(ApiResponse.of(true, "User deleted successfully."));
    }
}