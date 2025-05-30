"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    orgCode: "",
    role: "",
    acceptTerms: false,
    language: "",
    notifications: false,
    profileImage: null as File | null,
  });

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) setStep(step + 1);
    else window.location.href = "/";
  };
  const handleBack = () => setStep(step - 1);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6 flex flex-col gap-2">
        <span className="text-xl font-semibold text-gray-900">Onboarding</span>
      </div>
      {/* Stepper */}
      <div className="flex items-center justify-center gap-8 mt-10 mb-12">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-0">
            <div className={`rounded-full w-8 h-8 flex items-center justify-center border-2 text-base font-semibold ${step === s ? 'border-[#05AFF2] text-[#05AFF2] bg-white' : 'border-gray-300 text-gray-400 bg-gray-100'}`}>{s}</div>
            {s < 3 && <div className="w-12 h-0.5 bg-gray-200 mx-3" />}
          </div>
        ))}
      </div>
      {/* Centered Form Card */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <form className="flex flex-col gap-6 w-full max-w-lg bg-white rounded-xl shadow-lg p-10 border border-gray-100" onSubmit={handleNext}>
          {step === 1 && (
            <>
              <div className="mb-2">
                <div className="text-lg font-semibold text-gray-900 mb-1">Account Info</div>
                <div className="text-gray-500 text-base">Let's start with the basics</div>
              </div>
              <Input type="text" required placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              <Input type="email" required placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              <Input type="password" required placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
            </>
          )}
          {step === 2 && (
            <>
              <div className="mb-2">
                <div className="text-lg font-semibold text-gray-900 mb-1">Organization</div>
                <div className="text-gray-500 text-base">Link to your org or set your role</div>
              </div>
              <Input type="text" placeholder="Organization Code" value={form.orgCode} onChange={e => setForm({ ...form, orgCode: e.target.value })} />
              <Input type="text" placeholder="Role" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} />
              <div className="flex items-center gap-2">
                <input type="checkbox" id="acceptTerms" required checked={form.acceptTerms} onChange={e => setForm({ ...form, acceptTerms: e.target.checked })} />
                <label htmlFor="acceptTerms" className="text-base font-medium text-gray-700">I accept the Terms of Use and Privacy Policy</label>
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <div className="mb-2">
                <div className="text-lg font-semibold text-gray-900 mb-1">Preferences</div>
                <div className="text-gray-500 text-base">Set your preferences</div>
              </div>
              <Input type="text" placeholder="Preferred Language" value={form.language} onChange={e => setForm({ ...form, language: e.target.value })} />
              <div className="flex items-center gap-2">
                <input type="checkbox" id="notifications" checked={form.notifications} onChange={e => setForm({ ...form, notifications: e.target.checked })} />
                <label htmlFor="notifications" className="text-base font-medium text-gray-700">Enable notifications</label>
              </div>
              <Input type="file" accept="image/*" onChange={e => {
                const file = e.target.files && e.target.files[0] ? e.target.files[0] : null;
                setForm({ ...form, profileImage: file });
              }} />
            </>
          )}
          <div className="flex justify-between gap-4 mt-4">
            {step > 1 && <Button type="button" variant="outline" className="rounded-full px-8 py-2 text-base font-semibold" onClick={handleBack}>Back</Button>}
            <Button type="submit" className="rounded-full px-8 py-2 bg-black hover:bg-gray-900 text-white text-base font-semibold">{step === 3 ? "Finish" : "Next"}</Button>
          </div>
        </form>
      </div>
    </div>
  );
} 