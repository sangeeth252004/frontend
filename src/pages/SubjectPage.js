import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './SubjectPage.css'; // Custom styles

const subjectMap = {
  S1: [
    { name: "Engineering Mathematics I", code: "MA101" },
    { name: "Engineering Physics", code: "PH101" },
    { name: "Engineering Chemistry", code: "CH101" },
    { name: "Engineering Graphics", code: "EG101" },
    { name: "Programming in C", code: "CS101" },
  ],
  S2: [
    { name: "Mathematics II", code: "MA102" },
    { name: "Electrical Engineering", code: "EE102" },
    { name: "Basic Electronics", code: "EC102" },
  ],
  S3: [
    { name: "THEORY OF COMPUTATION", code: "PCCST302" },
    { name: "DATA STRUCTURES AND ALGORITHMS", code: "PCCST303" },
    { name: "MATHEMATICS FOR COMPUTER AND INFORMATION SCIENCE-3", code: "CS203" },
    { name: "DIGITAL ELECTRONICS AND LOGIC DESIGN", code: "GAEST305" },
    { name: "BASIC CONCEPTS IN COMPUTER NETWORKS", code: "CS205" },
    { name: "ENGINEERING ETHICS", code: "UCHUT346" },
  ],
  S4: [
    { name: "DBMS", code: "CS204" },
    { name: "Computer Networks", code: "CS205" },
    { name: "Software Engineering", code: "CS206" },
  ],
};

const SubjectPage = () => {
  const { semester } = useParams();
  const navigate = useNavigate();
  const subjects = subjectMap[semester] || [];

  return (
    <div className="subject-page">
      <div className="container py-5">
        <button className="back-btn" onClick={() => navigate('/')}>← Back to Home</button>

        <h2 className="subject-title">Semester {semester.slice(1)} - Select Subject</h2>
        <p className="subject-subtitle">Choose a subject to access module-wise questions and answers</p>

        <div className="row mt-4">
          {subjects.map((subject, index) => (
            <div className="col-lg-4 col-md-6 mb-4" key={index}>
              <div className="subject-card">
                <h5 className="subject-name">{subject.name}</h5>
                <p className="subject-code">Course Code: {subject.code}</p>
                <p className="modules-info">4 Modules Available</p>
                <button
                  className="view-btn"
                  onClick={() => navigate(`/module/${semester}/${subject.name}`)}
                >
                  View Modules →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubjectPage;
