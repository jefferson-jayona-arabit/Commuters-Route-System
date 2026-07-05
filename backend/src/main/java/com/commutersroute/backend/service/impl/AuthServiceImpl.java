package com.commutersroute.backend.service.impl;

import com.commutersroute.backend.config.JwtUtil;
import com.commutersroute.backend.dto.ApiResponse;
import com.commutersroute.backend.dto.AuthResponse;
import com.commutersroute.backend.dto.LoginRequest;
import com.commutersroute.backend.dto.RegisterRequest;
import com.commutersroute.backend.exception.AccountInactiveException;
import com.commutersroute.backend.exception.EmailAlreadyExistsException;
import com.commutersroute.backend.exception.InvalidCredentialsException;
import com.commutersroute.backend.model.User;
import com.commutersroute.backend.model.UserRole;
import com.commutersroute.backend.model.UserStatus;
import com.commutersroute.backend.repository.UserRepository;
import com.commutersroute.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @Override
    @Transactional
    public ApiResponse register(RegisterRequest request) {
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
                .role(UserRole.USER)
                .status(UserStatus.ACTIVE)
                .build();

        userRepository.save(user);

        return ApiResponse.of(true, "Account created successfully. You can now log in.");
    }

    @Override
    @Transactional
    public AuthResponse login(LoginRequest request) {
        String normalizedEmail = request.getEmail().trim().toLowerCase();

        User user = userRepository.findByEmail(normalizedEmail)
                .orElseThrow(() -> new InvalidCredentialsException("Incorrect email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new InvalidCredentialsException("Incorrect email or password");
        }

        if (user.getStatus() == UserStatus.INACTIVE) {
            throw new AccountInactiveException("This account has been deactivated. Contact an administrator.");
        }

        user.setLastLoginAt(LocalDateTime.now());
        userRepository.save(user);

        String token = jwtUtil.generateToken(user.getUserId(), user.getEmail(), user.getRole().name());

        return AuthResponse.builder()
                .token(token)
                .tokenType("Bearer")
                .userId(user.getUserId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .role(user.getRole().name())
                .build();
    }
}
