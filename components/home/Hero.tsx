import Link from 'next/link';

export default function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              发现真实的自我，<br />
              <span className="hero-title-accent">释放无限潜能</span>
            </h1>
            <p className="hero-description">
              通过专业的MBTI性格测试，深入了解你的性格特质，找到适合你的职业方向和人际关系模式。
            </p>
            <div className="hero-buttons">
              <Link href="#test" className="btn-primary">
                开始测试
              </Link>
              <Link 
                href="#features" 
                className="btn-secondary"
              >
                了解更多
              </Link>
            </div>
            <div className="hero-stats">
              <p>已有超过 <span className="hero-stats-highlight">250,000+</span> 用户通过我们的测试找到自我</p>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-image-decoration"></div>
            <div className="hero-image-container">
              <div className="hero-image-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                </svg>
              </div>
              <div className="hero-image-gradient"></div>
            </div>
          </div>
        </div>
        
        <div className="hero-metrics">
          <div className="hero-metric">
            <h3 className="hero-metric-value">16</h3>
            <p className="hero-metric-label">详细性格类型</p>
          </div>
          <div className="hero-metric">
            <h3 className="hero-metric-value">98%</h3>
            <p className="hero-metric-label">测试准确率</p>
          </div>
          <div className="hero-metric">
            <h3 className="hero-metric-value">5分钟</h3>
            <p className="hero-metric-label">快速完成测试</p>
          </div>
          <div className="hero-metric">
            <h3 className="hero-metric-value">免费</h3>
            <p className="hero-metric-label">基础测试</p>
          </div>
        </div>
      </div>
    </section>
  );
} 