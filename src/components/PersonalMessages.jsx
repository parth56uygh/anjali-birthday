import React, { useState } from 'react';
import { MessageCircle, Heart, ChevronDown } from 'lucide-react';

const PersonalMessages = ({ messages }) => {
  const [expandedMessage, setExpandedMessage] = useState(null);

  const toggleMessage = (id) => {
    setExpandedMessage(expandedMessage === id ? null : id);
  };

  return (
    <div className="animate-fadeIn">
      {/* Paper header */}
      <div className="bg-white rounded-lg p-8 shadow-xl max-w-4xl mx-auto mb-8 relative"
           style={{
             backgroundImage: 'url("data:image/svg+xml,%3Csvg width="100" height="100" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="paper"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.04" result="noise" numOctaves="5"/%3E%3CfeDiffuseLighting in="noise" lighting-color="%23fff" surfaceScale="1"%3E%3CfeDistantLight azimuth="45" elevation="60"/%3E%3C/feDiffuseLighting%3E%3C/filter%3E%3Crect width="100" height="100" filter="url(%23paper)" opacity="0.3"/%3E%3C/svg%3E")',
             border: '3px solid #d4c4b0'
           }}>
        <h2 className="text-4xl md:text-5xl font-bold text-center" style={{ 
          color: '#8B4513',
          fontFamily: 'Georgia, serif',
          textShadow: '2px 2px 4px rgba(139, 69, 19, 0.1)'
        }}>
          Messages Just For You 💌
        </h2>
      </div>
      
      <div className="max-w-3xl mx-auto space-y-6">
        {messages.map((message, index) => (
          <div
            key={message.id}
            className="bg-white rounded-lg shadow-xl overflow-hidden cursor-pointer"
            style={{
              animation: `slideIn 0.6s ease-out ${index * 0.15}s backwards`,
              border: '3px solid #d4c4b0',
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width="100" height="100" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="paper"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.04" result="noise" numOctaves="5"/%3E%3CfeDiffuseLighting in="noise" lighting-color="%23fff" surfaceScale="1"%3E%3CfeDistantLight azimuth="45" elevation="60"/%3E%3C/feDiffuseLighting%3E%3C/filter%3E%3Crect width="100" height="100" filter="url(%23paper)" opacity="0.3"/%3E%3C/svg%3E")',
              transform: expandedMessage === message.id ? 'scale(1.02)' : 'scale(1)',
              transition: 'all 0.3s ease'
            }}
            onClick={() => toggleMessage(message.id)}>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MessageCircle className="text-pink-600" size={28} />
                  <h3 className="text-2xl font-bold" style={{ color: '#8B4513', fontFamily: 'Georgia, serif' }}>
                    {message.title}
                  </h3>
                </div>
                <ChevronDown 
                  className="text-pink-600 transition-transform" 
                  size={24}
                  style={{
                    transform: expandedMessage === message.id ? 'rotate(180deg)' : 'rotate(0deg)'
                  }}
                />
              </div>
              
              {/* Expandable content */}
              <div 
                className="overflow-hidden transition-all"
                style={{
                  maxHeight: expandedMessage === message.id ? '500px' : '0',
                  opacity: expandedMessage === message.id ? 1 : 0,
                  marginTop: expandedMessage === message.id ? '16px' : '0'
                }}>
                <div className="pt-4 border-t-2 border-dashed" style={{ borderColor: '#d4c4b0' }}>
                  <p className="text-lg leading-relaxed" style={{ 
                    color: '#5D4037',
                    fontFamily: 'Georgia, serif'
                  }}>
                    {message.message}
                  </p>
                  <div className="mt-6 flex justify-end">
                    <Heart className="text-pink-600 animate-pulse" size={24} fill="currentColor" />
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative tape */}
            <div className="absolute top-4 right-4 w-16 h-6 bg-yellow-100 opacity-40 rotate-12" style={{
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}></div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-50px) rotate(-3deg);
          }
          to {
            opacity: 1;
            transform: translateX(0) rotate(0deg);
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
