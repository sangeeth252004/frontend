// src/pages/HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const semesterDetails = [
  { name: "Semester 1", desc: "Foundation courses" },
  { name: "Semester 2", desc: "Core fundamentals" },
  { name: "Semester 3", desc: "Advanced concepts" },
  { name: "Semester 4", desc: "Specialized topics" },
  { name: "Semester 5", desc: "Professional courses" },
  { name: "Semester 6", desc: "Industry focus" },
  { name: "Semester 7", desc: "Project work" },
  { name: "Semester 8", desc: "Final semester" }
];

const HomePage = () => {
  const navigate = useNavigate();

  const handleSelect = (index) => {
    const sem = `S${index + 1}`;
    navigate(`/subject/${sem}`);
  };

  return (
    <div className="homepage-container">
      <h1 className="title">Choose Your Semester</h1>
      <div className="grid-container">
        {semesterDetails.map((sem, index) => (
          <div className="card" key={index}>
            <h3>{sem.name}</h3>
            <p>{sem.desc}</p>
            <button onClick={() => handleSelect(index)}>Explore Subjects</button>
          </div>
        ))}
      </div>

      <footer>
        <p>© 2024 BTech Q&A Hub. Empowering students with knowledge.</p>
      </footer>
    </div>
  );
};

export default HomePage;
