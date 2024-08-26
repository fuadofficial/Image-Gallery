import React, { useState,useRef } from 'react';
import axios from 'axios';

const AddImageIcon = ({ onImageUpload }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null); // Ref for file input

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        } else {
            setImagePreview(null);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await axios.post('http://localhost:5000/api/image/upload', formData);
            onImageUpload(response.data.imageUrl);

            setSelectedFile(null);
            setImagePreview(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <div class="upload-container">
            <label class="custom-file-input">
                <input type="file" ref={fileInputRef} accept="image/*" onChange={handleFileChange} />
                Choose Image
            </label>
            <span class="file-name">{selectedFile ? selectedFile.name : "No file selected"}</span>
            {imagePreview && (
                <div className="image-preview">
                    <img src={imagePreview} alt="Selected Preview" />
                </div>
            )}
            <button onClick={handleUpload}>Add Image</button>
        </div>

    );
};

export default AddImageIcon;
