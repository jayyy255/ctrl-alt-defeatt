const API_URL = 'http://localhost:3000/api';

export const fetchMessage = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.message;
};
