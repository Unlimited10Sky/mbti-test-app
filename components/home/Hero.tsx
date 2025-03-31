'use client';

import Link from 'next/link';

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-heading">
            AI驱动的MBTI性格分析，<br/><span className="hero-heading-accent">精准识别你的性格特质与潜能</span>
          </h1>
          <p className="hero-description">
            基于精确算法，帮助你找到最合适的职业发展路径和人际关系模式
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
              开始测试
            </Link>
            <Link 
              href="#features" 
              className="btn-secondary hero-btn"
            >
              了解更多
            </Link>
          </div>
          <div className="hero-users-count">
            <p>已有超过 <span className="users-highlight">250,000+</span> 用户通过我们的测试找到自我</p>
          </div>
        </div>
        
        {/* 语言选择器 */}
        <div className="language-selector">
          <button className="language-option active">中文</button>
          <button className="language-option">英文 (English)</button>
          <button className="language-option">日文 (日本語)</button>
          <button className="language-option">西班牙文 (Español)</button>
          <button className="language-option">法文 (Français)</button>
          <button className="language-option">德文 (Deutsch)</button>
          <button className="language-option">韩文 (한국어)</button>
          <button className="language-option">俄文 (Русский)</button>
        </div>
      </div>
    </section>
  );
} 