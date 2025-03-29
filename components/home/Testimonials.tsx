'use client';

import { useState } from 'react';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const testimonials = [
    {
      id: 1,
      quote: "通过这个测试，我终于理解了为什么我总是以特定方式思考和行动。结果非常准确，帮助我在职业发展方面做出了更明智的决定。",
      author: "王丽",
      role: "市场营销经理",
      type: "ENFJ"
    },
    {
      id: 2,
      quote: "测试结果让我大吃一惊，原来我的很多行为模式都可以通过MBTI理论来解释。专业版的深度分析更是让我对自己有了全新的认识。",
      author: "李明",
      role: "软件工程师",
      type: "INTJ"
    },
    {
      id: 3,
      quote: "这个测试帮助我找到了适合我性格的职业方向。分析报告中的建议让我在工作中更好地发挥了自己的优势，也更懂得如何与他人合作。",
      author: "张晓燕",
      role: "人力资源主管",
      type: "ESFJ"
    },
    {
      id: 4,
      quote: "作为一个一直在寻找自我的人，这个测试给了我很大启发。它不仅准确描述了我的性格特点，还提供了实用的个人成长建议。",
      author: "陈伟",
      role: "自由职业者",
      type: "INFP"
    }
  ];
  
  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };
  
  return (
    <section className="section bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="heading">用户评价</h2>
          <p className="subheading mx-auto">
            看看其他用户如何通过我们的MBTI测试获得启发
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-[#f5f5f7] rounded-2xl p-8 md:p-12">
            {/* Quote decoration */}
            <div className="absolute top-6 left-8 text-[#0071e3]/10">
              <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>
            
            <div className="relative">
              <p className="text-lg md:text-xl text-[#1d1d1f] mb-8 italic">
                "{testimonials[activeIndex].quote}"
              </p>
              
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[#0071e3]/20 rounded-full flex items-center justify-center">
                  <span className="font-bold text-[#0071e3]">{testimonials[activeIndex].type}</span>
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-[#1d1d1f]">{testimonials[activeIndex].author}</h4>
                  <p className="text-sm text-[#86868b]">{testimonials[activeIndex].role}</p>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-8 right-8 flex space-x-2">
              <button 
                onClick={prevTestimonial}
                className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 text-[#86868b] hover:text-[#0071e3] hover:border-[#0071e3] transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={nextTestimonial}
                className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 text-[#86868b] hover:text-[#0071e3] hover:border-[#0071e3] transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="mt-8 flex justify-center">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-2.5 h-2.5 rounded-full mx-1 ${
                  index === activeIndex ? 'bg-[#0071e3]' : 'bg-gray-300'
                }`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>
        
        <div className="mt-24 bg-[#f5f5f7] rounded-2xl p-8 md:p-12">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-[#1d1d1f] mb-4">
              加入超过250,000名用户的行列
            </h3>
            <p className="text-[#86868b] max-w-2xl mx-auto mb-8">
              获取专业的MBTI性格分析，发现你的优势，找到你的成长路径。
            </p>
            <a 
              href="#test" 
              className="btn-primary inline-block"
            >
              立即测试
            </a>
          </div>
        </div>
      </div>
    </section>
  );
} 