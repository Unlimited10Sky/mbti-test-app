'use client';

import { useLanguage } from '../../app/contexts/LanguageContext';

interface LanguageSelectorProps {
  variant?: 'dropdown' | 'select';
  position?: 'left' | 'right';
  className?: string;
}

export default function LanguageSelector({ 
  variant = 'select', 
  position = 'left',
  className = ''
}: LanguageSelectorProps) {
  const { language, setLanguage, t } = useLanguage();
  
  // 下拉菜单版本
  if (variant === 'dropdown') {
    return (
      <div className={`language-dropdown ${position === 'right' ? 'ml-auto' : ''} ${className}`}>
        <button className="language-current">
          {language === 'zh' ? '简体中文' : 'English'} <span>▼</span>
        </button>
        <div className="language-options-dropdown">
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
    );
  }
  
  // 选择框版本
  return (
    <div className={`language-select-wrapper ${position === 'right' ? 'ml-auto' : ''} ${className}`}>
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
  );
} 