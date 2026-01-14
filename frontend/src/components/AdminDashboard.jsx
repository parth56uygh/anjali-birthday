import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Image as ImageIcon, Mail, MessageCircle, Settings as SettingsIcon } from 'lucide-react';
import axios from 'axios';
import PhotosTab from './admin/PhotosTab';
import LoveLetterTab from './admin/LoveLetterTab';
import MessagesTab from './admin/MessagesTab';
import SettingsTab from './admin/SettingsTab';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('photos');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin/login');
  };

  const tabs = [
    { id: 'photos', label: 'Photos', icon: ImageIcon },
    { id: 'letter', label: 'Love Letter', icon: Mail },
    { id: 'messages', label: 'Messages', icon: MessageCircle },
    { id: 'settings', label: 'Settings', icon: SettingsIcon }
  ];

  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(135deg, #f5e6d3 0%, #e8d5c4 100%)'
    }}>
      {/* Header */}
      <nav className="bg-white/90 backdrop-blur-md shadow-lg" style={{
        borderBottom: '3px solid #d4c4b0'
      }}>
        <div className=\"max-w-7xl mx-auto px-4\">\n          <div className=\"flex items-center justify-between h-16\">\n            <h1 className=\"text-2xl font-bold\" style={{ color: '#8B4513', fontFamily: 'Georgia, serif' }}>\n              Admin Dashboard\n            </h1>\n            <button\n              onClick={handleLogout}\n              className=\"flex items-center gap-2 px-4 py-2 rounded-lg transition-all hover:shadow-lg\"\n              style={{\n                background: 'linear-gradient(135deg, #D4A574 0%, #8B7355 100%)',\n                color: 'white',\n                fontFamily: 'Georgia, serif',\n                fontWeight: 'bold'\n              }}>\n              <LogOut size={18} />\n              Logout\n            </button>\n          </div>\n        </div>\n      </nav>

      {/* Tabs */}
      <div className=\"max-w-7xl mx-auto px-4 py-6\">\n        <div className=\"flex gap-2 mb-6 flex-wrap\">\n          {tabs.map(tab => {\n            const Icon = tab.icon;\n            return (\n              <button\n                key={tab.id}\n                onClick={() => setActiveTab(tab.id)}\n                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all`}\n                style={{\n                  background: activeTab === tab.id\n                    ? 'linear-gradient(135deg, #D4A574 0%, #8B7355 100%)'\n                    : 'linear-gradient(135deg, #fff8f0 0%, #fdf6ed 100%)',\n                  color: activeTab === tab.id ? 'white' : '#8B4513',\n                  border: '2px solid #d4c4b0',\n                  fontFamily: 'Georgia, serif',\n                  fontWeight: 'bold',\n                  boxShadow: activeTab === tab.id ? '0 4px 15px rgba(139, 69, 19, 0.3)' : ''\n                }}>\n                <Icon size={20} />\n                {tab.label}\n              </button>\n            );\n          })}\n        </div>\n\n        {/* Tab Content */}\n        <div className=\"bg-white rounded-lg shadow-2xl p-6\" style={{\n          border: '3px solid #d4c4b0',\n          minHeight: '500px'\n        }}>\n          {activeTab === 'photos' && <PhotosTab />}\n          {activeTab === 'letter' && <LoveLetterTab />}\n          {activeTab === 'messages' && <MessagesTab />}\n          {activeTab === 'settings' && <SettingsTab />}\n        </div>\n      </div>\n    </div>\n  );\n};\n\nexport default AdminDashboard;
