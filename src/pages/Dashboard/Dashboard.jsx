// src/pages/Dashboard/Dashboard.jsx

import React from 'react';
import Navbar from '../../components/Navbar';
import '../../Styles/Dashboard.scss';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate()

  const handleCreateTask = () => {
    navigate('/create-task');
  }

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
            <button onClick={() => navigate('/create-project')}>📁 Create Project</button>
              <button onClick={handleCreateTask}>📌 Create New Task</button>
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


// import React, { useEffect, useState } from 'react';
// import Navbar from '../../components/Navbar';
// import { db, auth } from '../../firebase/config';
// import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
// import { useNavigate } from 'react-router-dom';
// import '../../Styles/Dashboard.scss';

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [creating, setCreating] = useState(false);

//   const user = auth.currentUser;

//   useEffect(() => {
//     if (!user) return navigate('/login');

//     const fetchTasks = async () => {
//       try {
//         const q = query(collection(db, 'tasks'), where('userId', '==', user.uid));
//         const snapshot = await getDocs(q);
//         const taskList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//         setTasks(taskList);
//       } catch (error) {
//         console.error("Error fetching tasks:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTasks();
//   }, [user]);

//   const handleCreateTask = async () => {
//     if (!user) return;

//     setCreating(true);
//     try {
//       await addDoc(collection(db, 'tasks'), {
//         title: 'Untitled Task',
//         status: 'pending',
//         createdAt: new Date(),
//         userId: user.uid,
//       });
//       alert('Task created!');
//       window.location.reload();
//     } catch (error) {
//       console.error('Error creating task:', error);
//     } finally {
//       setCreating(false);
//     }
//   };

//   return (
//     <div className="dashboard-layout">
//       <div className="dashboard-main">
//         <Navbar />

//         <div className="dashboard-content">
//           <h1>
//             Welcome to <span>DevBoard</span> 👋
//           </h1>
//           <p>This is your developer workspace. Start building!</p>

//           {loading ? (
//             <p>Loading tasks...</p>
//           ) : (
//             <div className="cards">
//               <div className="card"><h3>🚀 Projects</h3><p>1 Active</p></div>
//               <div className="card"><h3>📁 Tasks</h3><p>{tasks.length} Total</p></div>
//               <div className="card"><h3>🗓️ Deadlines</h3><p>3 This Week</p></div>
//               <div className="card"><h3>🧠 Focus Time</h3><p>18 hrs</p></div>
//             </div>
//           )}

//           <div className="tools">
//             <h2>Developer Quick Tools 🚀</h2>
//             <div className="tool-buttons">
//               <button onClick={handleCreateTask} disabled={creating}>
//                 {creating ? 'Creating...' : '📌 Create New Task'}
//               </button>
//               <button>🔁 Sync with GitHub</button>
//               <button>📦 Deploy Project</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
