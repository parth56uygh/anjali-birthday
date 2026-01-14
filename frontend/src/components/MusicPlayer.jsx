import React, { useState } from 'react';
import { Play, Pause, SkipForward, SkipBack, Music } from 'lucide-react';

const MusicPlayer = ({ playlist }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const currentTrack = playlist[currentTrackIndex];

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
  };

  const handlePrevious = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* Expanded Playlist */}
      {isExpanded && (
        <div className="bg-white/95 backdrop-blur-md border-t-3 max-h-96 overflow-y-auto" style={{
          borderTop: '3px solid #d4c4b0',
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'paper\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.04\' result=\'noise\' numOctaves=\'5\'/%3E%3CfeDiffuseLighting in=\'noise\' lighting-color=\'%23fff\' surfaceScale=\'1\'%3E%3CfeDistantLight azimuth=\'45\' elevation=\'60\'/%3E%3C/feDiffuseLighting%3E%3C/filter%3E%3Crect width=\'100\' height=\'100\' filter=\'url(%23paper)\' opacity=\'0.3\'/%3E%3C/svg%3E")'
        }}>
          <div className="max-w-4xl mx-auto p-4">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ 
              color: '#8B4513',
              fontFamily: 'Georgia, serif' 
            }}>
              <Music size={24} className="text-pink-600" />
              Taylor Swift Playlist
            </h3>
            <div className="space-y-2">
              {playlist.map((track, index) => (
                <button
                  key={track.id}
                  onClick={() => setCurrentTrackIndex(index)}
                  className={`w-full text-left p-4 rounded-xl transition-all ${
                    currentTrackIndex === index
                      ? 'border-2'
                      : 'bg-gray-50 hover:bg-pink-50 border-2 border-transparent'
                  }`}
                  style={{
                    background: currentTrackIndex === index ? 'linear-gradient(135deg, #fff8f0 0%, #fdf6ed 100%)' : '',
                    borderColor: currentTrackIndex === index ? '#D4A574' : 'transparent'
                  }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-purple-700">{track.title}</p>
                      <p className="text-sm text-purple-600">{track.artist} • {track.album}</p>
                    </div>
                    {currentTrackIndex === index && isPlaying && (
                      <div className="flex gap-1">
                        <div className="w-1 h-4 bg-pink-500 animate-pulse"></div>
                        <div className="w-1 h-4 bg-pink-500 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-1 h-4 bg-pink-500 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Player Controls */}
      <div className="text-white shadow-2xl" style={{
        background: 'linear-gradient(135deg, #8B7355 0%, #D4A574 50%, #8B7355 100%)',
        borderTop: '3px solid #d4c4b0'
      }}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Current Track Info */}
            <div className="flex-1 min-w-0">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-left hover:opacity-80 transition-opacity">
                <p className="font-bold text-lg truncate">{currentTrack.title}</p>
                <p className="text-sm opacity-90 truncate">{currentTrack.artist}</p>
              </button>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
              <button
                onClick={handlePrevious}
                className="hover:scale-110 transition-transform">
                <SkipBack size={24} fill="white" />
              </button>
              
              <button
                onClick={handlePlayPause}
                className="bg-white text-pink-500 rounded-full p-3 hover:scale-110 transition-transform shadow-lg">
                {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
              </button>
              
              <button
                onClick={handleNext}
                className="hover:scale-110 transition-transform">
                <SkipForward size={24} fill="white" />
              </button>
            </div>

            {/* Track Counter */}
            <div className="flex-1 text-right hidden md:block">
              <p className="text-sm opacity-90">
                Track {currentTrackIndex + 1} of {playlist.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
