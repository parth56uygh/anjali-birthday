import React from 'react';
import { Heart } from 'lucide-react';

const LoveLetter = ({ letter }) => {
  return (
    <div className="max-w-3xl mx-auto animate-fadeIn">
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12" style={{
        background: 'linear-gradient(135deg, #FFF5F7 0%, #FFF0F5 100%)'
      }}>
        <div className="flex items-center justify-center gap-3 mb-8">
          <Heart className="text-pink-500" size={40} fill="currentColor" />
          <h2 className="text-4xl md:text-5xl font-bold" style={{ color: '#FF69B4' }}>
            {letter.title}
          </h2>
          <Heart className="text-pink-500" size={40} fill="currentColor" />
        </div>
        
        <div className="prose prose-lg max-w-none">
          <div className="text-purple-800 text-lg leading-relaxed whitespace-pre-wrap" style={{
            fontFamily: 'Georgia, serif'
          }}>
            {letter.content}
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="inline-block">
            <div className="flex items-center gap-2 text-pink-500">
              <Heart size={20} fill="currentColor" />
              <Heart size={24} fill="currentColor" />
              <Heart size={20} fill="currentColor" />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
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
          animation: fadeIn 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

export default LoveLetter;
