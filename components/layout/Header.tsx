'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-container">
        <Link href="/" className="site-logo">MBTI测试</Link>
        
        {/* Desktop Navigation */}
        <nav className="main-nav">
          <ul className="nav-list">
            <li><Link href="/" className="nav-item">首页</Link></li>
            <li><Link href="#features" className="nav-item">功能特点</Link></li>
            <li><Link href="#test" className="nav-item">开始测试</Link></li>
            <li><Link href="#pricing" className="nav-item">价格方案</Link></li>
            <li><Link href="#faq" className="nav-item">常见问题</Link></li>
          </ul>
        </nav>
        
        <div className="header-actions">
          <Link href="#test" className="cta-button">立即测试</Link>
        </div>
        
        {/* Mobile menu button */}
        <button
          type="button"
          className="mobile-menu-toggle"
          aria-controls="mobile-menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="sr-only">打开主菜单</span>
          {isMenuOpen ? (
            <svg className="menu-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="menu-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="mobile-menu" id="mobile-menu">
          <nav className="mobile-nav">
            <Link 
              href="/" 
              className="mobile-nav-item"
              onClick={() => setIsMenuOpen(false)}
            >
              首页
            </Link>
            <Link 
              href="#features" 
              className="mobile-nav-item"
              onClick={() => setIsMenuOpen(false)}
            >
              功能特点
            </Link>
            <Link 
              href="#test" 
              className="mobile-nav-item"
              onClick={() => setIsMenuOpen(false)}
            >
              开始测试
            </Link>
            <Link 
              href="#pricing" 
              className="mobile-nav-item"
              onClick={() => setIsMenuOpen(false)}
            >
              价格方案
            </Link>
            <Link 
              href="#faq" 
              className="mobile-nav-item"
              onClick={() => setIsMenuOpen(false)}
            >
              常见问题
            </Link>
            <div className="mobile-cta">
              <Link 
                href="#test" 
                className="cta-button mobile-cta-button"
                onClick={() => setIsMenuOpen(false)}
              >
                立即测试
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
} 