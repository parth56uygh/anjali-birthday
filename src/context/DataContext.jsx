import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
};

// Default data
const defaultData = {
  settings: {
    girlfriendName: 'Anjali',
    birthdayDate: '2026-02-04T00:00:00',
    unlockPassword: 'love',
    adminPassword: 'admin123'
  },
  loveLetter: {
    title: 'A Letter From My Heart',
    content: 'Dear Anjali,\\n\\nThis is a placeholder for your heartfelt message. You can edit this in the admin panel.\\n\\nHappy Birthday!\\n\\nWith all my love,\\nYour Love'
  },
  messages: [
    { id: '1', title: 'Why I Love You', message: 'You make every day brighter with your smile.', order: 1 },
    { id: '2', title: 'Our First Memory', message: "I'll never forget the first time we met.", order: 2 },
    { id: '3', title: 'What Makes You Special', message: 'Your love for Taylor Swift, food, and makeup makes you uniquely you.', order: 3 },
    { id: '4', title: 'Looking Forward', message: "I can't wait to create more memories with you!", order: 4 }
  ],
  photos: [],
  playlist: [
    { id: 1, title: 'Love Story', artist: 'Taylor Swift', album: 'Fearless' },
    { id: 2, title: 'Blank Space', artist: 'Taylor Swift', album: '1989' },
    { id: 3, title: 'Shake It Off', artist: 'Taylor Swift', album: '1989' },
    { id: 4, title: 'You Belong With Me', artist: 'Taylor Swift', album: 'Fearless' },
    { id: 5, title: 'Anti-Hero', artist: 'Taylor Swift', album: 'Midnights' },
    { id: 6, title: 'Cruel Summer', artist: 'Taylor Swift', album: 'Lover' },
    { id: 7, title: 'Willow', artist: 'Taylor Swift', album: 'evermore' },
    { id: 8, title: 'Cardigan', artist: 'Taylor Swift', album: 'folklore' },
    { id: 9, title: 'All Too Well', artist: 'Taylor Swift', album: 'Red' },
    { id: 10, title: 'Style', artist: 'Taylor Swift', album: '1989' }
  ]
};

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    // Load from localStorage or use defaults
    const saved = localStorage.getItem('birthdayWebsiteData');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing saved data:', e);
        return defaultData;
      }
    }
    return defaultData;
  });

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('birthdayWebsiteData', JSON.stringify(data));
  }, [data]);

  const updateSettings = (newSettings) => {
    setData(prev => ({
      ...prev,
      settings: { ...prev.settings, ...newSettings }
    }));
  };

  const updateLoveLetter = (newLetter) => {
    setData(prev => ({
      ...prev,
      loveLetter: { ...prev.loveLetter, ...newLetter }
    }));
  };

  const addMessage = (message) => {
    const newMessage = {
      ...message,
      id: Date.now().toString(),
      order: data.messages.length + 1
    };
    setData(prev => ({
      ...prev,
      messages: [...prev.messages, newMessage]
    }));
  };

  const updateMessage = (id, updates) => {
    setData(prev => ({
      ...prev,
      messages: prev.messages.map(msg => 
        msg.id === id ? { ...msg, ...updates } : msg
      )
    }));
  };

  const deleteMessage = (id) => {
    setData(prev => ({
      ...prev,
      messages: prev.messages.filter(msg => msg.id !== id)
    }));
  };

  const addPhoto = (photo) => {
    const newPhoto = {
      ...photo,
      id: Date.now().toString(),
      order: data.photos.length + 1
    };
    setData(prev => ({
      ...prev,
      photos: [...prev.photos, newPhoto]
    }));
  };

  const updatePhoto = (id, updates) => {
    setData(prev => ({
      ...prev,
      photos: prev.photos.map(photo => 
        photo.id === id ? { ...photo, ...updates } : photo
      )
    }));
  };

  const deletePhoto = (id) => {
    setData(prev => ({
      ...prev,
      photos: prev.photos.filter(photo => photo.id !== id)
    }));
  };

  const checkAdminPassword = (password) => {
    return password === data.settings.adminPassword;
  };

  const value = {
    data,
    updateSettings,
    updateLoveLetter,
    addMessage,
    updateMessage,
    deleteMessage,
    addPhoto,
    updatePhoto,
    deletePhoto,
    checkAdminPassword
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
