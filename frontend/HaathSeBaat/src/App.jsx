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
import LandingPage from './components/LandingPage';
import AnimatedFormContainer from './components/animated/AnimatedFormContainer';
import Translator from './pages/Translator';
import AboutUs from './components/AboutUs';
import SpeechToText from './components/SpeechToText';
import SignLanguageQuiz from './pages/SignLanguageQuiz';
import Features from './components/features';
import RandomSign from './components/Random';

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
            </AnimatedCard>
        </div>
    );
}

function App() {
    return (
        <Router>
            <div className="app-container">
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<AuthPage />} />
                    <Route path="/signup" element={<AuthPage />} />
                    <Route path="/camera" element={<CameraFeed />} />
                    <Route path="/translator" element={<Translator />} />
                    <Route path="*" element={<h1>404 - Page Not Found</h1>} />
                    <Route path="/" element={<h1>Home Page</h1>} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/stt" element={<SpeechToText/>} />
                    <Route path="/Game1" element={<SignLanguageQuiz/>}/>
                    <Route path="/features" element={<Features/>}/>
                    <Route path="/randomsign" element={<RandomSign/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
