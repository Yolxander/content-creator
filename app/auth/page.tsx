'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement authentication logic
    console.log('Form submitted:', { email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-full bg-white flex overflow-hidden">
        {/* Left Side - Auth Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-between p-10 h-screen">
          {/* Logo */}
          <div className="flex items-center mb-8">
            <Image src="/logo/lmc-logo.png" alt="Sellora Logo"  className='w-10 h-10 rounded-md' width={40} height={40} />
            <span className="ml-3 text-2xl font-bold text-gray-900">Light Merjj CMS</span>
          </div>

          {/* Form */}
          <div className="flex-1 flex flex-col justify-center items-center">
            <div className="w-full max-w-2xl bg-white rounded-xl shadow-xl p-8 h-full">
              <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Welcome Back</h2>
              <p className="text-gray-500 mb-6 text-center text-base">Enter your email and password to access your account.</p>
              <form className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-bas font-medium text-gray-700 mb-1">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="sellostore@company.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white text-base"
                  />
                </div>
                <div className="relative">
                  <label htmlFor="password" className="block text-bas font-medium text-gray-700 mb-1">Password</label>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    placeholder="5ellostore."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white pr-10 text-base"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-2 top-7 text-gray-400 hover:text-gray-700 focus:outline-none"
                    tabIndex={-1}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.336-3.236.938-4.675M15 12a3 3 0 11-6 0 3 3 0 016 0zm6.062-4.675A9.956 9.956 0 0122 9c0 5.523-4.477 10-10 10a9.956 9.956 0 01-4.675-.938" /></svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm2.21-2.21A8.962 8.962 0 0121 12c0 4.418-3.582 8-8 8s-8-3.582-8-8c0-1.657.336-3.236.938-4.675" /></svg>
                    )}
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                    <label htmlFor="remember-me" className="ml-2 block text-bas text-gray-900">Remember Me</label>
                  </div>
                  <div className="text-bas">
                    <a href="#" className="font-medium text-blue-600 hover:text-blue-500">Forgot Your Password?</a>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-2 rounded-md bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold text-base shadow hover:from-blue-600 hover:to-blue-700 transition"
                >
                  Log In
                </button>
                <div className="flex items-center my-3">
                  <div className="flex-grow border-t border-gray-200"></div>
                  <span className="mx-2 text-gray-400 text-bas">Or Login With</span>
                  <div className="flex-grow border-t border-gray-200"></div>
                </div>
                <div className="flex gap-2">
                  <button type="button" className="flex-1 flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 hover:bg-gray-50 transition text-bas">
                    <svg width="18" height="18" viewBox="0 0 48 48"><g><circle fill="#fff" cx="24" cy="24" r="24"/><path fill="#4285F4" d="M34.6 24.2c0-.7-.1-1.4-.2-2H24v4.1h6c-.3 1.5-1.3 2.7-2.7 3.5v2.9h4.4c2.6-2.4 4.1-5.9 4.1-10.5z"/><path fill="#34A853" d="M24 36c3.2 0 5.8-1.1 7.7-2.9l-4.4-2.9c-1.2.8-2.7 1.3-4.3 1.3-3.3 0-6-2.2-7-5.2h-4.5v3.2C13.8 33.7 18.5 36 24 36z"/><path fill="#FBBC05" d="M17 26.3c-.3-.8-.5-1.6-.5-2.3s.2-1.6.5-2.3v-3.2h-4.5C11.6 21.1 12 22.5 12 24s-.4 2.9-1.5 5.5l4.5-3.2z"/><path fill="#EA4335" d="M24 18.7c1.7 0 3.2.6 4.3 1.7l3.2-3.2C29.8 15.1 27.2 14 24 14c-5.5 0-10.2 2.3-13.5 6.3l4.5 3.2c1-3 3.7-5.2 7-5.2z"/></g></svg>
                    Google
                  </button>
                  <button type="button" className="flex-1 flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 hover:bg-gray-50 transition text-bas">
                    <svg width="18" height="18" viewBox="0 0 24 24"><g><path d="M16.365 1.43c0 1.14-.93 2.07-2.07 2.07-1.14 0-2.07-.93-2.07-2.07C12.225.29 13.155-.64 14.295-.64c1.14 0 2.07.93 2.07 2.07z" fill="#000"/><path d="M21.43 8.13c-.07-.16-.15-.32-.23-.48-.09-.16-.18-.32-.28-.47-.1-.15-.21-.3-.32-.44-.12-.14-.24-.28-.37-.41-.13-.13-.27-.25-.41-.37-.14-.12-.29-.23-.44-.32-.15-.1-.31-.19-.47-.28-.16-.08-.32-.16-.48-.23-.17-.07-.34-.13-.52-.18-.18-.05-.36-.09-.54-.12-.18-.03-.36-.05-.54-.05-.18 0-.36.02-.54.05-.18.03-.36.07-.54.12-.18.05-.35.11-.52.18-.16.07-.32.15-.48.23-.16.09-.32.18-.47.28-.15.09-.3.2-.44.32-.14.12-.28.24-.41.37-.13.13-.25.27-.37.41-.11.14-.22.29-.32.44-.1.15-.19.31-.28.47-.08.16-.16.32-.23.48-.07.17-.13.34-.18.52-.05.18-.09.36-.12.54-.03.18-.05.36-.05.54 0 .18.02.36.05.54.03.18.07.36.12.54.05.18.11.35.18.52.07.16.15.32.23.48.09.16.18.32.28.47.1.15.21.3.32.44.12.14.24.28.37.41.13.13.27.25.41.37.14.12.29.23.44.32.15.1.31.19.47.28.16.08.32.16.48.23.17.07.34.13.52.18.18.05.36.09.54.12.18.03.36.05.54.05.18 0 .36-.02.54-.05.18-.03.36-.07.54-.12.18-.05.35-.11.52-.18.16-.07.32-.15.48-.23.16-.09.32-.18.47-.28.15-.09.3-.2.44-.32.14-.12.28-.24.41-.37.13-.13.25-.27.37-.41.11-.14.22-.29.32-.44.1-.15.19-.31.28-.47.08-.16.16-.32.23-.48.07-.17.13-.34.18-.52.05-.18.09-.36.12-.54.03-.18.05-.36.05-.54 0-.18-.02-.36-.05-.54-.03-.18-.07-.36-.12-.54-.05-.18-.11-.35-.18-.52z" fill="#000"/></g></svg>
                    Apple
                  </button>
                </div>
              </form>
              <div className="mt-5 text-center text-bas text-gray-500">
                Don't Have An Account?{' '}
                <a href="#" className="text-blue-600 font-medium hover:underline">Register Now.</a>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-10 flex justify-between text-bas text-gray-400">
            <span>Copyright © 2025 Light Merjj CMS.</span>
            <a href="#" className="hover:underline">Privacy Policy</a>
          </div>
        </div>

        {/* Right Side - Marketing */}
        <div className="hidden md:flex w-1/2 bg-blue-600 flex-col items-center justify-center relative p-10">
          <div className="text-white text-2xl max-w-md font-semibold mb-6 text-center leading-snug">
            Effortlessly manage your team and operations.<br />
            <span className="text-base font-normal block mt-2">Log in to access your CRM dashboard and manage your team.</span>
          </div>
          <div className="w-full flex justify-center ">
            <Image src="/dashbord-preview.png" alt="Dashboard Illustration" width={500} height={400} className="rounded-xl shadow-2xl border border-gray-200 bg-white p-2" />
          </div>
        </div>
      </div>
    </div>
  );
} 