"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-red-500 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-wide">
            <span className="text-2xl">🏨</span>
            <span>住宿優惠券</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="hover:text-red-100 transition-colors">
              住宿券
            </Link>
            <Link href="/my-orders" className="hover:text-red-100 transition-colors">
              我的訂單
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-red-600 transition-colors"
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
          <div className="md:hidden border-t border-red-400 py-3 flex flex-col gap-3 text-sm font-medium">
            <Link href="/" className="hover:text-red-100" onClick={() => setMenuOpen(false)}>
              住宿券
            </Link>
            <Link href="/my-orders" className="hover:text-red-100" onClick={() => setMenuOpen(false)}>
              我的訂單
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
