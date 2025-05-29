'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/lib/auth-context';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        await signUp(email, password);
      }
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setError(null);
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6f3ef]">
      <div className="w-full h-[700px] mr-3 bg-[#f6f3ef] rounded-3xl flex overflow-hidden">
        {/* Left Side - Auth Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-between px-16 py-12">
          {/* Logo */}
          <div className="flex items-center mb-8">
            <Image src="/logo/lmc-logo.png" alt="Sellora Logo" className='w-10 h-10 rounded-md' width={40} height={40} />
            <span className="ml-3 text-2xl font-bold text-[#05AFF2]">Light Merjj CMS</span>
          </div>

          {/* Form */}
          <div className="flex-1 flex flex-col justify-center items-start">
            <div className="w-full max-w-md">
              <h2 className="text-4xl font-extrabold text-gray-900 mb-3">{isLogin ? 'Login' : 'Register'}</h2>
    

              <div className="flex items-center my-6">
                <div className="flex-grow border-t border-[#e7e3de]"></div>
                <span className="mx-3 text-[#05AFF2] text-base">or</span>
                <div className="flex-grow border-t border-[#e7e3de]"></div>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-base text-[#05AFF2] mb-1">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-6 py-4 border-none rounded-full focus:outline-none focus:ring-2 focus:ring-[#e7e3de] text-gray-900 bg-white text-base shadow-md placeholder:text-[#b6b0a6]"
                  />
                </div>
                <div className="relative">
                  <label htmlFor="password" className="block text-base text-[#05AFF2] mb-1">Password</label>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete={isLogin ? 'current-password' : 'new-password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Type your password"
                    className="w-full px-6 py-4 border-none rounded-full focus:outline-none focus:ring-2 focus:ring-[#e7e3de] text-gray-900 bg-white pr-12 text-base shadow-md placeholder:text-[#b6b0a6]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-4 top-11 text-[#05AFF2] hover:text-gray-700 focus:outline-none"
                    tabIndex={-1}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.336-3.236.938-4.675M15 12a3 3 0 11-6 0 3 3 0 016 0zm6.062-4.675A9.956 9.956 0 0122 9c0 5.523-4.477 10-10 10a9.956 9.956 0 01-4.675-.938" /></svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm2.21-2.21A8.962 8.962 0 0121 12c0 4.418-3.582 8-8 8s-8-3.582-8-8c0-1.657.336-3.236.938-4.675" /></svg>
                    )}
                  </button>
                </div>
                {!isLogin && (
                  <div className="relative">
                    <label htmlFor="confirmPassword" className="block text-base text-[#05AFF2] mb-1">Confirm Password</label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your password"
                      className="w-full px-6 py-4 border-none rounded-full focus:outline-none focus:ring-2 focus:ring-[#e7e3de] text-gray-900 bg-white pr-12 text-base shadow-md placeholder:text-[#b6b0a6]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((v) => !v)}
                      className="absolute right-4 top-11 text-[#05AFF2] hover:text-gray-700 focus:outline-none"
                      tabIndex={-1}
                      aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                    >
                      {showConfirmPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.336-3.236.938-4.675M15 12a3 3 0 11-6 0 3 3 0 016 0zm6.062-4.675A9.956 9.956 0 0122 9c0 5.523-4.477 10-10 10a9.956 9.956 0 01-4.675-.938" /></svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm2.21-2.21A8.962 8.962 0 0121 12c0 4.418-3.582 8-8 8s-8-3.582-8-8c0-1.657.336-3.236.938-4.675" /></svg>
                      )}
                    </button>
                  </div>
                )}
                <div className="flex items-center justify-between mt-2">
                  <label className="flex items-center gap-2 text-[#05AFF2] text-base">
                    <input id="remember-me" name="remember-me" type="checkbox" className="h-5 w-5 accent-[#05AFF2] rounded border-none focus:ring-0" style={{ accentColor: '#05AFF2' }} />
                    <span className="text-[#05AFF2] font-semibold">Remember me</span>
                  </label>
                  <a href="#" className="text-base text-[#05AFF2] hover:underline font-medium">Forgot password</a>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-full bg-[#05AFF2] text-white font-semibold text-lg shadow-lg hover:bg-[#059fd2] transition disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                >
                  {loading ? 'Processing...' : isLogin ? 'Login' : 'Register'}
                </button>
              </form>
              <div className="mt-8 text-center text-base text-[#05AFF2]">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={toggleAuthMode}
                  className="text-black font-semibold hover:underline ml-1"
                >
                  {isLogin ? 'Register Now' : 'Log In'}
                </button>
              </div>
            </div>
          </div>
          {/* Footer */}
          <div className="mt-10 flex justify-between text-xs text-[#b6b0a6]">
            <span>Copyright © 2025 Light Merjj CMS.</span>
            <a href="#" className="hover:underline">Privacy Policy</a>
          </div>
        </div>
        {/* Right Side - Marketing */}
        <div className="hidden md:flex w-1/2 bg-[#05AFF2] flex-col items-center justify-center relative p-10 rounded-l-3xl">
          <div className="text-white text-center text-3xl font-extrabold max-w-xl mb-6 text-left leading-snug drop-shadow-xl">
            All in one Content Management Platform<br />
            <span className="text-2xl font-normal block mt-2 opacity-80">Quickly. Globally.</span>
          </div>
          <div className="w-full flex justify-center">
            <Image src="/dashbord-preview.png" alt="Dashboard Illustration" width={500} height={400} className="rounded-2xl shadow-2xl  p-2" />
          </div>
        </div>
      </div>
    </div>
  );
} 