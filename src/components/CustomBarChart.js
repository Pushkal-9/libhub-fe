import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './chart.css';

function formatDate(dateStr) {
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' });
  const suffix = ['th', 'st', 'nd', 'rd'][((day % 10) > 3 || Math.floor((day % 100) / 10) === 1) ? 0 : (day % 10)];
  return `${day}${suffix} ${month}`;
}

function CustomBarChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/transactions/count-per-day-last-30-days');
        const chartData = Object.entries(response.data).map(([key, value]) => ({
          date: formatDate(key),
          count: value
        }));
        setData(chartData);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  // Function to control which tick labels are displayed on the X-axis
  const formatTick = (tick, index) => {
    return index % 3 === 0 ? tick : '';
  };

  return (
    <div>
      <div className="chart-header">Checkouts Per Day (Last 30 days)</div>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" angle={-45} textAnchor="end" height={60} tickFormatter={formatTick} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" stroke="#333" strokeWidth={2} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default CustomBarChart;