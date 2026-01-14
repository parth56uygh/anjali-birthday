import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { useData } from '../context/DataContext';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { checkAdminPassword } = useData();

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (checkAdminPassword(password)) {
      localStorage.setItem('admin_logged_in', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Invalid password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{
      background: 'linear-gradient(135deg, #f5e6d3 0%, #e8d5c4 100%)'
    }}>
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl" style={{
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
            className="w-full py-3 rounded-lg font-bold text-white text-lg transition-all hover:shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #D4A574 0%, #8B7355 100%)',
              fontFamily: 'Georgia, serif'
            }}>
            Login
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
