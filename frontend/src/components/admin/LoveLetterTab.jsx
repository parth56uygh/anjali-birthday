import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const LoveLetterTab = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchLoveLetter();
  }, []);

  const fetchLoveLetter = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/love-letter`);
      setTitle(response.data.title);
      setContent(response.data.content);
    } catch (error) {
      console.error('Error fetching love letter:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const token = localStorage.getItem('admin_token');
      await axios.put(`${BACKEND_URL}/api/love-letter`, 
        { title, content },
        { headers: { 'Authorization': `Bearer ${token}` }}
      );
      alert('Love letter saved successfully!');
    } catch (error) {
      alert('Error saving love letter: ' + (error.response?.data?.detail || error.message));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8" style={{ color: '#8B4513', fontFamily: 'Georgia, serif' }}>Loading...</div>;
  }

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
          disabled={saving}
          className="px-8 py-3 rounded-lg font-bold text-white flex items-center gap-2 transition-all hover:shadow-lg disabled:opacity-50"
          style={{
            background: 'linear-gradient(135deg, #D4A574 0%, #8B7355 100%)',
            fontFamily: 'Georgia, serif'
          }}>
          <Save size={20} />
          {saving ? 'Saving...' : 'Save Love Letter'}
        </button>
      </form>
    </div>
  );
};

export default LoveLetterTab;
