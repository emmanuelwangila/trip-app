// App.js
import React, { useState } from 'react';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import TripPlanner from './components/TripPlanner';
import ResultsDisplay from './components/ResultsDisplay';
import Header from './components/Header';

// ✅ Load API URL from environment (fallback to localhost)
const API_URL = import.meta.env.VITE_API_URL 

const theme = createTheme({
  palette: {
    primary: {
      main: '#2E5BFF',
    },
    secondary: {
      main: '#00C39A',
    },
    background: {
      default: '#F4F7FC',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
});

function App() {
  const [tripData, setTripData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSimulation = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/trips/simulate/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Simulation failed');
      }

      const data = await response.json();
      setTripData(data);
    } catch (err) {
      setError(err.message);
      console.error('Simulation error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {!tripData ? (
          <TripPlanner
            onSubmit={handleSimulation}
            loading={loading}
            error={error}
          />
        ) : (
          <ResultsDisplay
            tripData={tripData}
            onReset={() => setTripData(null)}
          />
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
