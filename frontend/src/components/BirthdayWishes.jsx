import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

const BirthdayWishes = ({ wishes }) => {
  return (
    <div className="animate-fadeIn">
      <div className="text-center mb-12">
        <Sparkles className="text-pink-500 mx-auto mb-4" size={56} />
        <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#FF69B4' }}>
          Birthday Wishes For You! 🎉
        </h2>
        <p className="text-xl text-purple-600">Messages from people who love you</p>
      </div>
      
      <div className="max-w-4xl mx-auto space-y-6">
        {wishes.map((wish, index) => (
          <div
            key={wish.id}
            className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all"
            style={{
              animation: `fadeInUp 0.6s ease-out ${index * 0.1}s backwards`,
              borderLeft: '6px solid #FF69B4'
            }}>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                  {wish.name.charAt(0)}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-purple-700 mb-2">{wish.name}</h3>
                <p className="text-purple-800 text-lg leading-relaxed">{wish.message}</p>
              </div>
              <Heart className="text-pink-400 flex-shrink-0" size={24} fill="currentColor" />
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default BirthdayWishes;
