// src/pages/QAViewPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './QAViewPage.css';

const QAViewPage = () => {
  const { semester, subject, module } = useParams();
  const [questions, setQuestions] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [expanded, setExpanded] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQA = async () => {
      try {
        const res = await axios.get(
          `https://backend-wyp5.onrender.com/api/questions/${semester}/${subject}/${module}`
        );
        setQuestions(res.data);
      } catch (err) {
        console.error('Failed to fetch questions:', err.message);
      }
    };
    fetchQA();
  }, [semester, subject, module]);

  const filteredQuestions = questions.filter(q => {
    const matchesSearch = q.question.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'All' || q.difficulty === filter;
    return matchesSearch && matchesFilter;
  });

  const difficultyColors = {
    Easy: 'bg-success text-white',
    Medium: 'bg-warning text-dark',
    Hard: 'bg-danger text-white'
  };

  return (
    <div className="qa-container">
      <button className="back-btn" onClick={() => navigate(`/module/${semester}/${subject}`)}>
        ← Back to Modules
      </button>

      <div className="qa-header">
        <h2>Module {module} - Questions & Answers</h2>
        <p>Semester {semester.slice(1)} · Subject: {subject}</p>
      </div>

      <div className="qa-controls">
        <input
          type="text"
          className="form-control"
          placeholder="Search questions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="btn-group filter-buttons">
          {['All', 'Easy', 'Medium', 'Hard'].map(level => (
            <button
              key={level}
              className={`btn btn-sm ${filter === level ? 'btn-primary' : 'btn-outline-secondary'}`}
              onClick={() => setFilter(level)}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      <h4 className="qa-title">Questions ({filteredQuestions.length})</h4>
      <p className="qa-sub">Click on any question to view the detailed answer</p>

      {filteredQuestions.map((q, index) => (
        <div key={index} className="qa-card">
          <div className="qa-question" onClick={() => setExpanded(expanded === index ? null : index)}>
            <strong>Q{index + 1}. {q.question}</strong>
            <div className="tags">
              <span className={`badge me-2 ${difficultyColors[q.difficulty]}`}>{q.difficulty}</span>
              <span className="badge bg-primary">{q.answerType || 'Long Answer'}</span>
            </div>
          </div>
          {expanded === index && (
            <div className="qa-answer">
              <strong>Answer:</strong>
              <p>{q.answer}</p>
              {q.imageUrl && (
                <img src={q.imageUrl} alt="Answer Illustration" className="qa-image" />
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default QAViewPage;
