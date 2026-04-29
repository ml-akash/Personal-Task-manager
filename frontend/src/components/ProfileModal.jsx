import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

export default function ProfileModal({ isOpen, onClose }) {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLogout = () => {
    logout();
    navigate('/login');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl w-full max-w-sm animate-slide-in border border-white/10">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 p-6 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-black text-white">👤 Profile</h2>
          </div>
          <button onClick={onClose} className="text-white hover:text-gray-200 text-3xl">✕</button>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          
          {/* Profile Avatar */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full mb-4 shadow-lg">
              <span className="text-5xl">👤</span>
            </div>
          </div>

          {/* User Name */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <p className="text-gray-400 text-sm font-bold mb-2">👤 User Name</p>
            <p className="text-white font-bold text-2xl break-all">{user?.name || 'Not provided'}</p>
          </div>

          {/* Email */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <p className="text-gray-400 text-sm font-bold mb-2">📧 Email Address</p>
            <p className="text-white font-bold text-lg break-all">{user?.email || 'Not provided'}</p>
            <p className="text-gray-400 text-xs mt-2">✓ Verified</p>
          </div>

          {/* Account Status */}
          <div className="bg-green-600/20 border border-green-600/50 rounded-xl p-4">
            <p className="text-green-300 font-bold flex items-center gap-2">
              <span className="text-xl">✓</span>
              Account Status: Active
            </p>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full px-4 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-xl hover:shadow-lg hover:shadow-red-500/50 transition font-bold text-lg transform hover:scale-105 active:scale-95"
          >
            🚪 Logout
          </button>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 text-gray-300 rounded-lg hover:bg-white/20 transition font-bold"
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
}
