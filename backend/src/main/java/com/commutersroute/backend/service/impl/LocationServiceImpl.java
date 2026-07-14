package com.commutersroute.backend.service.impl;

import com.commutersroute.backend.dto.LocationCreateRequest;
import com.commutersroute.backend.dto.LocationResponse;
import com.commutersroute.backend.dto.LocationUpdateRequest;
import com.commutersroute.backend.exception.LocationNotFoundException;
import com.commutersroute.backend.model.Location;
import com.commutersroute.backend.model.LocationType;
import com.commutersroute.backend.model.User;
import com.commutersroute.backend.repository.LocationRepository;
import com.commutersroute.backend.repository.LocationSpecifications;
import com.commutersroute.backend.service.LocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class LocationServiceImpl implements LocationService {

    private final LocationRepository locationRepository;

    @Override
    @Transactional(readOnly = true)
    public Page<LocationResponse> getLocations(String search, LocationType type, Pageable pageable) {
        Specification<Location> spec = Specification
                .where(LocationSpecifications.matchesSearch(search))
                .and(LocationSpecifications.hasType(type));

        return locationRepository.findAll(spec, pageable).map(this::toResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public LocationResponse getLocationById(Long id) {
        return toResponse(findOrThrow(id));
    }

    @Override
    @Transactional
    public LocationResponse createLocation(LocationCreateRequest request, User currentAdmin) {
        Location location = Location.builder()
                .locationName(request.getLocationName().trim())
                .locationType(request.getLocationType())
                .address(request.getAddress())
                .description(request.getDescription())
                .latitude(request.getLatitude())
                .longitude(request.getLongitude())
                .createdBy(currentAdmin)
                .build();

        return toResponse(locationRepository.save(location));
    }

    @Override
    @Transactional
    public LocationResponse updateLocation(Long id, LocationUpdateRequest request) {
        Location location = findOrThrow(id);

        location.setLocationName(request.getLocationName().trim());
        location.setLocationType(request.getLocationType());
        location.setAddress(request.getAddress());
        location.setDescription(request.getDescription());
        location.setLatitude(request.getLatitude());
        location.setLongitude(request.getLongitude());

        return toResponse(locationRepository.save(location));
    }

    @Override
    @Transactional
    public void deleteLocation(Long id) {
        if (!locationRepository.existsById(id)) {
            throw new LocationNotFoundException("Location not found with id " + id);
        }
        locationRepository.deleteById(id);
    }

    private Location findOrThrow(Long id) {
        return locationRepository.findById(id)
                .orElseThrow(() -> new LocationNotFoundException("Location not found with id " + id));
    }

    private LocationResponse toResponse(Location location) {
        User creator = location.getCreatedBy();
        String createdByName = creator == null
                ? null
                : (creator.getFirstName() + " " + creator.getLastName()).trim();

        return LocationResponse.builder()
                .id(location.getLocationId())
                .locationName(location.getLocationName())
                .locationType(location.getLocationType())
                .address(location.getAddress())
                .description(location.getDescription())
                .latitude(location.getLatitude())
                .longitude(location.getLongitude())
                .createdBy(createdByName)
                .createdAt(location.getCreatedAt())
                .updatedAt(location.getUpdatedAt())
                .build();
    }
}