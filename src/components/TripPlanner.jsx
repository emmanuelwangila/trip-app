// components/TripPlanner.js
import React, { useState } from 'react';
import {
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Alert,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';

const TripPlanner = ({ onSubmit, loading, error }) => {
  const [formData, setFormData] = useState({
    current_location: '',
    pickup_location: '',
    dropoff_location: '',
    current_cycle_used: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Paper elevation={2} sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, color: 'primary.main' }}>
        Plan Your Trip
      </Typography>
      
      <Stepper activeStep={0} sx={{ mb: 4 }}>
        <Step>
          <StepLabel>Enter Trip Details</StepLabel>
        </Step>
        <Step>
          <StepLabel>View Route & ELD Logs</StepLabel>
        </Step>
      </Stepper>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Current Location"
              name="current_location"
              value={formData.current_location}
              onChange={handleChange}
              required
              placeholder="e.g., New York, NY"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Pickup Location"
              name="pickup_location"
              value={formData.pickup_location}
              onChange={handleChange}
              required
              placeholder="e.g., Chicago, IL"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Dropoff Location"
              name="dropoff_location"
              value={formData.dropoff_location}
              onChange={handleChange}
              required
              placeholder="e.g., Los Angeles, CA"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Current Cycle Used (Hours)"
              name="current_cycle_used"
              type="number"
              value={formData.current_cycle_used}
              onChange={handleChange}
              inputProps={{ min: 0, max: 70, step: 0.5 }}
              helperText="Hours used in current 8-day cycle (max 70 hours)"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ py: 1.5, px: 4 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Plan Route'}
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ mt: 4, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
        <Typography variant="h6" gutterBottom>
          DOT Compliance Information
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Property-carrying drivers: 70 hours/8 days cycle<br />
          • 11-hour driving limit / 14-hour on-duty limit<br />
          • 30-minute break required after 8 hours of driving<br />
          • 10-hour rest period required after 14 hours on duty<br />
          • Fuel stops required every 1,000 miles
        </Typography>
      </Box>
    </Paper>
  );
};

export default TripPlanner;