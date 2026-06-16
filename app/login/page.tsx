import { Suspense } from "react";
import LoginForm from "@/components/LoginForm";

export const metadata = { title: "登入 | 住宿優惠券" };

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm space-y-6">
        {/* Logo */}
        <div className="text-center space-y-1">
          <div className="text-4xl">🏨</div>
          <h1 className="text-2xl font-bold text-gray-800">會員登入</h1>
          <p className="text-sm text-gray-400">登入後即可訂購住宿券</p>
        </div>

        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>

        {/* Disclaimer */}
        <p className="text-center text-xs text-gray-400 leading-relaxed px-2">
          本頁面為示意流程，實際將直接串接 journey.owlting.com 會員 API，
          使用者無需跳轉至其他網站即可完成登入。
        </p>
      </div>
    </div>
  );
}
