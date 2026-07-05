package com.commutersroute.backend.service;

import com.commutersroute.backend.dto.PageResponse;
import com.commutersroute.backend.dto.UserCreateRequest;
import com.commutersroute.backend.dto.UserResponse;
import com.commutersroute.backend.dto.UserUpdateRequest;

public interface UserService {

    PageResponse<UserResponse> listUsers(String search, String role, String status, int page, int size);

    UserResponse getUser(Long id);

    UserResponse createUser(UserCreateRequest request);

    UserResponse updateUser(Long id, UserUpdateRequest request);

    void deleteUser(Long id);
}