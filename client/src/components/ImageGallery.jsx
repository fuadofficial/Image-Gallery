import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddImageIcon from "../components/AddImageIcon";

const ImageGallery = () => {
    const [images, setImages] = useState([]);

    // Fetch images from the server when the component mounts
    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/image');
            setImages(response.data.images);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    const handleImageUpload = (newImageUrl) => {
        setImages([...images, newImageUrl]);
    };

    return (
        <div>
            <h2>Image Gallery</h2>
            <AddImageIcon onImageUpload={handleImageUpload} />
            <div className="gallery">
                {images.map((image, index) => (
                    <img className='image' key={index} src={`http://localhost:5000${image}`} alt="gallery" />
                ))}
            </div>
        </div>
    );
};

export default ImageGallery;
