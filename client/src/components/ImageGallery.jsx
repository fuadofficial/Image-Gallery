import { useEffect, useState } from 'react';
import axios from 'axios';
import AddImageIcon from "../components/AddImageIcon";

const ImageGallery = () => {
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const response = await axios.get('https://image-gallery-server-six.vercel.app/api/image');
            setImages(response.data.images);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    const handleImageUpload = (newImageUrl) => {
        setImages([...images, newImageUrl]);
    };

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const handleCloseModal = () => {
        setSelectedImage(null);
    };

    const handleDeleteImage = async () => {
        try {
            await axios.delete('https://image-gallery-server-six.vercel.app/api/image/delete', {
                headers: { 'Content-Type': 'application/json' },
                data: { imageUrl: selectedImage }
            });
            setImages(images.filter(image => image !== selectedImage));
            setSelectedImage(null);
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    };

    return (
        <div className='gallery-container'>
            <h2>Image Gallery</h2>
            <AddImageIcon onImageUpload={handleImageUpload} />
            <div className="gallery">
                {images.map((image, index) => (
                    <img
                        className='image'
                        key={index}
                        src={`http://localhost:5000${image}`}
                        alt="gallery"
                        onClick={() => handleImageClick(image)}
                    />
                ))}
            </div>

            {selectedImage && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseModal}>&times;</span>
                        <img src={`http://localhost:5000${selectedImage}`} alt="Selected" />
                        <button className="delete-btn" onClick={handleDeleteImage}>Delete</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageGallery;
