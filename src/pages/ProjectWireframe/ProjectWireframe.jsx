import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import './ProjectWireframe.scss';

const ProjectWireframe = () => {
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      const id = localStorage.getItem('createdProjectId');
      if (id) {
        const docRef = doc(db, 'projects', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProject(docSnap.data());
        }
      }
    };

    fetchProject();
  }, []);

  return (
    <div className="wireframe-builder">
      {project ? (
        <>
          <h2>🧩 Wireframe for: {project.name}</h2>
          <p><strong>Framework:</strong> {project.framework}</p>
          <p><strong>Languages:</strong> {project.languages}</p>
          <p><strong>Description:</strong> {project.description}</p>
          <div className="drop-area">
            <p>🖱️ Drag & Drop Elements (Text, Images, Videos...)</p>
            {/* Add UI builder here */}
          </div>
        </>
      ) : (
        <p>Loading project...</p>
      )}
    </div>
  );
};

export default ProjectWireframe;
