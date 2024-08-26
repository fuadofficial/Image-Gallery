import React, { useState } from 'react';
import axios from 'axios';

const AddImageIcon = ({ onImageUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', selectedFile);

    const response = await axios.post('http://localhost:5000/upload', formData);
    onImageUpload(response.data.imageUrl);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Add Image</button>
    </div>
  );
};

export default AddImageIcon;
