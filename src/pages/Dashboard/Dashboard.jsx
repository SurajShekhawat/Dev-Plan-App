// src/pages/Dashboard/Dashboard.jsx

import React from 'react';
// import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import '../../Styles/Dashboard.scss';

const Dashboard = () => {
  return (
    <div className="dashboard-layout">
      {/* <Sidebar /> */}
      <div className="dashboard-main">
        <Navbar />

        <div className="dashboard-content">
          <h1>
            Welcome to <span>DevBoard</span> 👋
          </h1>
          <p>This is your developer workspace. Start building!</p>

          <div className="cards">
            <div className="card"><h3>🚀 Projects</h3><p>5 Active</p></div>
            <div className="card"><h3>📁 Tasks</h3><p>12 Pending</p></div>
            <div className="card"><h3>🗓️ Deadlines</h3><p>3 This Week</p></div>
            <div className="card"><h3>🧠 Focus Time</h3><p>18 hrs</p></div>
          </div>

          <div className="tools">
            <h2>Developer Quick Tools 🚀</h2>
            <div className="tool-buttons">
              <button>📌 Create New Task</button>
              <button>🔁 Sync with GitHub</button>
              <button>📦 Deploy Project</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
