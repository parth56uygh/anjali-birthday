import React, { useState, useEffect } from "react";
import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import CountdownPage from "./components/CountdownPage";
import BirthdayWebsite from "./components/BirthdayWebsite";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import { DataProvider, useData } from "./context/DataContext";

const Home = () => {
  const { data } = useData();
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if birthday has passed
    const now = new Date();
    const birthday = new Date(data.settings.birthdayDate);
    if (now >= birthday) {
      setIsUnlocked(true);
    }
    setLoading(false);
  }, [data.settings.birthdayDate]);

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
        targetDate={data.settings.birthdayDate}
        onCountdownComplete={handleCountdownComplete}
      />
    );
  }

  return <BirthdayWebsite />;
};

function App() {
  return (
    <div className="App">
      <DataProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </HashRouter>
      </DataProvider>
    </div>
  );
}

export default App;
