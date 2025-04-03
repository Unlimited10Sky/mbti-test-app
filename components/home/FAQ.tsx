'use client';

import { useState } from 'react';
import { FaQuestionCircle, FaEnvelope, FaChevronDown } from 'react-icons/fa';

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
    <section id="faq" className="section bg-[#f8f9fa] py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-[#0071e3]/10 text-[#0071e3] rounded-full text-sm font-medium mb-4">常见问题</span>
          <h2 className="text-4xl font-bold text-[#1d1d1f] mb-6">我们已为你解答</h2>
          <p className="text-[#86868b] text-xl max-w-3xl mx-auto">
            以下是关于MBTI测试的一些常见问题，若有其他疑问，欢迎联系我们
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div 
                key={faq.id} 
                className={`bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 ${
                  openItem === faq.id ? 'ring-2 ring-[#0071e3]/20' : 'hover:shadow-md'
                }`}
              >
                <button
                  className="w-full px-8 py-5 text-left flex justify-between items-center focus:outline-none"
                  onClick={() => toggleItem(faq.id)}
                  aria-expanded={openItem === faq.id}
                >
                  <div className="flex items-center">
                    <span className="text-xl font-medium text-[#1d1d1f]">{faq.question}</span>
                  </div>
                  <FaChevronDown
                    className={`w-5 h-5 text-[#0071e3] transition-transform duration-300 ${
                      openItem === faq.id ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openItem === faq.id ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-8 pb-6 text-[#86868b] leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-14 p-8 bg-gradient-to-br from-[#0071e3]/5 to-[#f5f5f7] rounded-xl shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="md:w-2/3 mb-6 md:mb-0">
                <div className="flex items-center mb-3">
                  <FaQuestionCircle className="text-[#0071e3] mr-3 h-6 w-6" />
                  <h3 className="text-xl font-semibold text-[#1d1d1f]">还有其他问题？</h3>
                </div>
                <p className="text-[#86868b]">
                  如果你有任何其他问题或需要个性化的帮助，请随时联系我们的客服团队，我们会尽快回复你。
                </p>
              </div>
              <div className="md:w-1/3 flex justify-start md:justify-end">
                <a 
                  href="mailto:bourneliu66@gmail.com" 
                  className="inline-flex items-center bg-[#0071e3] text-white py-3 px-6 rounded-lg hover:bg-[#0077ed] transition-colors duration-300"
                >
                  <FaEnvelope className="mr-2" />
                  联系我们
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-[#86868b] text-sm">
              我们的支持团队工作时间：周一至周五 9:00-18:00（北京时间）
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 