import React, { useState, useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CountdownPage from "./components/CountdownPage";
import BirthdayWebsite from "./components/BirthdayWebsite";
import { birthdayData } from "./mock";

const Home = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Check if birthday has passed
  useEffect(() => {
    const checkBirthday = () => {
      const now = new Date();
      const birthday = new Date(birthdayData.birthdayDate);
      if (now >= birthday) {
        setIsUnlocked(true);
      }
    };
    
    checkBirthday();
  }, []);

  const handleCountdownComplete = () => {
    setIsUnlocked(true);
  };

  if (!isUnlocked) {
    return (
      <CountdownPage
        targetDate={birthdayData.birthdayDate}
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
