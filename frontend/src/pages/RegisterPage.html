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
    
    if (!name.trim()) setError('Name is required!');
    else if (!email.trim()) setError('Email is required!');
    else if (password.length < 6) setError('Password must be 6+ characters!');
    else if (password !== confirmPassword) setError('Passwords do not match!');
    else if (!agreeTerms) setError('Agree to terms to continue!');
    else {
      setLoading(true);
      try {
        await register(name, email, password);
        navigate('/dashboard');
      } catch (err) {
        setError('Registration failed: ' + (err.response?.data?.error || err.message));
      } finally {
        setLoading(false);
      }
    }
  };

  const passwordStrength = password ? (
    password.length < 6 ? 'weak' :
    password.length < 10 ? 'medium' : 'strong'
  ) : 'none';

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Blobs */}
      <div className="absolute w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -top-40 right-20 animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -bottom-40 left-20 animate-pulse"></div>

      <div className="relative z-10 w-full max-w-md">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-2xl mb-4 shadow-2xl animate-bounce">
              <span className="text-4xl">✨</span>
            </div>
            <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200">
              Join TaskFlow
            </h1>
            <p className="text-gray-300 text-xs mt-1">Start managing tasks today</p>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-3 rounded-xl mb-5 text-sm">
              <span className="text-lg mr-2">⚠️</span>{error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Name */}
            <div>
              <label className="block text-xs font-bold text-gray-200 mb-1">Full Name</label>
              <input 
                type="text" 
                placeholder="John Doe" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-pink-400 focus:bg-white/20 focus:outline-none transition text-sm"
                required 
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-gray-200 mb-1">Email</label>
              <input 
                type="email" 
                placeholder="you@email.com" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-pink-400 focus:bg-white/20 focus:outline-none transition text-sm"
                required 
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-gray-200 mb-1">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="••••••••" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-pink-400 focus:bg-white/20 focus:outline-none transition text-sm"
                  required 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-sm"
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {/* Strength */}
              {password && (
                <div className="mt-2 flex gap-1">
                  <div className={`h-1 flex-1 rounded ${passwordStrength === 'weak' ? 'bg-red-500' : passwordStrength === 'medium' ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
                  <span className="text-xs text-gray-300">{passwordStrength}</span>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-bold text-gray-200 mb-1">Confirm</label>
              <div className="relative">
                <input 
                  type={showConfirmPassword ? 'text' : 'password'} 
                  placeholder="••••••••" 
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                  className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-pink-400 focus:bg-white/20 focus:outline-none transition text-sm"
                  required 
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-2.5 text-sm"
                >
                  {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {password && confirmPassword && (
                <p className={`text-xs mt-1 ${password === confirmPassword ? 'text-green-400' : 'text-red-400'}`}>
                  {password === confirmPassword ? '✓ Match' : '✗ No match'}
                </p>
              )}
            </div>

            {/* Terms */}
            <label className="flex items-start text-xs text-gray-300 cursor-pointer mt-3">
              <input 
                type="checkbox" 
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mr-2 mt-0.5"
              />
              <span>I agree to Terms of Service and Privacy Policy</span>
            </label>

            {/* Submit */}
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 text-white font-bold py-3 rounded-lg hover:shadow-2xl transition disabled:opacity-50 transform hover:scale-105 active:scale-95 mt-4"
            >
              {loading ? '⏳...' : '🎉 Create Account'}
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center border-t border-white/20 pt-4 mt-4">
            <p className="text-gray-300 text-xs">
              Have account?{' '}
              <Link to="/login" className="font-bold text-purple-300 hover:text-pink-300">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}