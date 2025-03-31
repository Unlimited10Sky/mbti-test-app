import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* <div className="footer-col">
            <h3 className="footer-title">MBTI测试</h3>
            <p className="footer-text">提供专业的MBTI性格测试，帮助你深入了解自己的性格特质，发掘自身潜能。</p>
          </div> */}
          
          {/* <div className="footer-col">
            <h3 className="footer-heading">导航</h3>
            <ul className="footer-links">
              <li><Link href="/" className="footer-link">首页</Link></li>
              <li><Link href="#features" className="footer-link">功能特点</Link></li>
              <li><Link href="#test" className="footer-link">开始测试</Link></li>
              <li><Link href="#pricing" className="footer-link">价格方案</Link></li>
            </ul>
          </div> */}
          
          {/* <div className="footer-col">
            <h3 className="footer-heading">资源</h3>
            <ul className="footer-links">
              <li><Link href="#faq" className="footer-link">常见问题</Link></li>
              <li><Link href="#" className="footer-link">博客</Link></li>
              <li><Link href="#" className="footer-link">性格类型</Link></li>
              <li><Link href="#" className="footer-link">隐私政策</Link></li>
            </ul>
          </div> */}
          
          {/* <div className="footer-col">
            <h3 className="footer-heading">联系我们</h3>
            <p className="footer-text footer-contact">有任何问题或建议？请联系我们</p>
            <p className="footer-text">邮箱: wwang6419g@gmail.com</p>
          </div> */}
        </div>
        
        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; {currentYear} MBTI测试. 版权所有 | 水鸟
          </p>
        </div>
      </div>
    </footer>
  );
} 