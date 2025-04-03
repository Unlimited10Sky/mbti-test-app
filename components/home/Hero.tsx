'use client';

import Link from 'next/link';
import { useLanguage } from '../../app/contexts/LanguageContext';

export default function Hero() {
  const { t, language, setLanguage } = useLanguage();
  
  const userCount = '100,000+';
  
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-heading">
            {t('hero.title')}<br/>
            <span className="hero-heading-accent">{t('hero.titleAccent')}</span>
          </h1>
          <p className="hero-description">
            {t('hero.description')}
          </p>
          <div className="hero-actions">
            <Link 
              href="#test" 
              className="btn-primary hero-btn"
              onClick={(e) => {
                e.preventDefault();
                const testSection = document.getElementById('test');
                if (testSection) {
                  const offsetTop = testSection.offsetTop - 80;
                  window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                  });
                }
              }}
            >
              {t('hero.startTest')}
            </Link>
            <Link 
              href="#features" 
              className="btn-secondary hero-btn"
              onClick={(e) => {
                e.preventDefault();
                const featuresSection = document.getElementById('features');
                if (featuresSection) {
                  const offsetTop = featuresSection.offsetTop - 80;
                  window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                  });
                }
              }}
            >
              {t('hero.learnMore')}
            </Link>
          </div>
          
          <div className="hero-users-count">
            {t('hero.userCount')} <span className="users-highlight">{userCount}</span> {t('hero.userCountSuffix')}
          </div>
          
          <div className="language-selector">
            <button 
              className={`language-option ${language === 'zh' ? 'active' : ''}`}
              onClick={() => setLanguage('zh')}
            >
              {t('language.chinese')}
            </button>
            <button 
              className={`language-option ${language === 'en' ? 'active' : ''}`}
              onClick={() => setLanguage('en')}
            >
              {t('language.english')}
            </button>
            <button className="language-option disabled">
              {t('language.japanese')}
            </button>
            <button className="language-option disabled">
              {t('language.spanish')}
            </button>
            <button className="language-option disabled">
              {t('language.french')}
            </button>
            <button className="language-option disabled">
              {t('language.german')}
            </button>
            <button className="language-option disabled">
              {t('language.korean')}
            </button>
            <button className="language-option disabled">
              {t('language.russian')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 