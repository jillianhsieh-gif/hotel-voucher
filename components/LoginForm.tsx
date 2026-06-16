"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";

export default function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [loading, setLoading] = useState(false);

  function validate() {
    const e: typeof errors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "請填寫正確的 Email";
    if (password.length < 1) e.password = "請填寫密碼";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setLoading(true);
    setErrors({});

    try {
      await login(email, password);
      router.replace(redirect);
    } catch {
      setErrors({ general: "登入失敗，請稍後再試" });
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {/* General error */}
      {errors.general && (
        <div className="bg-purple-50 border border-purple-200 text-purple-700 text-sm px-4 py-3 rounded-lg">
          {errors.general}
        </div>
      )}

      {/* Email */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setErrors((prev) => ({ ...prev, email: "" })); }}
          placeholder="your@email.com"
          autoComplete="email"
          className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-colors ${
            errors.email ? "border-purple-400 focus:ring-purple-300" : "border-gray-300 focus:ring-purple-400"
          }`}
        />
        {errors.email && <p className="text-purple-600 text-xs">{errors.email}</p>}
      </div>

      {/* Password */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">
          密碼
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => { setPassword(e.target.value); setErrors((prev) => ({ ...prev, password: "" })); }}
            placeholder="請輸入密碼"
            autoComplete="current-password"
            className={`w-full border rounded-lg px-4 py-3 pr-11 text-sm focus:outline-none focus:ring-2 transition-colors ${
              errors.password ? "border-purple-400 focus:ring-purple-300" : "border-gray-300 focus:ring-purple-400"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label={showPassword ? "隱藏密碼" : "顯示密碼"}
          >
            {showPassword ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4-9-7s4-7 9-7a9.98 9.98 0 015.34 1.535M15 12a3 3 0 11-6 0 3 3 0 016 0zm6.364-5.364l-14.728 14.728" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        </div>
        {errors.password && <p className="text-purple-600 text-xs">{errors.password}</p>}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            登入中...
          </>
        ) : "登入"}
      </button>

      {/* Mock hint */}
      <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-3 text-xs text-blue-500 text-center">
        示意模式：輸入任何 Email ＋ 密碼即可登入
      </div>
    </form>
  );
}
