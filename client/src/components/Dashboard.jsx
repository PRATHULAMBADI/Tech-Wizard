import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

const Dashboard = () => {
  const [programCounts, setProgramCounts] = useState([]);

  useEffect(() => {
    const fetchProgramCounts = async () => {
      try {
        const response = await fetch('/api/programCounts');
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Invalid response content type.');
        }
        const data = await response.json();
        // Process the JSON data
        console.log('Program counts:', data);
      } catch (error) {
        console.error('Error fetching program counts:', error.message);
        // Handle the error (e.g., show a message to the user)
      }
    };
    

    fetchProgramCounts();
  }, []);

  useEffect(() => {
    if (programCounts.length > 0) {
      const ctx = document.getElementById('programTypesChart');
      if (ctx) {
        new Chart(ctx, {
          type: 'pie',
          data: {
            labels: programCounts.map((item) => item.label),
            datasets: [
              {
                label: 'Program Types',
                data: programCounts.map((item) => item.count),
                backgroundColor: ['#ff6384', '#36a2eb', '#ffce56'], // Colors for each program type
              },
            ],
          },
        });
      }
    }
  }, [programCounts]);

  return (
    <div className="dashboard-container">
      <div className="chart-container">
        <canvas id="programTypesChart" width="400" height="400"></canvas>
      </div>
    </div>
  );
};

export default Dashboard;
