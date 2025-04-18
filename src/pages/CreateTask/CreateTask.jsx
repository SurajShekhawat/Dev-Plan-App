// File: src/pages/CreateTask/CreateTask.jsx
import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import './CreateTask.scss';

const CreateTask = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    console.log('Task Title:', title);
    console.log('Task Content:', content);
    // Firestore integration will be added here
  };

  return (
    <div className="create-task-page">
      <h1>Create a New Task 🚀</h1>

      <input
        type="text"
        placeholder="Enter Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="task-title-input"
      />

      <Editor
        apiKey="pdbpiy5tw8r4zdb8mza2lkhpp5b1xx31sk3sd8fgl05era7l"
        value={content}
        init={{
          height: 400,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
          ],
          toolbar:
            'undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help'
        }}
        onEditorChange={(newValue) => setContent(newValue)}
      />

      <div className="task-actions">
        <button onClick={handleSubmit}>Create Task</button>
        <button className="secondary">Save as Draft</button>
      </div>
    </div>
  );
};

export default CreateTask;