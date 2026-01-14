import React, { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';

const PhotoGallery = ({ photos }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

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
          Our Beautiful Memories 📸
        </h2>
        {/* Decorative tape */}
        <div className="absolute top-4 right-4 w-16 h-8 bg-yellow-100 opacity-40 rotate-45" style={{
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer bg-white p-3"
            style={{
              animation: `photoAppear 0.6s ease-out ${index * 0.15}s backwards`,
              border: '3px solid #d4c4b0',
              transform: `rotate(${(index % 3 - 1) * 2}deg)`,
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'rotate(0deg) scale(1.05)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(139, 69, 19, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = `rotate(${(index % 3 - 1) * 2}deg) scale(1)`;
              e.currentTarget.style.boxShadow = '';
            }}
            onClick={() => setSelectedPhoto(photo)}>
            <div className="relative">
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-80 object-cover rounded"
              />
              {/* Polaroid-style caption */}
              <div className="absolute bottom-0 left-0 right-0 bg-white p-3 text-center" style={{
                fontFamily: 'Georgia, serif',
                color: '#8B4513',
                borderTop: '1px solid #d4c4b0'
              }}>
                <p className="text-sm font-medium">{photo.caption}</p>
              </div>
              {/* Hover zoom icon */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={48} />
              </div>
            </div>
            
            {/* Decorative tape at top */}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-yellow-100 opacity-60" style={{
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}></div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}>
          <button
            className="absolute top-4 right-4 text-white hover:text-pink-400 transition-colors bg-black/50 rounded-full p-2"
            onClick={() => setSelectedPhoto(null)}>
            <X size={32} />
          </button>
          <div className="max-w-5xl w-full bg-white p-6 rounded-lg" style={{
            border: '4px solid #d4c4b0'
          }}>
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.caption}
              className="w-full h-auto rounded shadow-2xl"
            />
            <p className="text-center mt-6 text-2xl font-bold" style={{ 
              color: '#8B4513',
              fontFamily: 'Georgia, serif' 
            }}>
              {selectedPhoto.caption}
            </p>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes photoAppear {
          from {
            opacity: 0;
            transform: translateY(40px) rotate(10deg) scale(0.9);
          }
          to {
            opacity: 1;
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

export default PhotoGallery;
