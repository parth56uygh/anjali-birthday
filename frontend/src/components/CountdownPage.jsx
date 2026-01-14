import React, { useState, useEffect } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { useData } from '../context/DataContext';

const CountdownPage = ({ targetDate, onCountdownComplete }) => {
  const { data } = useData();
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [hearts, setHearts] = useState([]);

  function calculateTimeLeft() {
    const difference = new Date(targetDate) - new Date();
    
    if (difference <= 0) {
      return null;
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
      
      if (!newTimeLeft) {
        clearInterval(timer);
        onCountdownComplete();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, onCountdownComplete]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newHeart = {
        id: Date.now(),
        left: Math.random() * 100,
        animationDuration: 3 + Math.random() * 2
      };
      setHearts(prev => [...prev, newHeart]);
      
      setTimeout(() => {
        setHearts(prev => prev.filter(h => h.id !== newHeart.id));
      }, 5000);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  if (!timeLeft) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4"
         style={{
           background: 'linear-gradient(135deg, #f5e6d3 0%, #e8d5c4 100%)',
           backgroundImage: `
             url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4c4b0' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
           `
         }}>
      
      {/* Floating hearts */}
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="absolute text-pink-300 opacity-60"
          style={{
            left: `${heart.left}%`,
            bottom: '-50px',
            animation: `floatUp ${heart.animationDuration}s ease-in forwards`
          }}>
          <Heart size={24} fill="currentColor" />
        </div>
      ))}

      <div className="text-center z-10 px-4 w-full max-w-4xl mx-auto">
        {/* Paper card container */}
        <div className="bg-white rounded-lg p-4 sm:p-8 md:p-12 shadow-2xl relative"
             style={{
               backgroundImage: 'url("data:image/svg+xml,%3Csvg width="100" height="100" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="paper"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.04" result="noise" numOctaves="5"/%3E%3CfeDiffuseLighting in="noise" lighting-color="%23fff" surfaceScale="1"%3E%3CfeDistantLight azimuth="45" elevation="60"/%3E%3C/feDiffuseLighting%3E%3C/filter%3E%3Crect width="100" height="100" filter="url(%23paper)" opacity="0.3"/%3E%3C/svg%3E")',
               border: '2px solid #d4c4b0',
               boxShadow: '0 20px 60px rgba(0,0,0,0.2), inset 0 0 20px rgba(212, 196, 176, 0.1)'
             }}>
          {/* Torn paper edge effect at top */}
          <div className="absolute top-0 left-0 right-0 h-3 overflow-hidden" style={{ marginTop: '-2px' }}>
            <svg width="100%" height="20" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0,5 Q5,0 10,5 T20,5 T30,5 T40,5 T50,5 T60,5 T70,5 T80,5 T90,5 T100,5 L100,10 L0,10 Z" fill="#d4c4b0" />
            </svg>
          </div>

          {/* Header */}
          <div className="mb-8 sm:mb-12 animate-fadeIn">
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4">
              <Sparkles className="text-pink-400" size={24} />
              <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold" style={{ color: '#8B4513' }}>
                {data.settings.girlfriendName}
              </h1>
              <Sparkles className="text-pink-400" size={24} />
            </div>
            <p className="text-lg sm:text-2xl md:text-3xl font-medium" style={{ 
              color: '#A0522D',
              fontFamily: 'Georgia, serif' 
            }}>
              Something magical awaits...
            </p>
          </div>

          {/* Countdown */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 md:gap-8 w-full">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds }
            ].map((item, index) => (
              <div
                key={item.label}
                className="countdown-card bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-6 md:p-8 shadow-lg relative"
                style={{
                  animation: `scaleIn 0.5s ease-out ${index * 0.1}s backwards`,
                  border: '2px solid #d4c4b0',
                  background: 'linear-gradient(135deg, #fff8f0 0%, #fdf6ed 100%)',
                  boxShadow: '0 4px 15px rgba(139, 69, 19, 0.15)'
                }}>
                <div className="text-2xl sm:text-4xl md:text-6xl font-bold mb-1 sm:mb-2" style={{ 
                  color: '#8B4513',
                  fontFamily: 'Georgia, serif' 
                }}>
                  {String(item.value).padStart(2, '0')}
                </div>
                <div className="text-xs sm:text-sm md:text-lg font-medium uppercase tracking-wider" style={{ color: '#A0522D' }}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          {/* Message */}
          <div className="mt-8 sm:mt-12 animate-pulse">
            <p className="text-base sm:text-xl md:text-2xl font-medium px-2" style={{ 
              color: '#8B4513',
              fontFamily: 'Georgia, serif' 
            }}>
              Your birthday surprise unlocks soon! 🎂✨
            </p>
          </div>

          {/* Decorative tape */}
          <div className="absolute top-4 sm:top-8 right-4 sm:right-8 w-12 sm:w-16 h-6 sm:h-8 bg-yellow-100 opacity-40 rotate-45" style={{
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}></div>
          <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 w-12 sm:w-16 h-6 sm:h-8 bg-yellow-100 opacity-40 -rotate-45" style={{
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes floatUp {
          to {
            transform: translateY(-120vh) rotate(360deg);
            opacity: 0;
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8) rotate(-5deg);
          }
          to {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }
        
        .countdown-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .countdown-card:hover {
          transform: translateY(-8px) rotate(2deg);
          box-shadow: 0 10px 25px rgba(139, 69, 19, 0.25);
        }
      `}</style>
    </div>
  );
};

export default CountdownPage;
