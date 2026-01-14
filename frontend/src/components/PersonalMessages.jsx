import React from 'react';
import { MessageCircle, Heart } from 'lucide-react';

const PersonalMessages = ({ messages }) => {
  return (
    <div className="animate-fadeIn">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-12" style={{ color: '#FF69B4' }}>
        Messages Just For You 💌
      </h2>
      
      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {messages.map((message, index) => (
          <div
            key={message.id}
            className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all hover:transform hover:scale-105"
            style={{
              animation: `slideIn 0.6s ease-out ${index * 0.15}s backwards`,
              background: index % 2 === 0 ? 'linear-gradient(135deg, #FFE4E1 0%, #FFF0F5 100%)' : 'linear-gradient(135deg, #E6E6FA 0%, #F0E6FF 100%)'
            }}>
            <div className="flex items-center gap-3 mb-4">
              <MessageCircle className="text-pink-500" size={28} />
              <h3 className="text-2xl font-bold text-purple-700">{message.title}</h3>
            </div>
            <p className="text-purple-800 text-lg leading-relaxed">{message.message}</p>
            <div className="mt-6 flex justify-end">
              <Heart className="text-pink-400" size={24} fill="currentColor" />
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
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

export default PersonalMessages;
