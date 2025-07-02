"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaBuilding, FaUserTie, FaClipboardCheck } from "react-icons/fa";
import { submitOnboarding } from "@/actions/profile-actions";
import { useAuth } from "@/lib/auth-context";

const steps = [
  {
    icon: FaBuilding,
    title: "Organization Info",
    desc: "Enter your organization details."
  },
  {
    icon: FaUserTie,
    title: "Personal Info",
    desc: "Enter your personal and job details."
  },
  {
    icon: FaClipboardCheck,
    title: "Review",
    desc: "Review and confirm your information."
  },
];

export default function OnboardingPage() {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    organization_id: 1,
    company: "",
    address: "",
    title: "",
    preferred_language: "",
    terms: false,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateStep = () => {
    const newErrors: { [key: string]: string } = {};
    if (step === 1) {
      if (!form.organization_id) newErrors.organization_id = "Organization ID is required";
      if (!form.company) newErrors.company = "Company is required";
      if (!form.address) newErrors.address = "Address is required";
    } else if (step === 2) {
      if (!form.title) newErrors.title = "Title is required";
      if (!form.preferred_language) newErrors.preferred_language = "Preferred language is required";
      if (!form.terms) newErrors.terms = "You must accept the terms";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep()) {
      if (step < steps.length) setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep()) {
      try {
        const result = await submitOnboarding(form);
        if (result) {
          // Update the user's profile status in localStorage
          if (user) {
            const updatedUser = { ...user, profile: true };
            localStorage.setItem("user", JSON.stringify(updatedUser));
          }
          // Redirect to home page after successful onboarding
          window.location.href = '/';
        }
      } catch (error) {
        console.error('Onboarding submission failed:', error);
      }
    }
  };

  // Card height for both columns
  const cardHeight = "min-h-[600px]";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className={`flex rounded-2xl shadow-xl bg-white ${cardHeight} w-full max-w-5xl border border-gray-200`}>
        {/* Sidebar */}
        <aside className={`w-[340px] flex flex-col p-8 border-r border-gray-200 ${cardHeight} justify-center bg-white rounded-l-2xl`}> 
          <h2 className="text-lg font-semibold mb-8 text-gray-900">Get started by setting up your workspace and company email.</h2>
          <ol className="flex flex-col gap-8">
            {steps.map((s, i) => {
              let iconColor = "text-gray-300 bg-gray-100";
              let border = "";
              if (i + 1 < step) {
                iconColor = "text-white bg-[#05AFF2]"; // completed
                border = "border-2 border-[#05AFF2]";
              } else if (i + 1 === step) {
                iconColor = "text-[#05AFF2] bg-blue-50"; // current
                border = "border-2 border-[#05AFF2]";
              }
              return (
                <li key={s.title} className="flex items-start gap-4">
                  <div className={`rounded-full w-12 h-12 flex items-center justify-center ${iconColor} ${border} transition-all duration-200`}>
                    {i + 1 < step ? <FaClipboardCheck className="text-2xl" /> : <s.icon className="text-2xl" />}
                  </div>
                  <div>
                    <div className={`font-semibold text-base mb-1 ${i + 1 === step ? "text-[#05AFF2]" : "text-gray-900"}`}>{s.title}</div>
                    <div className="text-gray-500 text-sm leading-snug">{s.desc}</div>
                  </div>
                </li>
              );
            })}
          </ol>
        </aside>
        {/* Main Content */}
        <main className={`flex-1 flex flex-col justify-center items-center p-12 ${cardHeight} bg-white rounded-r-2xl`}>
          <div className="w-full max-w-xl flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <span className="text-[#05AFF2] font-semibold text-sm tracking-widest">STEP {step} OF {steps.length}</span>
              <h1 className="text-2xl font-semibold text-gray-900">{steps[step - 1].title}</h1>
              <p className="text-gray-500 text-base max-w-lg">{steps[step - 1].desc}</p>
            </div>
            <form className="flex flex-col gap-6" onSubmit={step < 3 ? handleNext : handleFinalSubmit}>
              {step === 1 && (
                <>
                  <div>
                    <label className="block text-base font-medium text-gray-700 mb-2">Organization ID</label>
                    <Input type="number" required placeholder="e.g 1" value={form.organization_id} onChange={e => setForm({ ...form, organization_id: Number(e.target.value) })} />
                    {errors.organization_id && <p className="text-xs text-red-500 mt-1">{errors.organization_id}</p>}
                  </div>
                  <div>
                    <label className="block text-base font-medium text-gray-700 mb-2">Company</label>
                    <Input type="text" required placeholder="e.g Example Corp" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} />
                    {errors.company && <p className="text-xs text-red-500 mt-1">{errors.company}</p>}
                  </div>
                  <div>
                    <label className="block text-base font-medium text-gray-700 mb-2">Address</label>
                    <Input type="text" required placeholder="e.g 123 Main St, City, State" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
                    {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
                  </div>
                </>
              )}
              {step === 2 && (
                <>
                  <div>
                    <label className="block text-base font-medium text-gray-700 mb-2">Title</label>
                    <Input type="text" required placeholder="e.g Software Engineer" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
                    {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
                  </div>
                  <div>
                    <label className="block text-base font-medium text-gray-700 mb-2">Preferred Language</label>
                    <Input type="text" required placeholder="e.g en" value={form.preferred_language} onChange={e => setForm({ ...form, preferred_language: e.target.value })} />
                    {errors.preferred_language && <p className="text-xs text-red-500 mt-1">{errors.preferred_language}</p>}
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="terms" required checked={form.terms} onChange={e => setForm({ ...form, terms: e.target.checked })} />
                    <label htmlFor="terms" className="text-base font-medium text-gray-700">I accept the Terms of Use and Privacy Policy</label>
                  </div>
                  {errors.terms && <p className="text-xs text-red-500 mt-1">{errors.terms}</p>}
                </>
              )}
              {step === 3 && (
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                  <h2 className="text-lg font-semibold mb-4 text-gray-900">Review your information</h2>
                  <ul className="text-base text-gray-700 space-y-2">
                    <li><span className="font-medium">Organization ID:</span> {form.organization_id}</li>
                    <li><span className="font-medium">Company:</span> {form.company}</li>
                    <li><span className="font-medium">Address:</span> {form.address}</li>
                    <li><span className="font-medium">Title:</span> {form.title}</li>
                    <li><span className="font-medium">Preferred Language:</span> {form.preferred_language}</li>
                    <li><span className="font-medium">Accepted Terms:</span> {form.terms ? "Yes" : "No"}</li>
                  </ul>
                </div>
              )}
              <div className="flex justify-between gap-4 mt-4">
                {step > 1 && <Button type="button" variant="outline" className="rounded-full px-8 py-2 text-base font-semibold border border-gray-200" onClick={handleBack}>Back</Button>}
                {step < 3 ? (
                  <Button type="submit" className="rounded-full px-8 py-2 bg-[#05AFF2] hover:bg-[#0486b1] text-white text-base font-semibold">Next</Button>
                ) : (
                  <Button type="submit" className="rounded-full px-8 py-2 bg-[#05AFF2] hover:bg-[#0486b1] text-white text-base font-semibold">Submit</Button>
                )}
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
} 