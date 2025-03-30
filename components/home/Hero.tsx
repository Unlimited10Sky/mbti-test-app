'use client';

import Link from 'next/link';

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text-column">
            <h1 className="hero-heading">
              发现真实的自我，<br />
              <span className="hero-heading-accent">释放无限潜能</span>
            </h1>
            <p className="hero-description">
              通过专业的MBTI性格测试，深入了解你的性格特质，找到适合你的职业方向和人际关系模式。
            </p>
            <div className="hero-actions">
              <Link 
                href="#test" 
                className="btn-primary transition-transform hover:scale-105 active:scale-95"
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
                className="btn-secondary transition-transform hover:scale-105 active:scale-95"
              >
                了解更多
              </Link>
            </div>
            <div className="hero-users-count">
              <p>已有超过 <span className="users-highlight">250,000+</span> 用户通过我们的测试找到自我</p>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-decoration-element"></div>
            <div className="hero-image-wrapper">
              <div className="hero-icon-element">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                </svg>
              </div>
              <div className="hero-gradient-overlay"></div>
            </div>
          </div>
        </div>
        
        <div className="hero-stats-grid">
          <div className="hero-stat-card">
            <h3 className="stat-value">16</h3>
            <p className="stat-label">详细性格类型</p>
          </div>
          <div className="hero-stat-card">
            <h3 className="stat-value">98%</h3>
            <p className="stat-label">测试准确率</p>
          </div>
          <div className="hero-stat-card">
            <h3 className="stat-value">5分钟</h3>
            <p className="stat-label">快速完成测试</p>
          </div>
          <div className="hero-stat-card">
            <h3 className="stat-value">免费</h3>
            <p className="stat-label">基础测试</p>
          </div>
        </div>
      </div>
    </section>
  );
} 