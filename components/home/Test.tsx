'use client';

import { useState } from 'react';

export default function Test() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  // MBTI测试问题 - 简化版
  const questions = [
    {
      id: 1,
      question: "在社交场合中，你通常会：",
      options: [
        { value: "E", text: "积极参与，认识新朋友，享受热闹的氛围" },
        { value: "I", text: "保持低调，与少数人深入交流，或独自观察" }
      ]
    },
    {
      id: 2,
      question: "你更喜欢处理：",
      options: [
        { value: "S", text: "具体的事实和细节" },
        { value: "N", text: "概念和可能性" }
      ]
    },
    {
      id: 3,
      question: "当做决定时，你更倾向于：",
      options: [
        { value: "T", text: "依靠逻辑分析和客观标准" },
        { value: "F", text: "考虑人的感受和价值观" }
      ]
    },
    {
      id: 4,
      question: "你更喜欢的生活方式是：",
      options: [
        { value: "J", text: "有计划、有条理，喜欢做决定和安排" },
        { value: "P", text: "灵活自由，随机应变，保持选项开放" }
      ]
    },
    {
      id: 5,
      question: "你处理工作或学习任务时，更喜欢：",
      options: [
        { value: "J", text: "提前规划，按部就班完成" },
        { value: "P", text: "临近截止日期时高效完成" }
      ]
    },
    {
      id: 6,
      question: "与陌生人相处时，你倾向于：",
      options: [
        { value: "E", text: "主动开启话题，快速融入" },
        { value: "I", text: "等待他人接近，观察后再交流" }
      ]
    },
    {
      id: 7,
      question: "你更关注：",
      options: [
        { value: "S", text: "当下具体发生的事情" },
        { value: "N", text: "未来的可能性和想象" }
      ]
    },
    {
      id: 8,
      question: "你倾向于：",
      options: [
        { value: "F", text: "以人为本，关注情感和谐" },
        { value: "T", text: "以事为本，注重公平合理" }
      ]
    }
  ];
  
  // 回答问题
  const handleAnswer = (answerId: string) => {
    setAnswers({
      ...answers,
      [currentStep]: answerId
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
      const counts = {
        E: 0, I: 0,
        S: 0, N: 0,
        T: 0, F: 0,
        J: 0, P: 0
      };
      
      // 统计每个维度的得分
      Object.values(answers).forEach(answer => {
        counts[answer as keyof typeof counts]++;
      });
      
      // 确定每个维度的偏好
      const mbtiResult = [
        counts.E > counts.I ? 'E' : 'I',
        counts.S > counts.N ? 'S' : 'N',
        counts.T > counts.F ? 'T' : 'F',
        counts.J > counts.P ? 'J' : 'P'
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
      description: '富有想象力和策略性的思想家，对一切都有计划。'
    },
    'INTP': {
      title: '逻辑学家',
      description: '善于创新的发明家，对知识有着不可抑制的渴望。'
    },
    'ENTJ': {
      title: '指挥官',
      description: '大胆、富有想象力和意志力强的领导者，总是找到前进的道路。'
    },
    'ENTP': {
      title: '辩论家',
      description: '聪明、好奇的思想家，不会放过任何智力挑战。'
    },
    'INFJ': {
      title: '提倡者',
      description: '安静、神秘，能够激励他人的理想主义者。'
    },
    'INFP': {
      title: '调停者',
      description: '诗意、善良的利他主义者，总是热情地为正义的事业而奋斗。'
    },
    'ENFJ': {
      title: '主人公',
      description: '富有魅力和感染力的领导者，能够激励他人。'
    },
    'ENFP': {
      title: '活动家',
      description: '热情、有创造力、社交能力强的自由精神，总能找到理由微笑。'
    },
    'ISTJ': {
      title: '物流师',
      description: '实际、注重事实的个体，其可靠性是无可争议的。'
    },
    'ISFJ': {
      title: '守卫者',
      description: '非常专注、温暖和保护性强的人，总是随时准备保护他们所爱的人。'
    },
    'ESTJ': {
      title: '总经理',
      description: '出色的管理者，对细节有不可思议的关注和关心。'
    },
    'ESFJ': {
      title: '执政官',
      description: '极其关心的、社交的、受欢迎的人，总是热心帮助他人。'
    },
    'ISTP': {
      title: '鉴赏家',
      description: '大胆而实际的实验者，熟练掌握各种工具。'
    },
    'ISFP': {
      title: '冒险家',
      description: '灵活、魅力四射的艺术家，总是准备探索和体验新事物。'
    },
    'ESTP': {
      title: '企业家',
      description: '聪明、精力充沛、善于察言观色的人，真正喜欢生活在边缘。'
    },
    'ESFP': {
      title: '表演者',
      description: '自发、精力充沛、热情的娱乐者 - 生活从不会在他们身边变得无聊。'
    }
  };
  
  return (
    <section id="test" className="test-section">
      <div className="container">
        <div className="section-header">
          <h2 className="heading">开始你的MBTI测试</h2>
          <p className="subheading">
            通过回答以下问题，了解你的性格类型和特质
          </p>
        </div>
        
        <div className="test-container">
          {!result ? (
            <>
              {!loading ? (
                <>
                  <div className="progress-container">
                    <div className="progress-bar-bg">
                      <div 
                        className="progress-bar"
                        style={{ width: `${(currentStep / questions.length) * 100}%` }}
                      ></div>
                    </div>
                    <div className="progress-text">
                      {currentStep + 1} / {questions.length}
                    </div>
                  </div>
                  
                  <div className="question-container">
                    <h3 className="question-title">
                      {questions[currentStep].question}
                    </h3>
                    
                    <div className="options-container">
                      {questions[currentStep].options.map((option, index) => (
                        <button
                          key={index}
                          className="option-button"
                          onClick={() => handleAnswer(option.value)}
                        >
                          {option.text}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="loading-container">
                  <div className="loading-spinner"></div>
                  <p className="loading-text">正在分析您的答案...</p>
                </div>
              )}
            </>
          ) : (
            <div className="result-container">
              <div className="result-type">
                <span className="result-type-text">{result}</span>
              </div>
              
              <h3 className="result-title">
                您的MBTI类型：{mbtiDescriptions[result]?.title || ''}
              </h3>
              
              <p className="result-description">
                {mbtiDescriptions[result]?.description || ''}
              </p>
              
              <div className="upgrade-box">
                <h4 className="upgrade-title">想了解更多关于您的性格类型？</h4>
                <p className="upgrade-text">
                  订阅我们的专业版报告，获取更深入的分析和个性化建议。
                </p>
                <button className="btn-primary w-full">
                  升级到专业版
                </button>
              </div>
              
              <button 
                onClick={restartTest}
                className="restart-button"
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