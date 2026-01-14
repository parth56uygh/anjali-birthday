import React, { useState } from 'react';
import { Heart, Music, Image as ImageIcon, Mail, MessageCircle, Sparkles } from 'lucide-react';
import PhotoGallery from './PhotoGallery';
import LoveLetter from './LoveLetter';
import PersonalMessages from './PersonalMessages';
import BirthdayWishes from './BirthdayWishes';
import MusicPlayer from './MusicPlayer';
import { birthdayData } from '../mock';

const BirthdayWebsite = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [confetti, setConfetti] = useState([]);

  React.useEffect(() => {
    // Trigger confetti on load
    triggerConfetti();
  }, []);

  const triggerConfetti = () => {
    const newConfetti = Array.from({ length: 50 }, (_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 100,
      animationDelay: Math.random() * 2,
      color: ['#FFB6C1', '#E6E6FA', '#FFDAB9', '#FF69B4', '#DDA0DD'][Math.floor(Math.random() * 5)]
    }));
    setConfetti(newConfetti);
    setTimeout(() => setConfetti([]), 5000);
  };

  const sections = [
    { id: 'home', label: 'Home', icon: Heart },
    { id: 'gallery', label: 'Gallery', icon: ImageIcon },
    { id: 'letter', label: 'Love Letter', icon: Mail },
    { id: 'messages', label: 'Messages', icon: MessageCircle },
    { id: 'wishes', label: 'Wishes', icon: Sparkles }
  ];

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #FFF0F5 0%, #E6E6FA 50%, #FFE4E1 100%)' }}>
      {/* Confetti */}
      {confetti.map(conf => (
        <div
          key={conf.id}
          className="fixed w-3 h-3 rounded-full"
          style={{
            left: `${conf.left}%`,
            top: '-20px',
            backgroundColor: conf.color,
            animation: `fall 3s ease-in forwards`,
            animationDelay: `${conf.animationDelay}s`,
            zIndex: 1000
          }}
        />
      ))}

      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <Heart className="text-pink-500" size={32} fill="currentColor" />
              <h1 className="text-2xl md:text-3xl font-bold" style={{ color: '#FF69B4' }}>
                Happy Birthday Anjali!
              </h1>
            </div>
            <div className="hidden md:flex gap-6">
              {sections.map(section => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                      activeSection === section.id
                        ? 'bg-pink-500 text-white shadow-lg'
                        : 'text-purple-600 hover:bg-pink-100'
                    }`}>
                    <Icon size={18} />
                    <span className="font-medium">{section.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
          {/* Mobile navigation */}
          <div className="md:hidden flex gap-2 pb-4 overflow-x-auto">
            {sections.map(section => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all whitespace-nowrap ${
                    activeSection === section.id
                      ? 'bg-pink-500 text-white shadow-lg'
                      : 'text-purple-600 bg-white'
                  }`}>
                  <Icon size={16} />
                  <span className="text-sm font-medium">{section.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeSection === 'home' && (
          <div className="text-center py-12 animate-fadeIn">
            <div className="mb-8">
              <Sparkles className="text-pink-400 mx-auto mb-4" size={64} />
              <h2 className="text-5xl md:text-7xl font-bold mb-4" style={{ color: '#FF69B4' }}>
                Happy Birthday!
              </h2>
              <p className="text-2xl md:text-3xl text-purple-600 mb-8">
                To the most amazing person in the world
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-12">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all hover:transform hover:scale-105">
                <Heart className="text-pink-500 mx-auto mb-4" size={48} fill="currentColor" />
                <h3 className="text-xl font-bold text-purple-700 mb-2">Lover of Taylor Swift</h3>
                <p className="text-purple-600">Your passion for music makes every moment special</p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all hover:transform hover:scale-105">
                <Sparkles className="text-pink-500 mx-auto mb-4" size={48} />
                <h3 className="text-xl font-bold text-purple-700 mb-2">Makeup Artist Extraordinaire</h3>
                <p className="text-purple-600">You make the world more beautiful</p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all hover:transform hover:scale-105">
                <Heart className="text-pink-500 mx-auto mb-4" size={48} fill="currentColor" />
                <h3 className="text-xl font-bold text-purple-700 mb-2">Food Lover</h3>
                <p className="text-purple-600">Every meal with you is an adventure</p>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'gallery' && <PhotoGallery photos={birthdayData.photos} />}
        {activeSection === 'letter' && <LoveLetter letter={birthdayData.loveLetter} />}
        {activeSection === 'messages' && <PersonalMessages messages={birthdayData.personalMessages} />}
        {activeSection === 'wishes' && <BirthdayWishes wishes={birthdayData.birthdayWishes} />}
      </main>

      {/* Music Player - Fixed at bottom */}
      <MusicPlayer playlist={birthdayData.playlist} />

      <style jsx>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
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
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default BirthdayWebsite;
