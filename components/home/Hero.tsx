'use client';

import Link from 'next/link';
import { useLanguage } from '../../app/contexts/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();
  
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
          </div>
        </div>
      </div>
    </section>
  );
} 