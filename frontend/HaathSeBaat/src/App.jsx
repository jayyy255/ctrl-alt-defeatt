// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import CameraFeed from './components/CameraFeed';
import AnimatedCard from './components/animated/AnimatedCard';
import AnimatedLogo from './components/animated/animatedLogo';
import AnimatedTab from './components/animated/AnimatedTab';
import AnimatedFormContainer from './components/animated/AnimatedFormContainer';
import Translator from './pages/Translator';

function AuthPage() {
    const [activeTab, setActiveTab] = useState('login');

    return (
        <div className="auth-container">
            <AnimatedCard>
                <AnimatedLogo />

                <div className="tabs mb-4">
                    <AnimatedTab
                        isActive={activeTab === 'login'}
                        onClick={() => setActiveTab('login')}
                    >
                        Login
                    </AnimatedTab>
                    <AnimatedTab
                        isActive={activeTab === 'signup'}
                        onClick={() => setActiveTab('signup')}
                    >
                        Sign Up
                    </AnimatedTab>
                </div>

                <AnimatedFormContainer activeTab={activeTab} tabKey={activeTab}>
                    {activeTab === 'login' ? <LoginForm /> : <SignupForm />}
                </AnimatedFormContainer>

                {/* Navigation Link to Camera Page */}
                <div className="mt-4">
                    <Link to="/camera" className="btn btn-outline-primary">
                        📸 Go to Live Camera Feed
                    </Link>
                </div>
            </AnimatedCard>
        </div>
    );
}

function App() {
    return (
        <Router>
            <div className="app-container">
                <Routes>
                    <Route path="/" element={<AuthPage />} />
                    <Route path="/camera" element={<CameraFeed />} />
                    <Route path="/Translator" element={<Translator/>} />
                    <Route path="*" element={<h1>404 - Page Not Found</h1>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
