import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { useData } from '../../context/DataContext';

const SettingsTab = () => {
  const { data, updateSettings } = useData();
  const [settings, setSettings] = useState({
    girlfriendName: data.settings.girlfriendName,
    birthdayDate: data.settings.birthdayDate,
    unlockPassword: data.settings.unlockPassword,
    adminPassword: ''
  });

  const handleSave = (e) => {
    e.preventDefault();

    const updateData = {
      girlfriendName: settings.girlfriendName,
      birthdayDate: settings.birthdayDate,
      unlockPassword: settings.unlockPassword
    };

    // Only include admin_password if it's been changed
    if (settings.adminPassword) {
      updateData.adminPassword = settings.adminPassword;
      alert('Settings saved! Admin password changed. You will need to login again with the new password.');
      localStorage.removeItem('admin_logged_in');
      window.location.href = '/#/admin/login';
      return;
    }

    updateSettings(updateData);
    alert('Settings saved successfully!');
  };

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
            value={settings.girlfriendName}
            onChange={(e) => setSettings({ ...settings, girlfriendName: e.target.value })}
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
            value={settings.birthdayDate.slice(0, 16)}
            onChange={(e) => setSettings({ ...settings, birthdayDate: e.target.value + ':00' })}
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
            value={settings.unlockPassword}
            onChange={(e) => setSettings({ ...settings, unlockPassword: e.target.value })}
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
            value={settings.adminPassword}
            onChange={(e) => setSettings({ ...settings, adminPassword: e.target.value })}
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
          className="px-8 py-3 rounded-lg font-bold text-white flex items-center gap-2 transition-all hover:shadow-lg"
          style={{
            background: 'linear-gradient(135deg, #D4A574 0%, #8B7355 100%)',
            fontFamily: 'Georgia, serif'
          }}>
          <Save size={20} />
          Save Settings
        </button>
      </form>

      <div className="mt-8 p-4 bg-blue-50 border-2 border-blue-300 rounded-lg">
        <p className="font-bold mb-2" style={{ color: '#8B4513' }}>📝 Note:</p>
        <p style={{ color: '#5D4037' }}>
          All data is stored in your browser's localStorage. Make sure to backup your data before clearing browser data!
        </p>
      </div>
    </div>
  );
};

export default SettingsTab;
