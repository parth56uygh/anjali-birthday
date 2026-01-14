import React, { useState, useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CountdownPage from "./components/CountdownPage";
import BirthdayWebsite from "./components/BirthdayWebsite";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Home = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [birthdayDate, setBirthdayDate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/settings`);
        const date = response.data.birthday_date;
        setBirthdayDate(date);
        
        // Check if birthday has passed
        const now = new Date();
        const birthday = new Date(date);
        if (now >= birthday) {
          setIsUnlocked(true);
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSettings();
  }, []);

  const handleCountdownComplete = () => {
    setIsUnlocked(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{
        background: 'linear-gradient(135deg, #f5e6d3 0%, #e8d5c4 100%)'
      }}>
        <p style={{ color: '#8B4513', fontFamily: 'Georgia, serif', fontSize: '24px' }}>Loading...</p>
      </div>
    );
  }

  if (!isUnlocked) {
    return (
      <CountdownPage
        targetDate={birthdayDate}
        onCountdownComplete={handleCountdownComplete}
      />
    );
  }

  return <BirthdayWebsite />;
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
