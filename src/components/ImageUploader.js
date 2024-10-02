// src/components/ImageUploader.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImageUploader = () => {
    const [file, setFile] = useState(null);
    const [uploadedImages, setUploadedImages] = useState([]);

    // Fetch uploaded images from your Azure Blob Storage
    const fetchUploadedImages = async () => {
        try {
            const response = await axios.get('https://meesho-backend-app-h8hdhrbqcsh5hrhz.southindia-01.azurewebsites.net/images'); // Change this to your API endpoint
            setUploadedImages(response.data); // Assume the API returns an array of image URLs
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    useEffect(() => {
        fetchUploadedImages();
    }, []);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        try {
            await axios.post('https://meesho-backend-app-h8hdhrbqcsh5hrhz.southindia-01.azurewebsites.net/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setFile(null); // Clear the file input
            fetchUploadedImages(); // Refresh the uploaded images
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div>
            <h1>Upload Image to Azure Blob Storage</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>

            <h2>Uploaded Images</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {uploadedImages.map((image, index) => (
                    <div key={index} style={{ margin: '10px' }}>
                        <img src={image} alt={`Uploaded ${index}`} style={{ width: '200px', height: 'auto' }} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageUploader;
