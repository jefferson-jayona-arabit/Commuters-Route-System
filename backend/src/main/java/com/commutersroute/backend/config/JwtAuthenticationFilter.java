package com.commutersroute.backend.config;

import com.commutersroute.backend.model.User;
import com.commutersroute.backend.repository.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

/**
 * Runs once per request. Reads the "Authorization: Bearer <token>" header
 * (set by the frontend's axios instance once you add it — see note below),
 * validates it with JwtUtil, and — if valid — loads the matching User and
 * places it in Spring Security's context so:
 *   - SecurityConfig's .hasRole("ADMIN") checks have something to check
 *   - @AuthenticationPrincipal User currentAdmin works in controllers
 *
 * If there's no token, or it's invalid/expired, this filter simply does
 * nothing and lets the request continue unauthenticated — SecurityConfig
 * then decides whether that's allowed (permitAll routes) or rejected
 * (protected routes return 401/403).
 */
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);

            if (jwtUtil.isTokenValid(token)) {
                String email = jwtUtil.extractEmail(token);

                userRepository.findByEmail(email).ifPresent(user -> {
                    if (SecurityContextHolder.getContext().getAuthentication() == null) {
                        setAuthentication(user, request);
                    }
                });
            }
        }

        filterChain.doFilter(request, response);
    }

    private void setAuthentication(User user, HttpServletRequest request) {
        var authorities = List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole().name()));

        var authToken = new UsernamePasswordAuthenticationToken(user, null, authorities);
        authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

        SecurityContextHolder.getContext().setAuthentication(authToken);
    }
}