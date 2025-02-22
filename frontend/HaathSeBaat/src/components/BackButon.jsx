// src/components/BackButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
    const navigate = useNavigate();

    return (
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
            Go Back
        </button>
    );
};

export default BackButton;
