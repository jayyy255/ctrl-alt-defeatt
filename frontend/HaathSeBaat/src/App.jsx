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
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <h1 className="text-2xl font-bold">{message}</h1>
            <h1>Hello world</h1>
        </div>
    );
}

export default App;
