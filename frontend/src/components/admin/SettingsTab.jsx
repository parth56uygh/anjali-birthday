import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const SettingsTab = () => {
  const [settings, setSettings] = useState({
    girlfriend_name: '',
    birthday_date: '',
    unlock_password: '',
    admin_password: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/settings`);
      setSettings({
        girlfriend_name: response.data.girlfriend_name,
        birthday_date: response.data.birthday_date,
        unlock_password: response.data.unlock_password,
        admin_password: ''
      });
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const token = localStorage.getItem('admin_token');
      const updateData = {
        girlfriend_name: settings.girlfriend_name,
        birthday_date: settings.birthday_date,
        unlock_password: settings.unlock_password
      };

      // Only include admin_password if it's been changed
      if (settings.admin_password) {
        updateData.admin_password = settings.admin_password;
      }

      await axios.put(`${BACKEND_URL}/api/settings`, updateData, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      alert('Settings saved successfully!');
      
      // If admin password was changed, logout
      if (settings.admin_password) {
        alert('Admin password changed. Please login again.');
        localStorage.removeItem('admin_token');
        window.location.href = '/admin/login';
      }
    } catch (error) {
      alert('Error saving settings: ' + (error.response?.data?.detail || error.message));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8" style={{ color: '#8B4513', fontFamily: 'Georgia, serif' }}>Loading settings...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6" style={{ color: '#8B4513', fontFamily: 'Georgia, serif' }}>
        Website Settings
      </h2>

      <form onSubmit={handleSave} className="max-w-2xl">
        <div className="mb-6">
          <label className="block mb-2 font-bold" style={{ color: '#8B4513', fontFamily: 'Georgia, serif' }}>
            Girlfriend's Name
          </label>
          <input
            type="text"
            value={settings.girlfriend_name}
            onChange={(e) => setSettings({ ...settings, girlfriend_name: e.target.value })}
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
            Birthday Date & Time
          </label>
          <input
            type="datetime-local"
            value={settings.birthday_date.slice(0, 16)}
            onChange={(e) => setSettings({ ...settings, birthday_date: e.target.value + ':00' })}
            className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none"
            style={{
              fontFamily: 'Georgia, serif',
              background: '#fff8f0',
              borderColor: '#d4c4b0'
            }}
            required
          />
          <p className="text-sm mt-2" style={{ color: '#A0522D' }}>
            The website will unlock automatically at this date and time
          </p>
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-bold" style={{ color: '#8B4513', fontFamily: 'Georgia, serif' }}>
            Love Letter Unlock Password
          </label>
          <input
            type="text"
            value={settings.unlock_password}
            onChange={(e) => setSettings({ ...settings, unlock_password: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none"
            style={{
              fontFamily: 'Georgia, serif',
              background: '#fff8f0',
              borderColor: '#d4c4b0'
            }}
            required
          />
          <p className="text-sm mt-2" style={{ color: '#A0522D' }}>
            Password to unlock the love letter section
          </p>
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-bold" style={{ color: '#8B4513', fontFamily: 'Georgia, serif' }}>
            Change Admin Password
          </label>
          <input
            type="password"
            value={settings.admin_password}
            onChange={(e) => setSettings({ ...settings, admin_password: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none"
            style={{
              fontFamily: 'Georgia, serif',
              background: '#fff8f0',
              borderColor: '#d4c4b0'
            }}
            placeholder="Leave blank to keep current password"
          />
          <p className="text-sm mt-2" style={{ color: '#A0522D' }}>
            Only fill this if you want to change your admin password
          </p>
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
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </form>
    </div>
  );
};

export default SettingsTab;
