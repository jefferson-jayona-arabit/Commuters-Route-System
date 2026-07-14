package com.commutersroute.backend.repository;

import com.commutersroute.backend.model.Location;
import com.commutersroute.backend.model.LocationType;
import org.springframework.data.jpa.domain.Specification;

/**
 * Builds the WHERE clause dynamically based on which filters
 * LocationFilters.jsx actually sent (search term / type, either of which
 * may be absent).
 */
public class LocationSpecifications {

    private LocationSpecifications() {
    }

    public static Specification<Location> hasType(LocationType type) {
        return (root, query, cb) -> type == null ? null : cb.equal(root.get("locationType"), type);
    }

    public static Specification<Location> matchesSearch(String term) {
        if (term == null || term.isBlank()) {
            return (root, query, cb) -> null;
        }
        String likePattern = "%" + term.trim().toLowerCase() + "%";
        return (root, query, cb) -> cb.or(
                cb.like(cb.lower(root.get("locationName")), likePattern),
                cb.like(cb.lower(root.get("address")), likePattern)
        );
    }
}