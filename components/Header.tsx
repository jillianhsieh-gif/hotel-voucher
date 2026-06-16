"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  function handleLogout() {
    logout();
    setMenuOpen(false);
    router.push("/");
  }

  return (
    <header className="bg-purple-600 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-wide">
            <span className="text-2xl">🏨</span>
            <span>住宿優惠券</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-5 text-sm font-medium">
            <Link href="/" className="hover:text-purple-100 transition-colors">
              住宿券
            </Link>
            {user ? (
              <>
                <Link href="/my-orders" className="hover:text-purple-100 transition-colors">
                  我的訂單
                </Link>
                {/* User info + logout */}
                <div className="flex items-center gap-2 bg-purple-700/60 rounded-full pl-3 pr-1 py-1">
                  <span className="text-sm text-purple-100 max-w-[120px] truncate">
                    👤 {user.name}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-xs bg-white/20 hover:bg-white/30 text-white px-2 py-1 rounded-full transition-colors"
                  >
                    登出
                  </button>
                </div>
              </>
            ) : (
              <Link
                href="/login"
                className="bg-white text-purple-600 hover:bg-purple-50 font-bold px-4 py-1.5 rounded-full transition-colors text-sm"
              >
                登入
              </Link>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-purple-700 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="選單"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-purple-400 py-3 flex flex-col gap-3 text-sm font-medium">
            <Link href="/" className="hover:text-purple-100" onClick={() => setMenuOpen(false)}>
              住宿券
            </Link>
            {user ? (
              <>
                <Link href="/my-orders" className="hover:text-purple-100" onClick={() => setMenuOpen(false)}>
                  我的訂單
                </Link>
                <div className="flex items-center justify-between border-t border-purple-400 pt-3">
                  <span className="text-purple-100 text-xs">👤 {user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="text-xs bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-full transition-colors"
                  >
                    登出
                  </button>
                </div>
              </>
            ) : (
              <Link
                href="/login"
                className="text-white font-bold hover:text-purple-100"
                onClick={() => setMenuOpen(false)}
              >
                登入
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
