package com.commutersroute.backend.service;

import com.commutersroute.backend.dto.ApiResponse;
import com.commutersroute.backend.dto.AuthResponse;
import com.commutersroute.backend.dto.LoginRequest;
import com.commutersroute.backend.dto.RegisterRequest;

public interface AuthService {

    ApiResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);
}
