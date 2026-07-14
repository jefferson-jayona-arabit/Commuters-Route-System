package com.commutersroute.backend.repository;

import com.commutersroute.backend.model.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

/**
 * JpaSpecificationExecutor lets LocationServiceImpl build the search-term +
 * type-filter query dynamically (see LocationSpecifications), matching what
 * LocationFilters.jsx sends: a free-text search and an optional type filter.
 */
public interface LocationRepository extends JpaRepository<Location, Long>, JpaSpecificationExecutor<Location> {
}