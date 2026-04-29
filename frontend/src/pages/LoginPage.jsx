import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Email and password are required!');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Login failed: ' + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -top-40 -left-40 animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -bottom-40 right-20 animate-pulse"></div>

      <div className="relative z-10 w-full max-w-md">
        <div className="backdrop-blur-xl bg-white/8 border border-white/10 rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-2xl mb-6 shadow-2xl animate-bounce">
              <span className="text-4xl">🚀</span>
            </div>
            <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200 mb-2">
              TaskFlow
            </h1>
            <p className="text-gray-300 text-sm font-medium">Welcome Back</p>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/40 text-red-200 p-4 rounded-xl mb-6">
              <p className="font-semibold">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-3 rounded-xl bg-white/6 border border-white/8 text-white placeholder-gray-400 focus:border-purple-400 focus:bg-white/12 focus:outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-5 py-3 rounded-xl bg-white/6 border border-white/8 text-white placeholder-gray-400 focus:border-purple-400 focus:bg-white/12 focus:outline-none transition"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-sm text-gray-200 hover:text-white"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-gray-300 cursor-pointer">
                <input type="checkbox" className="mr-2" />
                <span className="font-medium">Remember me</span>
              </label>
              <a href="#" className="text-purple-300 font-bold hover:text-pink-300">Forgot?</a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white font-bold py-3 rounded-xl hover:shadow-2xl transition disabled:opacity-50 transform hover:scale-105"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-white/10"></div>
            <span className="px-3 text-gray-400 text-xs">OR</span>
            <div className="flex-1 border-t border-white/10"></div>
          </div>

          <div className="text-center border-t border-white/10 pt-6">
            <p className="text-gray-300 text-sm">
              New here?{' '}
              <Link to="/register" className="font-bold text-purple-300 hover:text-pink-300">
                Create account
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center mt-8 text-white/50 text-xs">© 2026 TaskFlow</p>
      </div>
    </div>
  );
}