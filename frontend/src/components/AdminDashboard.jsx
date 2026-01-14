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
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold" style={{ color: '#8B4513', fontFamily: 'Georgia, serif' }}>
              Admin Dashboard
            </h1>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all hover:shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #D4A574 0%, #8B7355 100%)',
                color: 'white',
                fontFamily: 'Georgia, serif',
                fontWeight: 'bold'
              }}>
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-2 mb-6 flex-wrap">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-2 px-6 py-3 rounded-lg transition-all"
                style={{
                  background: activeTab === tab.id
                    ? 'linear-gradient(135deg, #D4A574 0%, #8B7355 100%)'
                    : 'linear-gradient(135deg, #fff8f0 0%, #fdf6ed 100%)',
                  color: activeTab === tab.id ? 'white' : '#8B4513',
                  border: '2px solid #d4c4b0',
                  fontFamily: 'Georgia, serif',
                  fontWeight: 'bold',
                  boxShadow: activeTab === tab.id ? '0 4px 15px rgba(139, 69, 19, 0.3)' : ''
                }}>
                <Icon size={20} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-2xl p-6" style={{
          border: '3px solid #d4c4b0',
          minHeight: '500px'
        }}>
          {activeTab === 'photos' && <PhotosTab />}
          {activeTab === 'letter' && <LoveLetterTab />}
          {activeTab === 'messages' && <MessagesTab />}
          {activeTab === 'settings' && <SettingsTab />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
