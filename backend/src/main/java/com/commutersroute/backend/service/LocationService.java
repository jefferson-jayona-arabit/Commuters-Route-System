package com.commutersroute.backend.service;

import com.commutersroute.backend.dto.LocationCreateRequest;
import com.commutersroute.backend.dto.LocationResponse;
import com.commutersroute.backend.dto.LocationUpdateRequest;
import com.commutersroute.backend.model.LocationType;
import com.commutersroute.backend.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface LocationService {

    Page<LocationResponse> getLocations(String search, LocationType type, Pageable pageable);

    LocationResponse getLocationById(Long id);

    LocationResponse createLocation(LocationCreateRequest request, User currentAdmin);

    LocationResponse updateLocation(Long id, LocationUpdateRequest request);

    void deleteLocation(Long id);
}