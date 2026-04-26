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
    
    if (!name.trim()) {
      setError('Name is required!');
      return;
    }
    if (!email.trim()) {
      setError('Email is required!');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters!');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
    if (!agreeTerms) {
      setError('You must agree to the terms and conditions!');
      return;
    }

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

  const passwordStrength = password ? (
    password.length < 6 ? 'weak' :
    password.length < 10 ? 'medium' : 'strong'
  ) : 'none';

  const strengthColors = {
    none: 'bg-gray-300',
    weak: 'bg-red-500',
    medium: 'bg-yellow-500',
    strong: 'bg-green-500'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -top-40 -right-40 animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -bottom-40 left-20 animate-pulse"></div>

      <div className="relative z-10 w-full max-w-md">
        {/* Main Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
          {/* Logo Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full mb-4 shadow-lg">
              <span className="text-3xl">✨</span>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Join TaskFlow
            </h1>
            <p className="text-gray-600 text-sm mt-2">Create your account and start managing tasks</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6 animate-pulse">
              <p className="font-semibold">⚠️ {error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Input */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-800 mb-2">Full Name</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="John Doe" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-purple-600 focus:outline-none transition duration-300 group-hover:border-gray-300 text-gray-800 placeholder-gray-400"
                  required 
                />
                <span className="absolute right-4 top-3.5 text-gray-400">👤</span>
              </div>
            </div>

            {/* Email Input */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-800 mb-2">Email Address</label>
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="you@example.com" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-purple-600 focus:outline-none transition duration-300 group-hover:border-gray-300 text-gray-800 placeholder-gray-400"
                  required 
                />
                <span className="absolute right-4 top-3.5 text-gray-400">✉️</span>
              </div>
            </div>

            {/* Password Input */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-800 mb-2">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="••••••••" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-purple-600 focus:outline-none transition duration-300 group-hover:border-gray-300 text-gray-800 placeholder-gray-400"
                  required 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 transition"
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {/* Password Strength Indicator */}
              {password && (
                <div className="mt-2">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div className={`h-full transition-all duration-300 ${strengthColors[passwordStrength]} ${
                        passwordStrength === 'weak' ? 'w-1/3' :
                        passwordStrength === 'medium' ? 'w-2/3' :
                        'w-full'
                      }`}></div>
                    </div>
                    <span className="text-xs font-semibold text-gray-600 capitalize">{passwordStrength}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password Input */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-800 mb-2">Confirm Password</label>
              <div className="relative">
                <input 
                  type={showConfirmPassword ? 'text' : 'password'} 
                  placeholder="••••••••" 
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-purple-600 focus:outline-none transition duration-300 group-hover:border-gray-300 text-gray-800 placeholder-gray-400"
                  required 
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 transition"
                >
                  {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {password && confirmPassword && (
                <p className={`text-xs mt-2 font-semibold ${password === confirmPassword ? 'text-green-600' : 'text-red-600'}`}>
                  {password === confirmPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
                </p>
              )}
            </div>

            {/* Terms Checkbox */}
            <label className="flex items-start text-sm text-gray-700 cursor-pointer hover:text-purple-600 transition mt-4">
              <input 
                type="checkbox" 
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mr-3 mt-1 rounded cursor-pointer"
              />
              <span>I agree to the <a href="#" className="font-semibold text-purple-600 hover:underline">Terms of Service</a> and <a href="#" className="font-semibold text-purple-600 hover:underline">Privacy Policy</a></span>
            </label>

            {/* Register Button */}
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 rounded-lg hover:shadow-xl transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 mt-6"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <span className="animate-spin mr-2">⏳</span>
                  Creating Account...
                </span>
              ) : (
                '🎉 Create Account'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t-2 border-gray-200"></div>
            <span className="px-3 text-gray-500 text-sm">OR</span>
            <div className="flex-1 border-t-2 border-gray-200"></div>
          </div>

          {/* Login Link */}
          <div className="text-center border-t-2 border-gray-100 pt-6">
            <p className="text-gray-600 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-purple-600 hover:text-pink-600 transition">
                Sign In
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-white/80 text-xs">
          <p>© 2026 TaskFlow. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}