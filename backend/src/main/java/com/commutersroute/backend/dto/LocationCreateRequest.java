package com.commutersroute.backend.dto;

import com.commutersroute.backend.model.LocationType;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

/**
 * Payload for POST /api/admin/locations
 * Field names match LocationFormModal.jsx's form state exactly.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LocationCreateRequest {

    @NotBlank(message = "Location name is required")
    @jakarta.validation.constraints.Size(max = 150, message = "Location name must be at most 150 characters")
    private String locationName;

    @NotNull(message = "Location type is required")
    private LocationType locationType;

    private String address;

    private String description;

    @NotNull(message = "Latitude is required")
    @DecimalMin(value = "-90.0", message = "Latitude must be between -90 and 90")
    @DecimalMax(value = "90.0", message = "Latitude must be between -90 and 90")
    private BigDecimal latitude;

    @NotNull(message = "Longitude is required")
    @DecimalMin(value = "-180.0", message = "Longitude must be between -180 and 180")
    @DecimalMax(value = "180.0", message = "Longitude must be between -180 and 180")
    private BigDecimal longitude;
}