import React from 'react';
import { Heart } from 'lucide-react';

const LoveLetter = ({ letter }) => {
  return (
    <div className="max-w-3xl mx-auto animate-fadeIn">
      <div className="bg-white rounded-lg shadow-2xl p-8 md:p-12 relative" style={{
        backgroundImage: `
          url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paper'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' result='noise' numOctaves='5'/%3E%3CfeDiffuseLighting in='noise' lighting-color='%23fff' surfaceScale='1'%3E%3CfeDistantLight azimuth='45' elevation='60'/%3E%3C/feDiffuseLighting%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23paper)' opacity='0.3'/%3E%3C/svg%3E"),
          repeating-linear-gradient(
            transparent,
            transparent 31px,
            #e8d5c4 31px,
            #e8d5c4 32px
          )
        `,
        border: '3px solid #d4c4b0',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3), inset 0 0 30px rgba(212, 196, 176, 0.2)'
      }}>
        {/* Torn paper edge at top */}
        <div className="absolute top-0 left-0 right-0 h-4 overflow-hidden" style={{ marginTop: '-3px' }}>
          <svg width="100%" height="20" viewBox="0 0 100 10" preserveAspectRatio="none">
            <path d="M0,5 Q5,0 10,5 T20,5 T30,5 T40,5 T50,5 T60,5 T70,5 T80,5 T90,5 T100,5 L100,10 L0,10 Z" fill="#d4c4b0" />
          </svg>
        </div>

        <div className="flex items-center justify-center gap-3 mb-8 mt-4">
          <Heart className="text-pink-600" size={40} fill="currentColor" />
          <h2 className="text-4xl md:text-5xl font-bold" style={{ 
            color: '#8B4513',
            fontFamily: 'Georgia, serif',
            textShadow: '2px 2px 4px rgba(139, 69, 19, 0.1)'
          }}>
            {letter.title}
          </h2>
          <Heart className="text-pink-600" size={40} fill="currentColor" />
        </div>
        
        <div className="prose prose-lg max-w-none">
          <div className="text-lg leading-relaxed whitespace-pre-wrap" style={{
            fontFamily: 'Brush Script MT, cursive, Georgia, serif',
            color: '#5D4037',
            fontSize: '1.3rem',
            lineHeight: '2.2rem',
            padding: '20px 0'
          }}>
            {letter.content}
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="inline-block">
            <div className="flex items-center gap-2 text-pink-600">
              <Heart size={20} fill="currentColor" className="animate-pulse" />
              <Heart size={28} fill="currentColor" className="animate-pulse" style={{ animationDelay: '0.2s' }} />
              <Heart size={20} fill="currentColor" className="animate-pulse" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-8 right-8 w-20 h-10 bg-yellow-100 opacity-50 rotate-45" style={{
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}></div>
        <div className="absolute bottom-8 left-8 w-20 h-10 bg-yellow-100 opacity-50 -rotate-45" style={{
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}></div>

        {/* Paper clip */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-8 h-12 border-4 border-gray-400 rounded-full" style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 70%, 0 70%)'
        }}></div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px) rotate(-2deg);
          }
          to {
            opacity: 1;
            transform: translateY(0) rotate(0deg);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

export default LoveLetter;
