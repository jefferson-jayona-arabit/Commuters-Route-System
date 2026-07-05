package com.commutersroute.backend.repository;

import com.commutersroute.backend.model.User;
import com.commutersroute.backend.model.UserRole;
import com.commutersroute.backend.model.UserStatus;
import org.springframework.data.jpa.domain.Specification;

/**
 * Dynamic query building blocks for GET /api/users (search + Role/Status
 * filters from the Users panel toolbar).
 */
public final class UserSpecifications {

    private UserSpecifications() {
    }

    public static Specification<User> search(String search) {
        return (root, query, cb) -> {
            if (search == null || search.isBlank()) {
                return cb.conjunction();
            }
            String like = "%" + search.trim().toLowerCase() + "%";
            return cb.or(
                    cb.like(cb.lower(root.get("firstName")), like),
                    cb.like(cb.lower(root.get("lastName")), like),
                    cb.like(cb.lower(root.get("email")), like)
            );
        };
    }

    public static Specification<User> hasRole(UserRole role) {
        return (root, query, cb) -> role == null ? cb.conjunction() : cb.equal(root.get("role"), role);
    }

    public static Specification<User> hasStatus(UserStatus status) {
        return (root, query, cb) -> status == null ? cb.conjunction() : cb.equal(root.get("status"), status);
    }
}