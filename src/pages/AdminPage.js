import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPage.css';

const API_BASE = 'https://backend-wyp5.onrender.com/api';

const AdminPage = () => {
  const [formData, setFormData] = useState({
    semester: '',
    subject: '',
    module: '',
    question: '',
    answer: '',
    difficulty: 'Easy',
    answerType: 'Short Answer',
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [questions, setQuestions] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const res = await axios.get(`${API_BASE}/questions`);
      setQuestions(res.data);
    } catch (error) {
      alert('❌ Failed to fetch questions');
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    if (image) {
      data.append('image', image);
    }

    try {
      if (editId) {
        await axios.put(`${API_BASE}/questions/${editId}`, formData); // Updating image not supported in PUT yet
        alert('✅ Question updated successfully!');
      } else {
        await axios.post(`${API_BASE}/questions/add`, data);
        alert('✅ Question added successfully!');
      }

      setFormData({
        semester: '',
        subject: '',
        module: '',
        question: '',
        answer: '',
        difficulty: 'Easy',
        answerType: 'Short Answer',
      });
      setImage(null);
      setImagePreview(null);
      setEditId(null);
      fetchQuestions();
    } catch (err) {
      alert('❌ Error saving question');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      try {
        await axios.delete(`${API_BASE}/questions/${id}`);
        fetchQuestions();
      } catch (err) {
        alert('❌ Failed to delete question');
      }
    }
  };

  const handleEdit = (q) => {
    setFormData({
      semester: q.semester,
      subject: q.subject,
      module: q.module,
      question: q.question,
      answer: q.answer,
      difficulty: q.difficulty || 'Easy',
      answerType: q.answerType || 'Short Answer',
    });
    setEditId(q._id);
    setImagePreview(q.imageUrl || null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">Admin Panel – {editId ? 'Edit' : 'Add'} Question</h2>

      <form onSubmit={handleSubmit} className="admin-form" encType="multipart/form-data">
        <div className="form-group"><label>Semester</label>
          <input type="text" name="semester" value={formData.semester} onChange={handleChange} required />
        </div>

        <div className="form-group"><label>Subject</label>
          <input type="text" name="subject" value={formData.subject} onChange={handleChange} required />
        </div>

        <div className="form-group"><label>Module</label>
          <input type="number" name="module" value={formData.module} onChange={handleChange} required />
        </div>

        <div className="form-group"><label>Question</label>
          <textarea name="question" value={formData.question} onChange={handleChange} required />
        </div>

        <div className="form-group"><label>Answer</label>
          <textarea name="answer" value={formData.answer} onChange={handleChange} required />
        </div>

        <div className="form-group"><label>Difficulty</label>
          <select name="difficulty" value={formData.difficulty} onChange={handleChange}>
            <option value="Easy">Easy</option><option value="Medium">Medium</option><option value="Hard">Hard</option>
          </select>
        </div>

        <div className="form-group"><label>Answer Type</label>
          <select name="answerType" value={formData.answerType} onChange={handleChange}>
            <option value="Short Answer">Short Answer</option><option value="Long Answer">Long Answer</option>
          </select>
        </div>

        <div className="form-group">
          <label>Upload Image (optional)</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {imagePreview && <img src={imagePreview} alt="Preview" style={{ maxWidth: '200px', marginTop: '10px' }} />}
        </div>

        <button type="submit" className="submit-btn">{editId ? 'Update' : 'Add'} Question</button>
      </form>

      <hr className="divider" />

      <h3 className="admin-title">All Questions</h3>
      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Sem</th><th>Subject</th><th>Module</th><th>Difficulty</th><th>Qn</th><th>Ans</th><th>Type</th><th>Image</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {questions.map(q => (
              <tr key={q._id}>
                <td>{q.semester}</td>
                <td>{q.subject}</td>
                <td>{q.module}</td>
                <td>{q.difficulty}</td>
                <td>{q.question}</td>
                <td>{q.answer}</td>
                <td>{q.answerType}</td>
                <td>
                  {q.imageUrl && <img src={q.imageUrl} alt="ans-img" style={{ width: '60px' }} />}
                </td>
                <td>
                  <button onClick={() => handleEdit(q)} className="edit-btn">Edit</button>
                  <button onClick={() => handleDelete(q._id)} className="delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;
