import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase/config';
import { collection, addDoc } from 'firebase/firestore';
import { useAuth, AuthContext } from "../../features/auth/AuthContext";
import './CreateProject.scss';

const CreateProject = () => {
  const [form, setForm] = useState({
    name: '',
    framework: '',
    languages: '',
    description: ''
  });
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext); // if using AuthContext

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, 'projects'), {
        ...form,
        createdAt: new Date(),
        uid: currentUser?.uid || 'anonymous', // user-based if logged in
      });

      localStorage.setItem('createdProjectId', docRef.id); // store ID for next page
      navigate('/project-wireframe');
    } catch (err) {
      console.error("Error adding project:", err);
    }
  };

  return (
    <div className="create-project-container">
      <h2>🚀 Create New Project</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Project Name" value={form.name} onChange={handleChange} required />
        <input type="text" name="framework" placeholder="Framework (e.g. React, Vue)" value={form.framework} onChange={handleChange} />
        <input type="text" name="languages" placeholder="Languages (comma separated)" value={form.languages} onChange={handleChange} />
        <textarea name="description" placeholder="Project Description" value={form.description} onChange={handleChange} />
        <button type="submit">🧱 Create Project</button>
      </form>
    </div>
  );
};

export default CreateProject;
