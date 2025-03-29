'use client';

import { useState } from 'react';

export default function FAQ() {
  const [openItem, setOpenItem] = useState<number | null>(0);
  
  const faqs = [
    {
      id: 1,
      question: "什么是MBTI测试？",
      answer: "MBTI（迈尔斯-布里格斯类型指标）测试是一种心理学评估工具，基于卡尔·荣格的理论，将人格分为16种不同类型。测试通过评估四个维度的偏好：外向(E)vs内向(I)、感觉(S)vs直觉(N)、思考(T)vs情感(F)、判断(J)vs感知(P)，来确定一个人的性格类型。"
    },
    {
      id: 2,
      question: "MBTI测试结果的准确性如何？",
      answer: "MBTI测试被广泛认为是较为可靠的性格评估工具之一。测试的准确性取决于多种因素，包括测试者的自我认知能力和回答问题的真实程度。我们的测试基于大量数据分析和心理学研究，提供高达98%的准确率。然而，性格是复杂的，测试结果应被视为了解自己的起点，而非绝对标签。"
    },
    {
      id: 3,
      question: "专业版报告比基础版提供哪些额外价值？",
      answer: "专业版报告提供更深入、更全面的性格分析，包括详细的认知功能解析、职业适应性评估、人际关系模式分析、个人成长建议，以及与其他16种性格类型的互动指南。此外，专业版用户可以获得一次专业心理咨询师的在线咨询机会，帮助你更好地理解和应用测试结果。"
    },
    {
      id: 4,
      question: "测试大约需要多长时间完成？",
      answer: "基础的MBTI测试通常需要5-10分钟完成。我们的测试设计简洁高效，确保你能在短时间内获得准确的性格类型评估。专业版测试会有更多深入问题，可能需要15-20分钟完成。"
    },
    {
      id: 5,
      question: "MBTI测试结果会随时间变化吗？",
      answer: "虽然人的核心性格特质相对稳定，但随着人生经历的丰富和个人成长，某些偏好可能会发生微妙变化。特别是边界性偏好（指在某个维度上的偏好不是很强烈）可能会随着时间和环境而有所变化。因此，我们建议在人生重要阶段重新进行测试，以获得最新、最准确的自我认知。"
    },
    {
      id: 6,
      question: "如何使用MBTI测试结果改善人际关系？",
      answer: "MBTI测试结果可以帮助你了解自己和他人的沟通偏好、决策方式和信息处理风格。通过了解不同性格类型之间的互动模式，你可以更好地适应不同的沟通风格，减少冲突，建立更健康的人际关系。专业版报告包含详细的人际关系指南，针对不同类型提供具体的互动策略。"
    }
  ];
  
  const toggleItem = (id: number) => {
    if (openItem === id) {
      setOpenItem(null);
    } else {
      setOpenItem(id);
    }
  };
  
  return (
    <section id="faq" className="section bg-[#f5f5f7]">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="heading">常见问题</h2>
          <p className="subheading mx-auto">
            关于MBTI测试的常见问题解答
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div 
                key={faq.id} 
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                  onClick={() => toggleItem(faq.id)}
                >
                  <span className="font-medium text-[#1d1d1f]">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-[#86868b] transition-transform duration-200 ${
                      openItem === faq.id ? 'transform rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div
                  className={`px-6 overflow-hidden transition-all duration-200 ${
                    openItem === faq.id ? 'max-h-96 pb-4' : 'max-h-0'
                  }`}
                >
                  <p className="text-[#86868b]">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-[#86868b] mb-4">还有其他问题？</p>
            <a 
              href="mailto:bourneliu66@gmail.com" 
              className="text-[#0071e3] hover:underline font-medium"
            >
              联系我们获取更多帮助
            </a>
          </div>
        </div>
      </div>
    </section>
  );
} 