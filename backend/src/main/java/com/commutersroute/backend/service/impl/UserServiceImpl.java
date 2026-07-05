package com.commutersroute.backend.service.impl;

import com.commutersroute.backend.dto.PageResponse;
import com.commutersroute.backend.dto.UserCreateRequest;
import com.commutersroute.backend.dto.UserResponse;
import com.commutersroute.backend.dto.UserUpdateRequest;
import com.commutersroute.backend.exception.EmailAlreadyExistsException;
import com.commutersroute.backend.exception.UserNotFoundException;
import com.commutersroute.backend.model.User;
import com.commutersroute.backend.model.UserRole;
import com.commutersroute.backend.model.UserStatus;
import com.commutersroute.backend.repository.UserRepository;
import com.commutersroute.backend.repository.UserSpecifications;
import com.commutersroute.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public PageResponse<UserResponse> listUsers(String search, String role, String status, int page, int size) {
        Specification<User> spec = Specification
                .where(UserSpecifications.search(search))
                .and(UserSpecifications.hasRole(parseRoleFilter(role)))
                .and(UserSpecifications.hasStatus(parseStatusFilter(status)));

        int pageIndex = Math.max(page - 1, 0);
        Pageable pageable = PageRequest.of(pageIndex, size, Sort.by("createdAt").descending());

        Page<User> result = userRepository.findAll(spec, pageable);

        List<UserResponse> items = result.getContent().stream()
                .map(UserResponse::fromEntity)
                .toList();

        return PageResponse.<UserResponse>builder()
                .items(items)
                .page(page)
                .pageSize(size)
                .totalItems(result.getTotalElements())
                .totalPages(Math.max(result.getTotalPages(), 1))
                .build();
    }

    @Override
    public UserResponse getUser(Long id) {
        return UserResponse.fromEntity(findUserOrThrow(id));
    }

    @Override
    @Transactional
    public UserResponse createUser(UserCreateRequest request) {
        String normalizedEmail = request.getEmail().trim().toLowerCase();

        if (userRepository.existsByEmail(normalizedEmail)) {
            throw new EmailAlreadyExistsException("An account with this email already exists");
        }

        User user = User.builder()
                .firstName(request.getFirstName().trim())
                .lastName(request.getLastName().trim())
                .email(normalizedEmail)
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .phoneNumber(request.getPhoneNumber())
                .address(request.getAddress())
                .role(parseRole(request.getRole()))
                .status(parseStatus(request.getStatus()))
                .profilePhoto(request.getProfilePhoto())
                .build();

        return UserResponse.fromEntity(userRepository.save(user));
    }

    @Override
    @Transactional
    public UserResponse updateUser(Long id, UserUpdateRequest request) {
        User user = findUserOrThrow(id);
        String normalizedEmail = request.getEmail().trim().toLowerCase();

        if (userRepository.existsByEmailAndUserIdNot(normalizedEmail, id)) {
            throw new EmailAlreadyExistsException("An account with this email already exists");
        }

        user.setFirstName(request.getFirstName().trim());
        user.setLastName(request.getLastName().trim());
        user.setEmail(normalizedEmail);
        user.setPhoneNumber(request.getPhoneNumber());
        user.setAddress(request.getAddress());
        user.setRole(parseRole(request.getRole()));
        user.setStatus(parseStatus(request.getStatus()));

        if (request.getProfilePhoto() != null) {
            user.setProfilePhoto(request.getProfilePhoto());
        }

        if (request.getPassword() != null && !request.getPassword().isBlank()) {
            user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        }

        return UserResponse.fromEntity(userRepository.save(user));
    }

    @Override
    @Transactional
    public void deleteUser(Long id) {
        userRepository.delete(findUserOrThrow(id));
    }

    private User findUserOrThrow(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with id " + id));
    }

    private UserRole parseRole(String role) {
        return UserRole.valueOf(role.trim().toUpperCase());
    }

    private UserStatus parseStatus(String status) {
        return UserStatus.valueOf(status.trim().toUpperCase());
    }

    private UserRole parseRoleFilter(String role) {
        if (role == null || role.isBlank() || "all".equalsIgnoreCase(role)) {
            return null;
        }
        return parseRole(role);
    }

    private UserStatus parseStatusFilter(String status) {
        if (status == null || status.isBlank() || "all".equalsIgnoreCase(status)) {
            return null;
        }
        return parseStatus(status);
    }
}