import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { useData } from '../../context/DataContext';

const LoveLetterTab = () => {
  const { data, updateLoveLetter } = useData();
  const [title, setTitle] = useState(data.loveLetter.title);
  const [content, setContent] = useState(data.loveLetter.content);

  const handleSave = (e) => {
    e.preventDefault();
    updateLoveLetter({ title, content });
    alert('Love letter saved successfully!');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6" style={{ color: '#8B4513', fontFamily: 'Georgia, serif' }}>
        Love Letter Editor
      </h2>

      <form onSubmit={handleSave}>
        <div className="mb-6">
          <label className="block mb-2 font-bold" style={{ color: '#8B4513', fontFamily: 'Georgia, serif' }}>
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none"
            style={{
              fontFamily: 'Georgia, serif',
              background: '#fff8f0',
              borderColor: '#d4c4b0'
            }}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-bold" style={{ color: '#8B4513', fontFamily: 'Georgia, serif' }}>
            Letter Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none"
            style={{
              fontFamily: 'Georgia, serif',
              background: '#fff8f0',
              borderColor: '#d4c4b0',
              minHeight: '400px'
            }}
            placeholder="Write your heartfelt message here..."
            required
          />
        </div>

        <button
          type="submit"
          className="px-8 py-3 rounded-lg font-bold text-white flex items-center gap-2 transition-all hover:shadow-lg"
          style={{
            background: 'linear-gradient(135deg, #D4A574 0%, #8B7355 100%)',
            fontFamily: 'Georgia, serif'
          }}>
          <Save size={20} />
          Save Love Letter
        </button>
      </form>
    </div>
  );
};

export default LoveLetterTab;
