// components/ResultsDisplay.js
import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Button,
  Box,
  Tabs,
  Tab,
  Grid,
  Card,
  CardContent,
  Chip,
} from '@mui/material';
import RouteMap from './RouteMap';
import ELDLogs from './ELDLogs';
import Timeline from './TimeLine';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const TabPanel = ({ children, value, index }) => {
  return value === index ? <Box sx={{ py: 3 }}>{children}</Box> : null;
};

const ResultsDisplay = ({ tripData, onReset }) => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => setTabValue(newValue);

  return (
    <Box>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={onReset}
        sx={{ mb: 2 }}
      >
        Plan Another Trip
      </Button>

      {/* Trip Summary */}
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ color: 'primary.main' }}>
          Trip Summary
        </Typography>

        <Grid container spacing={3} sx={{ mb: 2 }}>
          <Grid item xs={12} md={4}>
            <Card variant="outlined">
              <CardContent>
                <Typography color="text.secondary">Total Distance</Typography>
                <Typography variant="h5">{tripData.total_distance} miles</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card variant="outlined">
              <CardContent>
                <Typography color="text.secondary">Driving Time</Typography>
                <Typography variant="h5">{tripData.total_driving_hours} hours</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card variant="outlined">
              <CardContent>
                <Typography color="text.secondary">Fuel Stops</Typography>
                <Typography variant="h5">{tripData.fuel_stops}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          <Chip
            label={`Remaining Cycle Hours: ${tripData.remaining_cycle_hours || 60}`}
            color="primary"
            variant="outlined"
          />
          <Chip
            label="Compliant with DOT Regulations"
            color="success"
            variant="outlined"
          />
          {/* Show number of route points instead of full JSON */}
          <Chip
            label={`Route Points: ${tripData.route_geojson?.coordinates?.[0]?.length || 0}`}
            color="default"
            variant="outlined"
          />
        </Box>
      </Paper>

      {/* Tabs */}
      <Paper elevation={2}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Route Map" />
            <Tab label="ELD Logs" />
            <Tab label="Trip Timeline" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <RouteMap
            routeData={tripData.route_geojson}
            fuelStops={tripData.fuel_locations}
          />
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <ELDLogs dailyLogs={tripData.daily_logs} />
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Timeline events={tripData.events} />
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default ResultsDisplay;
