import React, { useState, useEffect } from 'react';
import { Heart, Sparkles } from 'lucide-react';

const CountdownPage = ({ targetDate, onCountdownComplete }) => {
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
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden"
         style={{
           background: 'linear-gradient(135deg, #FFE4E1 0%, #E6E6FA 50%, #FFE4E6 100%)'
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

      <div className="text-center z-10 px-4">
        {/* Header */}
        <div className="mb-12 animate-fadeIn">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="text-pink-400" size={32} />
            <h1 className="text-5xl md:text-7xl font-bold" style={{ color: '#FF69B4' }}>
              Anjali
            </h1>
            <Sparkles className="text-pink-400" size={32} />
          </div>
          <p className="text-2xl md:text-3xl text-purple-600 font-medium">
            Something special is waiting for you...
          </p>
        </div>

        {/* Countdown */}
        <div className="grid grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto">
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Minutes', value: timeLeft.minutes },
            { label: 'Seconds', value: timeLeft.seconds }
          ].map((item, index) => (
            <div
              key={item.label}
              className="countdown-card bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl"
              style={{
                animation: `scaleIn 0.5s ease-out ${index * 0.1}s backwards`
              }}>
              <div className="text-4xl md:text-6xl font-bold mb-2" style={{ color: '#FF69B4' }}>
                {String(item.value).padStart(2, '0')}
              </div>
              <div className="text-sm md:text-lg text-purple-600 font-medium uppercase tracking-wider">
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* Message */}
        <div className="mt-12 animate-pulse">
          <p className="text-xl md:text-2xl text-purple-700 font-medium">
            Your birthday surprise unlocks soon! 🎂✨
          </p>
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
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }
        
        .countdown-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .countdown-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(255, 105, 180, 0.3);
        }
      `}</style>
    </div>
  );
};

export default CountdownPage;
