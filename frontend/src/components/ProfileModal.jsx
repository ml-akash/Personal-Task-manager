import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

export default function ProfileModal({ isOpen, onClose }) {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('details');
  const [editName, setEditName] = useState(user?.name || '');
  const [editEmail, setEditEmail] = useState(user?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  if (!isOpen) return null;

  const handleLogout = () => {
    logout();
    navigate('/login');
    onClose();
  };

  const handleSaveProfile = () => {
    alert('Profile updated successfully! (Feature coming soon)');
  };

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      alert('All fields required!');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      alert('New passwords do not match!');
      return;
    }
    alert('Password changed successfully! (Feature coming soon)');
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-96 overflow-hidden animate-slide-in border border-white/10">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 p-6 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-black text-white">👤 Profile</h2>
            <p className="text-white/80 text-sm">Manage your account</p>
          </div>
          <button onClick={onClose} className="text-white hover:text-gray-200 text-3xl">✕</button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/10 bg-slate-800/50">
          {[
            { id: 'details', label: '📋 Details', icon: '👤' },
            { id: 'edit', label: '✏️ Edit Profile', icon: '✎' },
            { id: 'password', label: '🔐 Password', icon: '🔒' },
            { id: 'settings', label: '⚙️ Settings', icon: '⚡' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-4 py-3 font-bold transition text-xs md:text-sm ${
                activeTab === tab.id
                  ? 'bg-gradient-to-b from-purple-600 to-transparent text-white border-b-2 border-purple-400'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.icon}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-80 space-y-4">
          
          {/* Tab 1: Details */}
          {activeTab === 'details' && (
            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-gray-400 text-xs font-bold mb-1">👤 Full Name</p>
                <p className="text-white font-bold text-lg">{user?.name || 'Not provided'}</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-gray-400 text-xs font-bold mb-1">📧 Email Address</p>
                <p className="text-white font-bold text-lg break-all">{user?.email || 'Not provided'}</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-gray-400 text-xs font-bold mb-1">🆔 User ID</p>
                <p className="text-gray-300 font-mono text-xs break-all">{user?.id || 'N/A'}</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-gray-400 text-xs font-bold mb-1">📅 Member Since</p>
                <p className="text-white font-bold">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
              <div className="bg-green-600/20 border border-green-600/50 rounded-xl p-4">
                <p className="text-green-300 text-sm font-bold">✓ Account Status: Active</p>
              </div>
            </div>
          )}

          {/* Tab 2: Edit Profile */}
          {activeTab === 'edit' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-2">Name</label>
                <input 
                  type="text" 
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:border-purple-400 focus:outline-none transition"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-2">Email</label>
                <input 
                  type="email" 
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:border-purple-400 focus:outline-none transition"
                  placeholder="Your email"
                />
              </div>
              <button 
                onClick={handleSaveProfile}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-2 rounded-lg hover:shadow-lg transition"
              >
                💾 Save Changes
              </button>
            </div>
          )}

          {/* Tab 3: Change Password */}
          {activeTab === 'password' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-2">Current Password</label>
                <input 
                  type="password" 
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:border-purple-400 focus:outline-none transition"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-2">New Password</label>
                <input 
                  type="password" 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:border-purple-400 focus:outline-none transition"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-2">Confirm Password</label>
                <input 
                  type="password" 
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:border-purple-400 focus:outline-none transition"
                  placeholder="••••••••"
                />
              </div>
              <div className="bg-blue-600/20 border border-blue-600/50 rounded-xl p-3 text-xs text-blue-300">
                <p>💡 Use strong passwords with uppercase, numbers & symbols</p>
              </div>
              <button 
                onClick={handleChangePassword}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold py-2 rounded-lg hover:shadow-lg transition"
              >
                🔐 Change Password
              </button>
            </div>
          )}

          {/* Tab 4: Settings */}
          {activeTab === 'settings' && (
            <div className="space-y-3">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex justify-between items-center">
                <span className="text-white font-bold">🔔 Notifications</span>
                <input type="checkbox" defaultChecked className="w-5 h-5" />
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex justify-between items-center">
                <span className="text-white font-bold">🌙 Dark Mode</span>
                <input type="checkbox" defaultChecked className="w-5 h-5" />
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex justify-between items-center">
                <span className="text-white font-bold">📊 Analytics</span>
                <input type="checkbox" className="w-5 h-5" />
              </div>
              <div className="bg-orange-600/20 border border-orange-600/50 rounded-xl p-3 text-xs text-orange-300">
                <p>⚡ More settings coming soon!</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-800/50 border-t border-white/10 p-4 flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition font-bold"
          >
            ← Back
          </button>
          <button
            onClick={handleLogout}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition font-bold"
          >
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
  );
}