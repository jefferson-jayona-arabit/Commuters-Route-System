import {
  DashboardIcon,
  UsersIcon,
  VehicleIcon,
  LocationIcon,
  RouteIcon,
  StopsIcon,
  PathIcon,
  FaresIcon,
  HistoryIcon,
  SettingsIcon,
} from './icons.jsx'

/**
 * Each entry mirrors a table from commuters_route_system.sql.
 * `key` is the id used to track the active sidebar selection.
 */
export const ADMIN_MODULES = [
  { key: 'dashboard', label: 'Dashboard', Icon: DashboardIcon },
  { key: 'users', label: 'Users', Icon: UsersIcon },
  { key: 'vehicleTypes', label: 'Vehicle Types', Icon: VehicleIcon },
  { key: 'locations', label: 'Locations', Icon: LocationIcon },
  { key: 'routes', label: 'Routes', Icon: RouteIcon },
  { key: 'routeStops', label: 'Route Stops', Icon: StopsIcon },
  { key: 'routePaths', label: 'Route Paths', Icon: PathIcon },
  { key: 'fares', label: 'Fares', Icon: FaresIcon },
  { key: 'searchHistory', label: 'Search History', Icon: HistoryIcon },
  { key: 'settings', label: 'Settings', Icon: SettingsIcon },
]