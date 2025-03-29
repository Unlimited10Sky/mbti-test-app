'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header">
      <nav className="container flex items-center justify-between">
        <div>
          <Link href="/" className="logo">MBTI测试</Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden-mobile">
          <div className="nav-links">
            <Link href="/" className="nav-link">首页</Link>
            <Link href="#features" className="nav-link">功能特点</Link>
            <Link href="#test" className="nav-link">开始测试</Link>
            <Link href="#pricing" className="nav-link">价格方案</Link>
            <Link href="#faq" className="nav-link">常见问题</Link>
          </div>
        </div>
        
        <div className="hidden-mobile">
          <Link href="#test" className="btn-primary">立即测试</Link>
        </div>
        
        {/* Mobile menu button */}
        <div className="mobile-only">
          <button
            type="button"
            className="menu-button"
            aria-controls="mobile-menu"
            aria-expanded="false"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">打开主菜单</span>
            {isMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="mobile-menu" id="mobile-menu">
          <div className="mobile-menu-items">
            <Link 
              href="/" 
              className="mobile-menu-link"
              onClick={() => setIsMenuOpen(false)}
            >
              首页
            </Link>
            <Link 
              href="#features" 
              className="mobile-menu-link"
              onClick={() => setIsMenuOpen(false)}
            >
              功能特点
            </Link>
            <Link 
              href="#test" 
              className="mobile-menu-link"
              onClick={() => setIsMenuOpen(false)}
            >
              开始测试
            </Link>
            <Link 
              href="#pricing" 
              className="mobile-menu-link"
              onClick={() => setIsMenuOpen(false)}
            >
              价格方案
            </Link>
            <Link 
              href="#faq" 
              className="mobile-menu-link"
              onClick={() => setIsMenuOpen(false)}
            >
              常见问题
            </Link>
            <div className="mobile-cta">
              <Link 
                href="#test" 
                className="btn-primary w-full block"
                onClick={() => setIsMenuOpen(false)}
              >
                立即测试
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
} 