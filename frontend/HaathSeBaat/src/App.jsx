import React, { useEffect, useState } from 'react';
import { fetchMessage } from '../api';

function App() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const getMessage = async () => {
            const msg = await fetchMessage();
            setMessage(msg);
        };

        getMessage();
    }, []);

    return (
        <div className="container d-flex align-items-center justify-content-center min-vh-100 bg-light">
            <h1 className="display-4 text-primary">{message}</h1>
            <h1 className="display-4 text-primary">Hello </h1>
        </div>
    );
}

export default App;
