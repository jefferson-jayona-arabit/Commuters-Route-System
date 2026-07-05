import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, LayersControl, Marker, useMap, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

// Leaflet's default marker icon paths break under Vite's bundling —
// this re-points them to the actual bundled asset URLs.
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
})

const ILOILO_CITY_CENTER = [10.7202, 122.5621]

/**
 * Leaflet measures its container's size once, when the map first mounts.
 * Since this map mounts inside a modal that animates/expands to its final
 * width (80vw), Leaflet can grab the wrong (smaller) size before the modal
 * settles — leaving a gray, tile-less strip on the side. Calling
 * invalidateSize() shortly after mount forces it to re-measure correctly.
 */
function MapResizeFix() {
  const map = useMap()
  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize()
    }, 150)
    return () => clearTimeout(timer)
  }, [map])
  return null
}

/**
 * Listens for map clicks and reports the clicked lat/lng back up to the
 * parent. Must be a child of <MapContainer> — react-leaflet's hooks only
 * work inside the map's context.
 */
function ClickToPlacePin({ onPick }) {
  useMapEvents({
    click(event) {
      onPick(event.latlng)
    },
  })
  return null
}

function LocationPickerModal({ initialLat, initialLng, onConfirm, onCancel }) {
  const [position, setPosition] = useState(() => {
    const lat = parseFloat(initialLat)
    const lng = parseFloat(initialLng)
    if (Number.isNaN(lat) || Number.isNaN(lng)) return null
    return { lat, lng }
  })

  const mapCenter = position ? [position.lat, position.lng] : ILOILO_CITY_CENTER

  function handleConfirm() {
    if (!position) return
    onConfirm(position.lat, position.lng)
  }

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-card modal-card-wide">
        <div className="modal-header">
          <h3>Select location</h3>
          <button type="button" className="modal-close" onClick={onCancel} aria-label="Close">
            ×
          </button>
        </div>

        <div className="modal-body">
          <p className="picker-hint">Click anywhere on the map to drop a pin.</p>

          <div className="picker-map">
            <MapContainer center={mapCenter} zoom={14} scrollWheelZoom style={{ height: '100%', width: '100%' }}>
              <LayersControl position="topright">
                <LayersControl.BaseLayer checked name="Satellite">
                  <TileLayer
                    attribution="Tiles &copy; Esri — Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community"
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    maxZoom={19}
                  />
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer name="Street">
                  <TileLayer
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    maxZoom={19}
                  />
                </LayersControl.BaseLayer>
              </LayersControl>

              <ClickToPlacePin onPick={(latlng) => setPosition(latlng)} />
              <MapResizeFix />

              {position && <Marker position={[position.lat, position.lng]} />}
            </MapContainer>
          </div>

          <div className="picker-coords">
            {position
              ? <>Selected: <strong>{position.lat.toFixed(6)}, {position.lng.toFixed(6)}</strong></>
              : 'No pin placed yet'}
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="modal-secondary-button" onClick={onCancel}>
            Cancel
          </button>
          <button
            type="button"
            className="modal-primary-button"
            onClick={handleConfirm}
            disabled={!position}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  )
}

export default LocationPickerModal