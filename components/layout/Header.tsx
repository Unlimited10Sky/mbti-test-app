'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../../app/contexts/LanguageContext';
import LanguageSelector from '../common/LanguageSelector';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <header className="site-header">
      <div className="header-container">
        <Link href="/" className="site-logo">MBTI测试</Link>
        
        {/* Desktop Navigation */}
        <nav className="main-nav">
          <ul className="nav-list">
            {/* 暂时隐藏的菜单项
            <li><Link href="/" className="nav-item">{t('header.home')}</Link></li>
            <li><Link href="#features" className="nav-item">{t('header.features')}</Link></li>
            */}
            <li><LanguageSelector variant="select" /></li>
            {/* <li><Link href="#test" className="nav-item">{t('header.startTest')}</Link></li> */}
            {/* 暂时隐藏的菜单项
            <li><Link href="#pricing" className="nav-item">{t('header.pricing')}</Link></li>
            <li><Link href="#faq" className="nav-item">{t('header.faq')}</Link></li>
            */}
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
            {/* 暂时隐藏的菜单项
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
            */}
            <div className="mobile-nav-item">
              <LanguageSelector variant="select" />
            </div>
            <Link 
              href="#test" 
              className="mobile-nav-item"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('header.startTest')}
            </Link>
            {/* 暂时隐藏的菜单项
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
            */}
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