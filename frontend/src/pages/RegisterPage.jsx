import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const navigate = useNavigate();
  const register = useAuthStore((state) => state.register);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) { setError('Name is required!'); return; }
    if (!email.trim()) { setError('Email is required!'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters!'); return; }
    if (password !== confirmPassword) { setError('Passwords do not match!'); return; }
    if (!agreeTerms) { setError('You must agree to the terms!'); return; }

    setLoading(true);
    try {
      await register(name, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Registration failed: ' + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = password ? (password.length < 6 ? 'weak' : password.length < 10 ? 'medium' : 'strong') : 'none';
  const strengthColors = { none: 'w-0', weak: 'w-1/3 bg-red-500', medium: 'w-2/3 bg-yellow-500', strong: 'w-full bg-green-500' };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -top-40 right-20 animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -bottom-40 left-20 animate-pulse"></div>

      <div className="relative z-10 w-full max-w-md">
        <div className="backdrop-blur-xl bg-white/8 border border-white/10 rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-2xl mb-4 shadow-2xl animate-bounce">
              <span className="text-4xl">✨</span>
            </div>
            <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200">
              Join TaskFlow
            </h1>
            <p className="text-gray-300 text-xs mt-1">Create your account</p>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/40 text-red-200 p-3 rounded-xl mb-5 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-gray-200 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-2.5 rounded-lg bg-white/6 border border-white/8 text-white placeholder-gray-400 focus:border-pink-400 focus:bg-white/12 focus:outline-none transition text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-200 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 rounded-lg bg-white/6 border border-white/8 text-white placeholder-gray-400 focus:border-pink-400 focus:bg-white/12 focus:outline-none transition text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-200 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  className="w-full px-4 py-2.5 rounded-lg bg-white/6 border border-white/8 text-white placeholder-gray-400 focus:border-pink-400 focus:bg-white/12 focus:outline-none transition text-sm"
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2.5 text-sm">
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>

              {password && (
                <div className="mt-2 flex gap-1 items-center">
                  <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                    <div className={`${strengthColors[passwordStrength]} h-full transition-all duration-300`}></div>
                  </div>
                  <span className={`text-xs font-bold ${passwordStrength === 'weak' ? 'text-red-300' : passwordStrength === 'medium' ? 'text-yellow-300' : 'text-green-300'}`}>
                    {passwordStrength}
                  </span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-200 mb-1">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat password"
                  className="w-full px-4 py-2.5 rounded-lg bg-white/6 border border-white/8 text-white placeholder-gray-400 focus:border-pink-400 focus:bg-white/12 focus:outline-none transition text-sm"
                  required
                />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-2.5 text-sm">
                  {showConfirmPassword ? 'Hide' : 'Show'}
                </button>
              </div>

              {password && confirmPassword && (
                <p className={`text-xs mt-1 ${password === confirmPassword ? 'text-green-300' : 'text-red-300'}`}>
                  {password === confirmPassword ? '✓ Match' : '✗ No match'}
                </p>
              )}
            </div>

            <label className="flex items-start text-xs text-gray-300 cursor-pointer mt-3">
              <input type="checkbox" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} className="mr-2 mt-1" />
              <span>I agree to the Terms of Service and Privacy Policy</span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 text-white font-bold py-3 rounded-lg hover:shadow-2xl transition disabled:opacity-50 transform hover:scale-105 mt-4"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <div className="text-center border-t border-white/10 pt-4 mt-4">
            <p className="text-gray-300 text-xs">
              Have an account?{' '}
              <Link to="/login" className="font-bold text-indigo-300 hover:text-pink-300">Sign In</Link>
            </p>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-white/50 text-xs font-medium">© 2026 TaskFlow</p>
        </div>
      </div>
    </div>
  );
}