package com.commutersroute.backend.dto;

import com.commutersroute.backend.model.LocationType;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * Response shape for the Locations endpoints.
 *
 * Field names (`id`, `locationName`, `createdBy` as a display string, etc.)
 * deliberately match what LocationTable.jsx / LocationViewModal.jsx already
 * expect from routeSuggestionsSampleData-style objects, so swapping
 * SAMPLE_LOCATIONS for real API data in LocationsPanel.jsx requires no
 * changes to the table/view components themselves.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LocationResponse {

    private Long id;
    private String locationName;
    private LocationType locationType;
    private String address;
    private String description;
    private BigDecimal latitude;
    private BigDecimal longitude;

    /** Display name of the admin who created this, e.g. "Juan Dela Cruz". Null if unknown/deleted. */
    private String createdBy;

    @JsonFormat(pattern = "yyyy-MM-dd hh:mm a")
    private LocalDateTime createdAt;

    @JsonFormat(pattern = "yyyy-MM-dd hh:mm a")
    private LocalDateTime updatedAt;
}