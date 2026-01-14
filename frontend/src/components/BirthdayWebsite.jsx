import React, { useState, useEffect } from 'react';
import { Heart, Music, Image as ImageIcon, Mail, MessageCircle, Sparkles, Lock } from 'lucide-react';
import PhotoGallery from './PhotoGallery';
import LoveLetter from './LoveLetter';
import PersonalMessages from './PersonalMessages';
import MusicPlayer from './MusicPlayer';
import { useData } from '../context/DataContext';

const BirthdayWebsite = () => {
  const { data } = useData();
  const [activeSection, setActiveSection] = useState('home');
  const [confetti, setConfetti] = useState([]);
  const [letterUnlocked, setLetterUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  React.useEffect(() => {
    triggerConfetti();
  }, []);

  const triggerConfetti = () => {
    const newConfetti = Array.from({ length: 50 }, (_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 100,
      animationDelay: Math.random() * 2,
      color: ['#D4A574', '#C19A6B', '#E6D5B8', '#8B7355', '#F5DEB3'][Math.floor(Math.random() * 5)]
    }));
    setConfetti(newConfetti);
    setTimeout(() => setConfetti([]), 5000);
  };

  const handleLoveLetterClick = () => {
    if (!letterUnlocked) {
      setShowPasswordModal(true);
    } else {
      setActiveSection('letter');
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // Check password against settings
    if (password.toLowerCase() === data.settings.unlock_password.toLowerCase()) {
      setLetterUnlocked(true);
      setShowPasswordModal(false);
      setActiveSection('letter');
      setPassword('');
      setPasswordError('');
    } else {
      setPasswordError('Wrong password! Hint: Three special words ❤️');
    }
  };

  const sections = [
    { id: 'home', label: 'Home', icon: Heart },
    { id: 'gallery', label: 'Gallery', icon: ImageIcon },
    { id: 'letter', label: 'Love Letter', icon: letterUnlocked ? Mail : Lock, action: handleLoveLetterClick },
    { id: 'messages', label: 'Messages', icon: MessageCircle }
  ];

  return (
    <div className="min-h-screen" style={{ 
      background: 'linear-gradient(135deg, #f5e6d3 0%, #e8d5c4 100%)',
      backgroundImage: `
        url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4c4b0' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
      `
    }}>
      {/* Paper confetti */}
      {confetti.map(conf => (
        <div
          key={conf.id}
          className="fixed w-4 h-6 rounded-sm"
          style={{
            left: `${conf.left}%`,
            top: '-20px',
            backgroundColor: conf.color,
            animation: `fall 3s ease-in forwards`,
            animationDelay: `${conf.animationDelay}s`,
            zIndex: 1000,
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            transform: 'rotate(45deg)'
          }}
        />
      ))}

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
             onClick={() => setShowPasswordModal(false)}>
          <div className="bg-white rounded-lg p-8 max-w-md w-full relative"
               onClick={(e) => e.stopPropagation()}
               style={{
                 backgroundImage: 'url("data:image/svg+xml,%3Csvg width="100" height="100" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="paper"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.04" result="noise" numOctaves="5"/%3E%3CfeDiffuseLighting in="noise" lighting-color="%23fff" surfaceScale="1"%3E%3CfeDistantLight azimuth="45" elevation="60"/%3E%3C/feDiffuseLighting%3E%3C/filter%3E%3Crect width="100" height="100" filter="url(%23paper)" opacity="0.3"/%3E%3C/svg%3E")',
                 border: '3px solid #d4c4b0',
                 boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
               }}>
            <div className="text-center mb-6">
              <Lock className="text-pink-600 mx-auto mb-4" size={48} />
              <h3 className="text-3xl font-bold mb-2" style={{ color: '#8B4513', fontFamily: 'Georgia, serif' }}>
                Love Letter Locked 💕
              </h3>
              <p className="text-lg" style={{ color: '#A0522D' }}>
                Enter the password to unlock
              </p>
            </div>
            <form onSubmit={handlePasswordSubmit}>
              <input
                type="text"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError('');
                }}
                placeholder="Enter password..."
                className="w-full px-4 py-3 rounded-lg border-2 border-brown-300 focus:border-pink-500 focus:outline-none text-lg mb-4"
                style={{
                  fontFamily: 'Georgia, serif',
                  background: '#fff8f0'
                }}
                autoFocus
              />
              {passwordError && (
                <p className="text-red-600 mb-4 text-sm">{passwordError}</p>
              )}
              <button
                type="submit"
                className="w-full py-3 rounded-lg font-bold text-white text-lg transition-all hover:shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #D4A574 0%, #8B7355 100%)',
                  fontFamily: 'Georgia, serif'
                }}>
                Unlock Letter
              </button>
            </form>
            <button
              onClick={() => setShowPasswordModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Navigation - Paper style */}
      <nav className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-50" style={{
        borderBottom: '3px solid #d4c4b0',
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width="100" height="100" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="paper"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.04" result="noise" numOctaves="5"/%3E%3CfeDiffuseLighting in="noise" lighting-color="%23fff" surfaceScale="1"%3E%3CfeDistantLight azimuth="45" elevation="60"/%3E%3C/feDiffuseLighting%3E%3C/filter%3E%3Crect width="100" height="100" filter="url(%23paper)" opacity="0.3"/%3E%3C/svg%3E")'
      }}>
        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between py-3 sm:h-20">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-0">
              <Heart className="text-pink-600" size={24} fill="currentColor" />
              <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-center" style={{ 
                color: '#8B4513',
                fontFamily: 'Georgia, serif',
                textShadow: '2px 2px 4px rgba(139, 69, 19, 0.1)'
              }}>
                Happy Birthday {data.settings?.girlfriendName || 'Anjali'}!
              </h1>
            </div>
            <div className="flex gap-1 sm:gap-2 md:gap-4 flex-wrap justify-center w-full sm:w-auto">
              {sections.map(section => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => section.action ? section.action() : setActiveSection(section.id)}
                    className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all text-xs sm:text-base ${
                      activeSection === section.id
                        ? 'shadow-lg'
                        : 'hover:shadow-md'
                    }`}
                    style={{
                      background: activeSection === section.id 
                        ? 'linear-gradient(135deg, #D4A574 0%, #8B7355 100%)'
                        : 'linear-gradient(135deg, #fff8f0 0%, #fdf6ed 100%)',
                      color: activeSection === section.id ? 'white' : '#8B4513',
                      border: '2px solid #d4c4b0',
                      fontFamily: 'Georgia, serif',
                      fontWeight: 'bold'
                    }}>
                    <Icon size={14} className="sm:w-[18px] sm:h-[18px]" />
                    <span className="hidden sm:inline">{section.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeSection === 'home' && (
          <div className="text-center py-12 animate-fadeIn">
            {/* Paper card */}
            <div className="bg-white rounded-lg p-12 shadow-2xl max-w-4xl mx-auto relative mb-8"
                 style={{
                   backgroundImage: 'url("data:image/svg+xml,%3Csvg width="100" height="100" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="paper"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.04" result="noise" numOctaves="5"/%3E%3CfeDiffuseLighting in="noise" lighting-color="%23fff" surfaceScale="1"%3E%3CfeDistantLight azimuth="45" elevation="60"/%3E%3C/feDiffuseLighting%3E%3C/filter%3E%3Crect width="100" height="100" filter="url(%23paper)" opacity="0.3"/%3E%3C/svg%3E")',
                   border: '3px solid #d4c4b0',
                   boxShadow: '0 20px 60px rgba(0,0,0,0.2)'
                 }}>
              <Sparkles className="text-pink-600 mx-auto mb-4" size={64} />
              <h2 className="text-5xl md:text-7xl font-bold mb-4" style={{ 
                color: '#8B4513',
                fontFamily: 'Georgia, serif',
                textShadow: '2px 2px 4px rgba(139, 69, 19, 0.1)'
              }}>
                Happy Birthday!
              </h2>
              <p className="text-2xl md:text-3xl mb-8" style={{ 
                color: '#A0522D',
                fontFamily: 'Georgia, serif' 
              }}>
                To the most amazing person in the world
              </p>
              
              {/* Decorative tape */}
              <div className="absolute top-8 right-8 w-16 h-8 bg-yellow-100 opacity-40 rotate-45" style={{
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}></div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-12">
              {[
                { icon: Heart, title: 'Lover of Taylor Swift', text: 'Your passion for music makes every moment special' },
                { icon: Sparkles, title: 'Makeup Artist Extraordinaire', text: 'You make the world more beautiful' },
                { icon: Heart, title: 'Food Lover', text: 'Every meal with you is an adventure' }
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-8 shadow-xl hover:shadow-2xl transition-all hover:transform hover:scale-105 hover:-rotate-1"
                  style={{
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg width="100" height="100" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="paper"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.04" result="noise" numOctaves="5"/%3E%3CfeDiffuseLighting in="noise" lighting-color="%23fff" surfaceScale="1"%3E%3CfeDistantLight azimuth="45" elevation="60"/%3E%3C/feDiffuseLighting%3E%3C/filter%3E%3Crect width="100" height="100" filter="url(%23paper)" opacity="0.3"/%3E%3C/svg%3E")',
                    border: '2px solid #d4c4b0',
                    animation: `slideUp 0.6s ease-out ${index * 0.2}s backwards`
                  }}>
                  <item.icon className="text-pink-600 mx-auto mb-4" size={48} fill="currentColor" />
                  <h3 className="text-xl font-bold mb-2" style={{ color: '#8B4513', fontFamily: 'Georgia, serif' }}>
                    {item.title}
                  </h3>
                  <p style={{ color: '#A0522D' }}>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'gallery' && <PhotoGallery photos={data.photos} />}
        {activeSection === 'letter' && letterUnlocked && <LoveLetter letter={data.loveLetter} />}
        {activeSection === 'messages' && <PersonalMessages messages={data.messages} />}
      </main>

      {/* Music Player */}
      <MusicPlayer playlist={data.playlist} />

      <style jsx>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px) rotate(-5deg);
          }
          to {
            opacity: 1;
            transform: translateY(0) rotate(0deg);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default BirthdayWebsite;
