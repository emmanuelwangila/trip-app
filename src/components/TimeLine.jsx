// components/Timeline.js
import React from 'react';
import {
  Timeline as MuiTimeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from '@mui/lab';
import { Box , Chip , Paper , Typography } from '@mui/material';

const Timeline = ({ events }) => {
  if (!events || events.length === 0) {
    return (
      <Paper sx={{ p: 3 }}>
        <Typography>No timeline data available</Typography>
      </Paper>
    );
  }

  const getEventColor = (type) => {
    switch (type) {
      case 'drive': return 'primary';
      case 'pickup': return 'secondary';
      case 'dropoff': return 'success';
      case 'break': return 'warning';
      case 'fuel': return 'info';
      case 'rest': return 'default';
      default: return 'grey';
    }
  };

  const formatEventType = (type) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Trip Timeline
      </Typography>
      
      <MuiTimeline position="alternate">
        {events.map((event, index) => (
          <TimelineItem key={index}>
            <TimelineOppositeContent color="text.secondary" sx={{ py: 2 }}>
              {new Date(event.start).toLocaleTimeString()}
            </TimelineOppositeContent>
            
            <TimelineSeparator>
              <TimelineDot color={getEventColor(event.type)} />
              {index < events.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            
            <TimelineContent sx={{ py: 2 }}>
              <Box>
                <Chip 
                  label={formatEventType(event.type)} 
                  color={getEventColor(event.type)} 
                  size="small" 
                  sx={{ mb: 1 }}
                />
                <Typography variant="body1" fontWeight="medium">
                  {event.note}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Duration: {event.hours} hours
                </Typography>
              </Box>
            </TimelineContent>
          </TimelineItem>
        ))}
      </MuiTimeline>
    </Paper>
  );
};

export default Timeline;