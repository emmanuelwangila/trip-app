// components/RouteMap.js
import React, { useEffect, useRef } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icon for fuel stops
const fuelIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/284/284690.png',
  iconSize: [25, 25],
  iconAnchor: [12, 12],
  popupAnchor: [0, -12],
});

const RouteMap = ({ routeData, fuelStops }) => {
  const mapRef = useRef();

  // Default coordinates (center of US)
  const defaultCenter = [39.8283, -98.5795];
  const defaultZoom = 4;

  useEffect(() => {
    if (routeData && mapRef.current) {
      const map = mapRef.current;
      const geoJsonLayer = L.geoJSON(routeData);
      map.fitBounds(geoJsonLayer.getBounds());
    }
  }, [routeData]);

  if (!routeData) {
    return (
      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <Typography>Route data not available</Typography>
      </Paper>
    );
  }

  return (
    <Box sx={{ height: '500px', width: '100%' }}>
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        style={{ height: '100%', width: '100%' }}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <GeoJSON data={routeData} style={{ color: '#2E5BFF', weight: 4 }} />
        
        {fuelStops && fuelStops.map((stop, index) => (
          <Marker
            key={index}
            position={[stop.lat, stop.lng]}
            icon={fuelIcon}
          >
            <Popup>
              <Typography variant="subtitle2">
                Fuel Stop {index + 1}
              </Typography>
              <Typography variant="body2">
                {stop.name}
              </Typography>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Box>
  );
};

export default RouteMap;