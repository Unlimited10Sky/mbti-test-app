'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../../app/contexts/LanguageContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, language, setLanguage } = useLanguage();

  return (
    <header className="site-header">
      <div className="header-container">
        <div className="header-left">
          <Link href="/" className="site-logo">MBTI测试</Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="main-nav">
          <ul className="nav-list">
            <li><Link href="/" className="nav-item">{t('header.home')}</Link></li>
            <li><Link href="#features" className="nav-item">{t('header.features')}</Link></li>
            <li>
              <div className="language-select-wrapper">
                <select 
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as 'zh' | 'en')}
                  className="language-select"
                >
                  <option value="zh">简体中文</option>
                  <option value="en">English</option>
                  <option value="jp" disabled>日本語</option>
                  <option value="es" disabled>Español</option>
                  <option value="fr" disabled>Français</option>
                  <option value="de" disabled>Deutsch</option>
                  <option value="ko" disabled>한국어</option>
                  <option value="ru" disabled>Русский</option>
                </select>
              </div>
            </li>
            <li><Link href="#test" className="nav-item">{t('header.startTest')}</Link></li>
            <li><Link href="#pricing" className="nav-item">{t('header.pricing')}</Link></li>
            <li><Link href="#faq" className="nav-item">{t('header.faq')}</Link></li>
          </ul>
        </nav>
        
        <div className="header-actions">
          <Link href="#test" className="cta-button">{t('header.ctaButton')}</Link>
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
              {t('header.home')}
            </Link>
            <Link 
              href="#features" 
              className="mobile-nav-item"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('header.features')}
            </Link>
            <div className="mobile-nav-item">
              <div className="language-dropdown-mobile">
                <span className="language-label">{t('header.language')}: </span>
                <select 
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as 'zh' | 'en')}
                  className="language-select-mobile"
                >
                  <option value="zh">简体中文</option>
                  <option value="en">English</option>
                </select>
              </div>
            </div>
            <Link 
              href="#test" 
              className="mobile-nav-item"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('header.startTest')}
            </Link>
            <Link 
              href="#pricing" 
              className="mobile-nav-item"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('header.pricing')}
            </Link>
            <Link 
              href="#faq" 
              className="mobile-nav-item"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('header.faq')}
            </Link>
            <div className="mobile-cta">
              <Link 
                href="#test" 
                className="cta-button mobile-cta-button"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('header.ctaButton')}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
} 