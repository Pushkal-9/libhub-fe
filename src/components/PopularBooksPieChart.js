import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Tooltip, Cell, Legend, ResponsiveContainer } from 'recharts';
import api from './api';



const PopularBooksPieChart = () => {
  const [popularBooks, setPopularBooks] = useState([]);
  const renderColorfulLegendText = (value, entry) => {
    const { color } = entry;
    return <span style={{ color }}>{value.length > 10 ? `${value.substring(0, 25)}...` : value}</span>;
  };

  useEffect(() => {
    const fetchPopularBooks = async () => {
      try {
        const response = await api.get('/books/popular');
        setPopularBooks(response.data);
      } catch (error) {
        console.error('Failed to fetch popular books data:', error);
      }
    };

    fetchPopularBooks();
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#85144b'];

  return (
    <div>
      <div className="chart-header">Most Popular Titles (Last 30 days)</div>
      <div className="chart-container">
    <ResponsiveContainer width="100%" height={400}>
    <PieChart width={800} height={400}>
      <Pie
        data={popularBooks}
        cx={400}
        cy={200}
        labelLine={false}
        outerRadius={150}
        fill="#8884d8"
        dataKey="count"
        nameKey="title"
      >
        {popularBooks.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend formatter={renderColorfulLegendText} />
    </PieChart>
    </ResponsiveContainer>
    </div>
    </div>
  );
};

export default PopularBooksPieChart;