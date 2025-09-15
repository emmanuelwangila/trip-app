// components/ELDLogs.js
import React from 'react';
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Chip,
} from '@mui/material';

const ELDLogs = ({ dailyLogs }) => {
  if (!dailyLogs || dailyLogs.length === 0) {
    return (
      <Paper sx={{ p: 3 }}>
        <Typography>No log data available</Typography>
      </Paper>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'D': return 'primary';
      case 'ON': return 'secondary';
      case 'SB': return 'info';
      case 'OFF': return 'default';
      default: return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'D': return 'Driving';
      case 'ON': return 'On Duty';
      case 'SB': return 'Sleeper Berth';
      case 'OFF': return 'Off Duty';
      default: return status;
    }
  };

  return (
    <Box>
      {dailyLogs.map((day, dayIndex) => (
        <Paper key={dayIndex} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            ELD Log - {day.date}
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <Chip 
              label={`Driving: ${day.total_driving || 0} hours`} 
              color="primary" 
              variant="outlined" 
            />
            <Chip 
              label={`On Duty: ${day.total_on_duty || 0} hours`} 
              color="secondary" 
              variant="outlined" 
            />
          </Box>

          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Status</TableCell>
                  <TableCell>Hours</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Start Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {day.entries && day.entries.map((entry, entryIndex) => (
                  <TableRow key={entryIndex}>
                    <TableCell>
                      <Chip 
                        label={getStatusText(entry.status)} 
                        color={getStatusColor(entry.status)} 
                        size="small" 
                      />
                    </TableCell>
                    <TableCell>{entry.hours}</TableCell>
                    <TableCell>{entry.description}</TableCell>
                    <TableCell>
                      {new Date(entry.start_time).toLocaleTimeString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      ))}
    </Box>
  );
};

export default ELDLogs;