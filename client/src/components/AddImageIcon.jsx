import  { useState, useRef } from 'react';
import axios from 'axios';

const AddImageIcon = ({ onImageUpload }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

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

        setUploading(true);

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
        } finally {
            setUploading(false);
        }
    };

    return (
        <>
            <div className="upload-container">
                <div className='upload-container-input'>
                    <label className="custom-file-input">
                        <input type="file" accept="image/*" onChange={handleFileChange} />
                        Choose Image
                    </label>
                    <span className="file-name">{selectedFile ? selectedFile.name : "No file selected"}</span>
                    {imagePreview && (
                        <div className="image-preview">
                            <img src={imagePreview} alt="Selected Preview" />
                        </div>
                    )}
                </div>
                <div className="button-container">
                    <button onClick={handleUpload} disabled={uploading}>
                        {uploading ? 'Uploading...' : 'Add Image'}
                    </button>
                </div>
            </div>
            <div className="progress-bar-container progress-bar-show">
                <div className="progress-bar"></div>
            </div>
        </>
    );
};

export default AddImageIcon;
