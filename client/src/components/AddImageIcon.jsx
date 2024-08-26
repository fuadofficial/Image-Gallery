import React, { useState } from 'react';
import axios from 'axios';

const AddImageIcon = ({ onImageUpload }) => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await axios.post('http://localhost:5000/api/image/upload', formData);
            onImageUpload(response.data.imageUrl);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <div>
            <input type="file" accept='*/image' onChange={handleFileChange} />
            <button onClick={handleUpload}>Add Image</button>
        </div>
    );
};

export default AddImageIcon;
