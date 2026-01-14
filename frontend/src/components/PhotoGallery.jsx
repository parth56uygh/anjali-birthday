import React, { useState } from 'react';
import { X } from 'lucide-react';

const PhotoGallery = ({ photos }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <div className="animate-fadeIn">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-8" style={{ color: '#FF69B4' }}>
        Our Beautiful Memories 📸
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            className="group relative overflow-hidden rounded-3xl shadow-lg cursor-pointer"
            style={{
              animation: `scaleIn 0.5s ease-out ${index * 0.1}s backwards`
            }}
            onClick={() => setSelectedPhoto(photo)}>
            <img
              src={photo.url}
              alt={photo.caption}
              className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-white text-lg font-medium">{photo.caption}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}>
          <button
            className="absolute top-4 right-4 text-white hover:text-pink-400 transition-colors"
            onClick={() => setSelectedPhoto(null)}>
            <X size={32} />
          </button>
          <div className="max-w-4xl w-full">
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.caption}
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
            <p className="text-white text-xl text-center mt-6">{selectedPhoto.caption}</p>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
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
