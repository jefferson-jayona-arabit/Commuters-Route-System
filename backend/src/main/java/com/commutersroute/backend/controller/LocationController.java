package com.commutersroute.backend.controller;

import com.commutersroute.backend.dto.LocationCreateRequest;
import com.commutersroute.backend.dto.LocationResponse;
import com.commutersroute.backend.dto.LocationUpdateRequest;
import com.commutersroute.backend.model.LocationType;
import com.commutersroute.backend.model.User;
import com.commutersroute.backend.service.LocationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

/**
 * Admin-only CRUD for the `locations` table. Protected by SecurityConfig's
 * "/api/admin/**".hasRole("ADMIN") rule — see JwtAuthenticationFilter for
 * how the request gets authenticated in the first place.
 *
 * Maps directly onto LocationsPanel.jsx's expectations:
 *   GET    /api/admin/locations?search=&type=&page=&size=   -> paginated list
 *   GET    /api/admin/locations/{id}                        -> single location
 *   POST   /api/admin/locations                              -> create
 *   PUT    /api/admin/locations/{id}                          -> update
 *   DELETE /api/admin/locations/{id}                           -> delete
 */
@RestController
@RequestMapping("/api/admin/locations")
@RequiredArgsConstructor
public class LocationController {

    private final LocationService locationService;

    @GetMapping
    public ResponseEntity<Page<LocationResponse>> getLocations(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) LocationType type,
            @PageableDefault(size = 5, sort = "locationId") Pageable pageable
    ) {
        return ResponseEntity.ok(locationService.getLocations(search, type, pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<LocationResponse> getLocationById(@PathVariable Long id) {
        return ResponseEntity.ok(locationService.getLocationById(id));
    }

    @PostMapping
    public ResponseEntity<LocationResponse> createLocation(
            @Valid @RequestBody LocationCreateRequest request,
            @AuthenticationPrincipal User currentAdmin
    ) {
        LocationResponse created = locationService.createLocation(request, currentAdmin);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<LocationResponse> updateLocation(
            @PathVariable Long id,
            @Valid @RequestBody LocationUpdateRequest request
    ) {
        return ResponseEntity.ok(locationService.updateLocation(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLocation(@PathVariable Long id) {
        locationService.deleteLocation(id);
        return ResponseEntity.noContent().build();
    }
}