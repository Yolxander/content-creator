import { useEffect, useRef, useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const ICONS: Record<string, JSX.Element> = {
  success: (
    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/><path strokeLinecap="round" strokeLinejoin="round" d="M8 12l2 2l4-4" /></svg>
  ),
  error: (
    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 9l-6 6m0-6l6 6" /></svg>
  ),
  info: (
    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/><path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4m0-4h.01" /></svg>
  ),
  warning: (
    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01" /></svg>
  ),
};

interface AlertWithProgressProps {
  type: "success" | "error" | "info" | "warning";
  message: string;
  duration?: number; // ms
  onClose: () => void;
}

export default function AlertWithProgress({ type, message, duration = 4000, onClose }: AlertWithProgressProps) {
  const [progress, setProgress] = useState(100);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const start = Date.now();
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      const percent = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(percent);
      if (percent === 0) {
        onClose();
      }
    }, 30);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [duration, onClose]);

  return (
    <Alert
      className={`mb-4 w-full max-w-md flex items-start gap-3 relative
        ${type === "success" ? "border-green-200 bg-green-50" : ""}
        ${type === "error" ? "border-red-200 bg-red-50" : ""}
        ${type === "info" ? "border-blue-200 bg-blue-50" : ""}
        ${type === "warning" ? "border-yellow-200 bg-yellow-50" : ""}
      `}
    >
      <div className="pt-1">{ICONS[type]}</div>
      <AlertDescription
        className={
          type === "success"
            ? "text-green-600"
            : type === "error"
            ? "text-red-600"
            : type === "info"
            ? "text-blue-600"
            : "text-yellow-600"
        }
      >
        {message}
      </AlertDescription>
      <div className="absolute left-0 bottom-0 w-full h-1 bg-gray-200 rounded-b overflow-hidden">
        <div
          className={
            type === "success"
              ? "bg-green-500"
              : type === "error"
              ? "bg-red-500"
              : type === "info"
              ? "bg-blue-500"
              : "bg-yellow-500"
          }
          style={{ width: `${progress}%`, height: "100%", transition: "width 0.03s linear" }}
        />
      </div>
    </Alert>
  );
} 