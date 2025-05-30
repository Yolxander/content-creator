"use client";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();
  const [showRegister, setShowRegister] = useState(false);

  // Registration form state
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Handlers
  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // After registration, redirect to onboarding page
    router.push("/onboarding");
  };

  return (
    <div className="min-h-screen flex bg-[#eaf8fd]">
      {/* Left Side */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-[#05AFF2] p-12">
        <div className="mb-8">
          <Image src="/auth-page-laptop.png" alt="Exam Illustration" width={350} height={350} />
        </div>
        <h1 className="text-3xl font-bold text-center mb-4 text-white">Manage Your Merjj Content</h1>
        <p className="text-center text-black max-w-md text-[20px]">
          Seamlessly create, organize, and publish content that will be displayed on the Merjj Platform. Empower your team to manage articles, media, and more—all in one place, ready for your Merjj audience.
        </p>
        {/* Carousel dots */}
        <div className="flex gap-2 mt-6">
          <span className="w-3 h-3 rounded-full bg-[#F2C438]" />
          <span className="w-3 h-3 rounded-full bg-[#fff]" />
          <span className="w-3 h-3 rounded-full bg-[#fff]" />
        </div>
      </div>
      {/* Right Side */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-gray-50 p-0">
        <div className="w-full max-w-md flex flex-col justify-center items-center min-h-screen">
          <div className="flex flex-col items-center mb-8 mt-16">
            <span className="text-3xl font-semibold text-[#0a3a4a] flex items-center gap-2">
              <span className="">Merjj</span>
              <span className="text-[#05AFF2]">CCP</span>
            </span>
          </div>
          {/* Auth Forms */}
          {!showRegister && (
            <>
              <form className="flex flex-col gap-4 w-full rounded-lg p-8">
                <label className="text-base font-medium text-gray-700">Username or email</label>
                <Input type="text" placeholder="johnsmith007" className="mb-2" />
                <label className="text-base font-medium text-gray-700">Password</label>
                <Input type="password" placeholder="**********" className="mb-2" />
                <div className="flex justify-end mb-4">
                  <Link href="#" className="text-[#05AFF2] text-base hover:underline">Forgot password?</Link>
                </div>
                <Button type="submit" className="w-full bg-[#05AFF2] hover:bg-[#0486b1] text-white">Sign in</Button>
              </form>
              <div className="flex items-center w-full my-6">
                <div className="flex-grow h-px bg-gray-200" />
                <span className="mx-4 text-gray-400">or</span>
                <div className="flex-grow h-px bg-gray-200" />
              </div>
              <Button variant="outline" className="w-full flex items-center justify-center gap-2 mb-4">
                <Image src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width={20} height={20} />
                Sign in with Google
              </Button>
              <div className="text-center mt-6 text-base w-full">
                Are you new?{' '}
                <button className="text-[#05AFF2] hover:underline" onClick={() => setShowRegister(true)}>Create an Account</button>
              </div>
            </>
          )}
          {/* Registration Form */}
          {showRegister && (
            <form className="flex flex-col gap-4 w-full rounded-lg p-8" onSubmit={handleRegister}>
              <label className="text-base font-medium text-gray-700">Email</label>
              <Input type="email" required placeholder="you@email.com" value={registerData.email} onChange={e => setRegisterData({ ...registerData, email: e.target.value })} />
              <label className="text-base font-medium text-gray-700">Password</label>
              <Input type="password" required placeholder="Password" value={registerData.password} onChange={e => setRegisterData({ ...registerData, password: e.target.value })} />
              <label className="text-base font-medium text-gray-700">Confirm Password</label>
              <Input type="password" required placeholder="Confirm Password" value={registerData.confirmPassword} onChange={e => setRegisterData({ ...registerData, confirmPassword: e.target.value })} />
              <Button type="submit" className="w-full bg-[#05AFF2] hover:bg-[#0486b1] text-white mt-2">Register</Button>
              <div className="text-center mt-4 text-base w-full">
                Already have an account?{' '}
                <button className="text-[#05AFF2] hover:underline" onClick={() => setShowRegister(false)}>Sign in</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
} 