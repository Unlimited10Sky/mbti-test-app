'use client';

import { useState } from 'react';

export default function Test() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  // 优化后的MBTI测试问题 - 使用7点量表
  const questions = [
    // I. 内向/外向 (E-I)
    {
      id: 1,
      question: "在社交场合中，我通常是精力充沛且积极参与谈话的那一个。",
      dimension: "E-I",
      direction: "E" // 同意表示外向(E)倾向
    },
    {
      id: 2,
      question: "我宁愿花时间与少数几个亲密朋友深入交流，而不是认识很多新朋友。",
      dimension: "E-I",
      direction: "I" // 同意表示内向(I)倾向
    },
    {
      id: 3,
      question: "在完成一项耗费精力的工作后，我更愿意通过与朋友出去活动来放松。",
      dimension: "E-I",
      direction: "E"
    },
    {
      id: 4,
      question: "我经常需要独处的时间来恢复精力和思考。",
      dimension: "E-I",
      direction: "I"
    },
    {
      id: 5,
      question: "在团队讨论中，我倾向于先听取他人意见，然后再表达自己的想法。",
      dimension: "E-I",
      direction: "I"
    },
    {
      id: 6,
      question: "我喜欢成为关注的焦点。",
      dimension: "E-I",
      direction: "E"
    },
    {
      id: 7,
      question: "我更喜欢在安静的环境中工作，而不是充满活力的开放空间。",
      dimension: "E-I",
      direction: "I"
    },
    
    // II. 感觉/直觉 (S-N)
    {
      id: 8,
      question: "我更关注实际的细节和具体事实，而非抽象的概念和理论。",
      dimension: "S-N",
      direction: "S" // 同意表示感觉(S)倾向
    },
    {
      id: 9,
      question: "我常常发现自己在思考未来的可能性和创新的方法。",
      dimension: "S-N",
      direction: "N" // 同意表示直觉(N)倾向
    },
    {
      id: 10,
      question: "在学习新事物时，我更喜欢遵循明确的、一步一步的指示。",
      dimension: "S-N",
      direction: "S"
    },
    {
      id: 11,
      question: "我更感兴趣的是探索新想法，而不是实际应用它们。",
      dimension: "S-N",
      direction: "N"
    },
    {
      id: 12,
      question: "我认为自己是一个务实且脚踏实地的人。",
      dimension: "S-N",
      direction: "S"
    },
    {
      id: 13,
      question: "我经常发现自己会关注事物背后的含义和联系，而不仅仅是表面现象。",
      dimension: "S-N",
      direction: "N"
    },
    {
      id: 14,
      question: "我相信经验和已证实的方法比直觉更可靠。",
      dimension: "S-N",
      direction: "S"
    },
    
    // III. 思考/情感 (T-F)
    {
      id: 15,
      question: "在做决定时，我倾向于考虑客观事实而非个人感受。",
      dimension: "T-F",
      direction: "T" // 同意表示思考(T)倾向
    },
    {
      id: 16,
      question: "我常常注意他人的情绪状态，并试图理解他们的感受。",
      dimension: "T-F",
      direction: "F" // 同意表示情感(F)倾向
    },
    {
      id: 17,
      question: "给予他人反馈时，我认为直接坦率比委婉表达更重要。",
      dimension: "T-F",
      direction: "T"
    },
    {
      id: 18,
      question: "团队和谐对我来说比达成目标更为重要。",
      dimension: "T-F",
      direction: "F"
    },
    {
      id: 19,
      question: "我更欣赏逻辑分析能力，而不是同理心和情感理解能力。",
      dimension: "T-F",
      direction: "T"
    },
    {
      id: 20,
      question: "当朋友遇到问题时，我首先会提供情感支持，而不是立即提出解决方案。",
      dimension: "T-F",
      direction: "F"
    },
    {
      id: 21,
      question: "我认为维持客观公正比照顾每个人的感受更为重要。",
      dimension: "T-F",
      direction: "T"
    },
    
    // IV. 判断/知觉 (J-P)
    {
      id: 22,
      question: "我喜欢提前计划并组织我的日程安排。",
      dimension: "J-P",
      direction: "J" // 同意表示判断(J)倾向
    },
    {
      id: 23,
      question: "我更喜欢保持灵活，根据情况随时调整计划。",
      dimension: "J-P",
      direction: "P" // 同意表示知觉(P)倾向
    },
    {
      id: 24,
      question: "面对多项任务，我会建立优先级并按顺序一一完成。",
      dimension: "J-P",
      direction: "J"
    },
    {
      id: 25,
      question: "我经常会推迟决定，以便收集更多信息或保持选择的开放性。",
      dimension: "J-P",
      direction: "P"
    },
    {
      id: 26,
      question: "我喜欢在一个井然有序且结构化的环境中工作和生活。",
      dimension: "J-P",
      direction: "J"
    },
    {
      id: 27,
      question: "我对新的、意外的变化和机会感到兴奋。",
      dimension: "J-P",
      direction: "P"
    },
    {
      id: 28,
      question: "我倾向于严格遵守截止日期和时间表。",
      dimension: "J-P",
      direction: "J"
    },
    
    // V. 综合验证问题
    {
      id: 29,
      question: "在理想的周末，我更愿意参加社交活动，与朋友共度时光，而不是在家里安静地度过。",
      dimension: "E-I",
      direction: "E"
    },
    {
      id: 30,
      question: "在解决问题时，我更依赖过去的经验和已知事实，而不是直觉和创新的思路。",
      dimension: "S-N",
      direction: "S"
    },
    {
      id: 31,
      question: "在评估一个建议时，我首先考虑这个建议是否合乎逻辑并有效，而不是它如何影响相关的人。",
      dimension: "T-F",
      direction: "T"
    },
    {
      id: 32,
      question: "我更满意的工作方式是有清晰的结构和明确的期限，而不是有灵活性和自主性。",
      dimension: "J-P",
      direction: "J"
    },
    {
      id: 33,
      question: "当我需要做决定时，我更注重分析利弊，寻找最佳选择，而不是考虑决定对自己和他人的影响。",
      dimension: "T-F",
      direction: "T"
    },
    {
      id: 34,
      question: "在我看来，理想的环境是高效且有组织的，而不是轻松且适应性强的。",
      dimension: "J-P",
      direction: "J"
    },
    {
      id: 35,
      question: "我认为自己最突出的优势是分析问题和提出解决方案的能力，而不是理解他人感受并建立良好关系的能力。",
      dimension: "T-F",
      direction: "T"
    }
  ];
  
  // 7点量表选项
  const ratingOptions = [
    { value: 1, label: "强烈不同意" },
    { value: 2, label: "不同意" },
    { value: 3, label: "略不同意" },
    { value: 4, label: "中立" },
    { value: 5, label: "略同意" },
    { value: 6, label: "同意" },
    { value: 7, label: "强烈同意" }
  ];
  
  // 回答问题
  const handleAnswer = (value: number) => {
    setAnswers({
      ...answers,
      [currentStep]: value
    });
    
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateResult();
    }
  };
  
  // 计算MBTI结果
  const calculateResult = () => {
    setLoading(true);
    
    // 模拟加载过程
    setTimeout(() => {
      // 定义更精确的类型
      type DimensionKey = 'E-I' | 'S-N' | 'T-F' | 'J-P';
      type DimensionMap = {
        'E-I': { E: number; I: number; };
        'S-N': { S: number; N: number; };
        'T-F': { T: number; F: number; };
        'J-P': { J: number; P: number; };
      };
      
      const dimensions: DimensionMap = {
        'E-I': { E: 0, I: 0 },
        'S-N': { S: 0, N: 0 },
        'T-F': { T: 0, F: 0 },
        'J-P': { J: 0, P: 0 }
      };
      
      // 处理每个问题的答案
      Object.entries(answers).forEach(([questionIndex, answerValue]) => {
        const question = questions[parseInt(questionIndex)];
        const { dimension, direction } = question;
        
        // 基于7点量表的答案和问题方向计算得分
        const score = answerValue - 4; // 转换为-3到+3范围
        
        // 安全地将维度键转换为类型
        const dim = dimension as DimensionKey;
        
        if (direction === 'E' || direction === 'S' || direction === 'T' || direction === 'J') {
          // 如果问题方向是E/S/T/J，同意(高分)表示倾向于第一个字母
          if (score > 0) {
            // 根据维度选择正确的属性
            if (dim === 'E-I') dimensions[dim].E += score;
            else if (dim === 'S-N') dimensions[dim].S += score;
            else if (dim === 'T-F') dimensions[dim].T += score;
            else if (dim === 'J-P') dimensions[dim].J += score;
          } else {
            // 不同意表示倾向于相反方向
            if (dim === 'E-I') dimensions[dim].I += Math.abs(score);
            else if (dim === 'S-N') dimensions[dim].N += Math.abs(score);
            else if (dim === 'T-F') dimensions[dim].F += Math.abs(score);
            else if (dim === 'J-P') dimensions[dim].P += Math.abs(score);
          }
        } else {
          // 如果问题方向是I/N/F/P，同意(高分)表示倾向于第二个字母
          if (score > 0) {
            if (dim === 'E-I') dimensions[dim].I += score;
            else if (dim === 'S-N') dimensions[dim].N += score;
            else if (dim === 'T-F') dimensions[dim].F += score;
            else if (dim === 'J-P') dimensions[dim].P += score;
          } else {
            // 不同意表示倾向于相反方向
            if (dim === 'E-I') dimensions[dim].E += Math.abs(score);
            else if (dim === 'S-N') dimensions[dim].S += Math.abs(score);
            else if (dim === 'T-F') dimensions[dim].T += Math.abs(score);
            else if (dim === 'J-P') dimensions[dim].J += Math.abs(score);
          }
        }
      });
      
      // 确定每个维度的偏好
      const mbtiResult = [
        dimensions['E-I'].E > dimensions['E-I'].I ? 'E' : 'I',
        dimensions['S-N'].S > dimensions['S-N'].N ? 'S' : 'N',
        dimensions['T-F'].T > dimensions['T-F'].F ? 'T' : 'F',
        dimensions['J-P'].J > dimensions['J-P'].P ? 'J' : 'P'
      ].join('');
      
      setResult(mbtiResult);
      setLoading(false);
    }, 2000);
  };
  
  // 重新开始测试
  const restartTest = () => {
    setCurrentStep(0);
    setAnswers({});
    setResult(null);
  };
  
  // MBTI类型说明
  const mbtiDescriptions: Record<string, { title: string, description: string }> = {
    'INTJ': {
      title: '建筑师',
      description: '富有想象力和策略性的思想家，对一切都有计划。擅长系统思考和独立工作，追求持续改进和高效解决问题。'
    },
    'INTP': {
      title: '逻辑学家',
      description: '善于创新的发明家，对知识有着不可抑制的渴望。思维开放灵活，喜欢挑战传统观念，专注于解决复杂问题。'
    },
    'ENTJ': {
      title: '指挥官',
      description: '大胆、富有想象力和意志力强的领导者，总是找到前进的道路。果断自信，擅长制定长期战略并调动资源实现目标。'
    },
    'ENTP': {
      title: '辩论家',
      description: '聪明、好奇的思想家，不会放过任何智力挑战。思维敏捷，善于发现联系，喜欢探索可能性并挑战现状。'
    },
    'INFJ': {
      title: '提倡者',
      description: '安静、神秘，能够激励他人的理想主义者。具有深刻的洞察力，关注社会公正，致力于实现对未来的愿景。'
    },
    'INFP': {
      title: '调停者',
      description: '诗意、善良的利他主义者，总是热情地为正义的事业而奋斗。富有同情心，重视个人价值和成长，追求真实和和谐。'
    },
    'ENFJ': {
      title: '主人公',
      description: '富有魅力和感染力的领导者，能够激励他人。关注人际关系，擅长发现他人潜能，致力于促进个人与集体的发展。'
    },
    'ENFP': {
      title: '活动家',
      description: '热情、有创造力、社交能力强的自由精神，总能找到理由微笑。充满活力，善于发现机会，鼓励他人追求梦想。'
    },
    'ISTJ': {
      title: '物流师',
      description: '实际、注重事实的个体，其可靠性是无可争议的。有组织、有条理，尊重传统和责任，履行承诺并关注细节。'
    },
    'ISFJ': {
      title: '守卫者',
      description: '非常专注、温暖和保护性强的人，总是随时准备保护他们所爱的人。勤勉踏实，重视稳定和安全，愿意为他人付出。'
    },
    'ESTJ': {
      title: '总经理',
      description: '出色的管理者，对细节有不可思议的关注和关心。实际高效，遵循规则和程序，擅长组织资源实现具体目标。'
    },
    'ESFJ': {
      title: '执政官',
      description: '极其关心的、社交的、受欢迎的人，总是热心帮助他人。重视和谐与合作，组织能力强，关注他人的需要和福祉。'
    },
    'ISTP': {
      title: '鉴赏家',
      description: '大胆而实际的实验者，熟练掌握各种工具。灵活应变，善于解决具体问题，喜欢深入了解事物如何运作。'
    },
    'ISFP': {
      title: '冒险家',
      description: '灵活、魅力四射的艺术家，总是准备探索和体验新事物。感性直觉，注重当下体验，表达独特的审美观和价值观。'
    },
    'ESTP': {
      title: '企业家',
      description: '聪明、精力充沛、善于察言观色的人，真正喜欢生活在边缘。实用灵活，善于解决危机，享受风险与刺激。'
    },
    'ESFP': {
      title: '表演者',
      description: '自发、精力充沛、热情的娱乐者 - 生活从不会在他们身边变得无聊。充满活力，重视社交与体验，带给他人欢乐与兴奋。'
    }
  };
  
  return (
    <section id="test" className="section bg-[#f5f5f7]">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="heading">开始你的MBTI测试</h2>
          <p className="subheading mx-auto">
            通过回答以下问题，了解你的性格类型和特质
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-8">
          {!result ? (
            <>
              {!loading ? (
                <>
                  <div className="mb-8">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-[#0071e3] h-2.5 rounded-full transition-all duration-300" 
                        style={{ width: `${(currentStep / questions.length) * 100}%` }}
                      ></div>
                    </div>
                    <div className="mt-2 text-right text-sm text-[#86868b]">
                      {currentStep + 1} / {questions.length}
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-[#1d1d1f] mb-6">
                      {questions[currentStep].question}
                    </h3>
                    
                    <div className="mt-6">
                      <div className="relative">
                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 text-lg font-medium">
                          同意
                        </div>
                        <div className="flex flex-col mx-auto max-w-xs">
                          {ratingOptions.map((option) => (
                            <button
                              key={option.value}
                              className={`w-full px-4 py-2 my-1 text-center transition-all duration-200
                                ${answers[currentStep] === option.value ? 'bg-blue-100 text-blue-600 font-medium' : 'hover:bg-gray-100'}`}
                              onClick={() => handleAnswer(option.value)}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 text-lg font-medium">
                          不同意
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="py-12 text-center">
                  <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-[#0071e3] border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status"></div>
                  <p className="mt-4 text-[#86868b]">正在分析您的答案...</p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8">
              <div className="w-20 h-20 mx-auto bg-[#0071e3]/10 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-[#0071e3]">{result}</span>
              </div>
              
              <h3 className="text-2xl font-bold text-[#1d1d1f] mb-2">
                您的MBTI类型：{mbtiDescriptions[result]?.title || ''}
              </h3>
              
              <p className="text-[#86868b] mb-8">
                {mbtiDescriptions[result]?.description || ''}
              </p>
              
              <div className="bg-[#f5f5f7] rounded-lg p-6 mb-8">
                <h4 className="font-medium text-[#1d1d1f] mb-3">想了解更多关于您的性格类型？</h4>
                <p className="text-sm text-[#86868b] mb-4">
                  订阅我们的专业版报告，获取更深入的分析和个性化建议。
                </p>
                <button className="btn-primary w-full">
                  升级到专业版
                </button>
              </div>
              
              <button 
                onClick={restartTest}
                className="text-[#0071e3] hover:underline"
              >
                重新测试
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
} 