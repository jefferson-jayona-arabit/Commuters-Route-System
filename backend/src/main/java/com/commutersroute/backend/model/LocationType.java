package com.commutersroute.backend.model;

/**
 * Mirrors the `location_type` ENUM('terminal','waiting_area','stop','landmark')
 * column on the `locations` table.
 *
 * NOTE: constant names are deliberately lowercase/snake_case (unconventional
 * for Java) so they serialize to/from JSON exactly as the frontend's
 * LOCATION_TYPES values ('terminal', 'waiting_area', 'stop', 'landmark') —
 * no case-mapping needed between frontend, backend, and the database enum.
 */
public enum LocationType {
    terminal,
    waiting_area,
    stop,
    landmark
}