import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(`${BACKEND_URL}/api/admin/login`, { password });
      
      if (response.data.success) {
        localStorage.setItem('admin_token', response.data.token);
        navigate('/admin/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'Invalid password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{
      background: 'linear-gradient(135deg, #f5e6d3 0%, #e8d5c4 100%)',
      backgroundImage: `
        url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4c4b0' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
      `
    }}>
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width="100" height="100" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="paper"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.04" result="noise" numOctaves="5"/%3E%3CfeDiffuseLighting in="noise" lighting-color="%23fff" surfaceScale="1"%3E%3CfeDistantLight azimuth="45" elevation="60"/%3E%3C/feDiffuseLighting%3E%3C/filter%3E%3Crect width="100" height="100" filter="url(%23paper)" opacity="0.3"/%3E%3C/svg%3E")',
        border: '3px solid #d4c4b0'
      }}>
        <div className="text-center mb-8">
          <Lock className="text-pink-600 mx-auto mb-4" size={48} />
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#8B4513', fontFamily: 'Georgia, serif' }}>
            Admin Login
          </h1>
          <p style={{ color: '#A0522D' }}>Enter your admin password</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <label className="block mb-2 font-bold" style={{ color: '#8B4513', fontFamily: 'Georgia, serif' }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              className="w-full px-4 py-3 rounded-lg border-2 border-brown-300 focus:border-pink-500 focus:outline-none"
              style={{
                fontFamily: 'Georgia, serif',
                background: '#fff8f0',
                borderColor: '#d4c4b0'
              }}
              placeholder="Enter password"
              required
            />
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border-2 border-red-400 rounded-lg text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg font-bold text-white text-lg transition-all hover:shadow-lg disabled:opacity-50"
            style={{
              background: 'linear-gradient(135deg, #D4A574 0%, #8B7355 100%)',
              fontFamily: 'Georgia, serif'
            }}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm" style={{ color: '#A0522D' }}>
          Default password: admin123
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
