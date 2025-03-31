'use client';

import { useState } from 'react';
import { getCareerAnalysis, CareerAnalysis } from '../analysis/careerAnalysis';

// 定义类型
type DimensionKey = 'E-I' | 'S-N' | 'T-F' | 'J-P';
type DimensionPair = { [key: string]: number };
type DimensionMap = { [key in DimensionKey]: DimensionPair };
type AnalysisType = 'basic' | 'career' | 'relationship';

// MBTI类型名称和简短描述
const mbtiProfiles = {
  'INTJ': { title: '建筑师', description: '战略性思考者，具有独特的洞察力和创新能力' },
  'INTP': { title: '逻辑学家', description: '创新的思想家，知识的探索者，善于发现复杂问题的解决方案' },
  'ENTJ': { title: '指挥官', description: '果断的领导者，善于规划和决策，追求高效和成功' },
  'ENTP': { title: '辩论家', description: '机智灵活的思想家，喜欢智力挑战和创新想法' },
  'INFJ': { title: '提倡者', description: '理想主义者，有强烈的个人信念，致力于帮助他人' },
  'INFP': { title: '调停者', description: '富有同情心的理想主义者，看重个人价值和内在和谐' },
  'ENFJ': { title: '主人公', description: '富有魅力的协调者，能鼓舞他人，致力于积极影响' },
  'ENFP': { title: '探险家', description: '热情洋溢的创新者，总能看到可能性，渴望帮助他人成长' },
  'ISTJ': { title: '物流师', description: '实际可靠的组织者，注重细节和秩序，重视传统和忠诚' },
  'ISFJ': { title: '守卫者', description: '尽职尽责的保护者，愿意付出努力帮助他人，注重稳定' },
  'ESTJ': { title: '总经理', description: '高效的管理者，重视秩序和规则，思维条理清晰' },
  'ESFJ': { title: '执政官', description: '热心的合作者，关注他人需求，重视和谐与责任' },
  'ISTP': { title: '鉴赏家', description: '灵活的分析者，善于利用工具解决实际问题，喜欢探索' },
  'ISFP': { title: '冒险家', description: '灵活善变的艺术家，以自己的方式欣赏美，追求和平' },
  'ESTP': { title: '企业家', description: '活力四射的问题解决者，喜欢冒险和实际体验' },
  'ESFP': { title: '表演者', description: '自发友好的娱乐者，喜欢与他人互动，享受当下' }
};

export default function Test() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<string | null>(null);
  const [resultDetails, setResultDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [analysisType, setAnalysisType] = useState<AnalysisType>('basic');
  const [careerData, setCareerData] = useState<CareerAnalysis | null>(null);
  
  // 优化后的MBTI测试问题 - 使用7点量表，更符合中国文化背景
  const questions = [
    // I. 内向/外向 (E-I)
    {
      id: 1,
      question: "在朋友聚会或同学聚餐时，我通常愿意主动引导话题并分享自己的经历。",
      dimension: "E-I",
      direction: "E" // 同意表示外向(E)倾向
    },
    {
      id: 2,
      question: "我更享受与一两个知己长谈，而不是参加热闹的社交活动。",
      dimension: "E-I",
      direction: "I" // 同意表示内向(I)倾向
    },
    {
      id: 3,
      question: "加班或学习疲惫后，我更倾向于约朋友出去放松，而不是独自休息。",
      dimension: "E-I",
      direction: "E"
    },
    {
      id: 4,
      question: "在人多嘈杂的环境中待久了，我会感到精力耗尽，需要独处来恢复。",
      dimension: "E-I",
      direction: "I"
    },
    {
      id: 5,
      question: "在团队会议或班级讨论中，我通常会先倾听他人发言，然后再表达自己的想法。",
      dimension: "E-I",
      direction: "I"
    },
    {
      id: 6,
      question: "在亲朋好友的聚会上，我不介意成为大家关注的焦点。",
      dimension: "E-I",
      direction: "E"
    },
    {
      id: 7,
      question: "我更喜欢在安静的图书馆或独立空间工作学习，而不是热闹的咖啡厅或开放式办公区。",
      dimension: "E-I",
      direction: "I"
    },
    
    // II. 感觉/直觉 (S-N)
    {
      id: 8,
      question: "处理工作或学习任务时，我更注重实际操作和具体细节，而非创新思路和概念。",
      dimension: "S-N",
      direction: "S" // 同意表示感觉(S)倾向
    },
    {
      id: 9,
      question: "我常常会联想事物之间不明显的关联，发现他人容易忽略的可能性。",
      dimension: "S-N",
      direction: "N" // 同意表示直觉(N)倾向
    },
    {
      id: 10,
      question: "学习新技能时（如做菜、使用软件等），我喜欢按部就班地遵循指南或教程。",
      dimension: "S-N",
      direction: "S"
    },
    {
      id: 11,
      question: "我更愿意探讨未来趋势和可能性，而不是讨论当下的实际情况。",
      dimension: "S-N",
      direction: "N"
    },
    {
      id: 12,
      question: "朋友眼中的我是脚踏实地、注重事实的人，而非充满天马行空想法的人。",
      dimension: "S-N",
      direction: "S"
    },
    {
      id: 13,
      question: "阅读材料或观看影视作品时，我常思考其中隐含的象征意义和深层主题。",
      dimension: "S-N",
      direction: "N"
    },
    {
      id: 14,
      question: "我相信经过反复验证的方法比直觉和灵感更加可靠。",
      dimension: "S-N",
      direction: "S"
    },
    
    // III. 思考/情感 (T-F)
    {
      id: 15,
      question: "在团队分工或家庭决策中，我倾向于基于逻辑和效率做决定，而非考虑每个人的感受。",
      dimension: "T-F",
      direction: "T" // 同意表示思考(T)倾向
    },
    {
      id: 16,
      question: "我能敏锐察觉到他人情绪的细微变化，并自然地表达关心。",
      dimension: "T-F",
      direction: "F" // 同意表示情感(F)倾向
    },
    {
      id: 17,
      question: "给予同事或同学反馈时，我认为直接指出问题比委婉表达更有建设性。",
      dimension: "T-F",
      direction: "T"
    },
    {
      id: 18,
      question: "在工作或学习小组中，维持融洽的氛围对我来说比高效完成任务更重要。",
      dimension: "T-F",
      direction: "F"
    },
    {
      id: 19,
      question: "我更欣赏分析问题和解决问题的能力，而不是理解他人情感和建立和谐关系的能力。",
      dimension: "T-F",
      direction: "T"
    },
    {
      id: 20,
      question: "当朋友分享困扰时，我首先会关心他们的感受，而不是立即提出解决方案。",
      dimension: "T-F",
      direction: "F"
    },
    {
      id: 21,
      question: "在评价他人表现或处理纠纷时，我重视公平公正的原则，即使这可能伤害到某些人的感情。",
      dimension: "T-F",
      direction: "T"
    },
    
    // IV. 判断/知觉 (J-P)
    {
      id: 22,
      question: "我习惯提前规划行程安排，例如旅行计划、学习计划或工作日程。",
      dimension: "J-P",
      direction: "J" // 同意表示判断(J)倾向
    },
    {
      id: 23,
      question: "我喜欢保持选择的开放性，根据情况随时调整计划和安排。",
      dimension: "J-P",
      direction: "P" // 同意表示知觉(P)倾向
    },
    {
      id: 24,
      question: "面对多项任务（如工作项目、考试复习等），我会建立优先级并按顺序一一完成。",
      dimension: "J-P",
      direction: "J"
    },
    {
      id: 25,
      question: "我常推迟决定，希望获取更多信息或等待更好的选择出现。",
      dimension: "J-P",
      direction: "P"
    },
    {
      id: 26,
      question: "我的生活和工作环境通常是整齐有序的，物品都有固定的位置。",
      dimension: "J-P",
      direction: "J"
    },
    {
      id: 27,
      question: "面对计划外的活动邀约或工作变动，我通常感到兴奋而非不适。",
      dimension: "J-P",
      direction: "P"
    },
    {
      id: 28,
      question: "我会严格遵守截止日期，并希望他人也同样重视时间承诺。",
      dimension: "J-P",
      direction: "J"
    },
    
    // V. 综合验证和文化适应问题
    {
      id: 29,
      question: "在春节假期中，我更愿意走亲访友、参加各种聚会，而不是在家安静度假。",
      dimension: "E-I",
      direction: "E"
    },
    {
      id: 30,
      question: "处理工作或学业挑战时，我更依赖以往的经验和实用方法，而非创新的解决思路。",
      dimension: "S-N",
      direction: "S"
    },
    {
      id: 31,
      question: "在评价一个建议或方案时，我首先考虑其逻辑合理性和实施效果，而非对相关人员的情感影响。",
      dimension: "T-F",
      direction: "T"
    },
    {
      id: 32,
      question: "我更喜欢有明确规则和流程的工作或学习环境，而非灵活自主的安排。",
      dimension: "J-P",
      direction: "J"
    },
    {
      id: 33,
      question: "在家庭重大决策中（如购房、教育投资），我倾向于分析利弊做出最佳选择，而非考虑每个家庭成员的感受。",
      dimension: "T-F",
      direction: "T"
    },
    {
      id: 34,
      question: "我认为生活中最理想的状态是一切井然有序、按计划进行，而非随性自然、顺其自然。",
      dimension: "J-P",
      direction: "J"
    },
    {
      id: 35,
      question: "同事、同学或朋友认为我擅长的是分析问题和找出解决方案，而非理解他人需求和协调人际关系。",
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
  
  // 计算结果
  const calculateResult = () => {
    setLoading(true);
    
    // 模拟计算延迟，实际生产环境中可能会调用API
    setTimeout(() => {
      // 初始化四个维度的计分
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
        
        // 基于7点量表的答案转换为-3到+3范围
        const score = answerValue - 4; 
        
        // 安全地将维度键转换为类型
        const dim = dimension as DimensionKey;
        
        if (score > 0) { // 正分，表示同意
          if (direction === 'E') dimensions[dim].E += score;
          else if (direction === 'I') dimensions[dim].I += score;
          else if (direction === 'S') dimensions[dim].S += score;
          else if (direction === 'N') dimensions[dim].N += score;
          else if (direction === 'T') dimensions[dim].T += score;
          else if (direction === 'F') dimensions[dim].F += score;
          else if (direction === 'J') dimensions[dim].J += score;
          else if (direction === 'P') dimensions[dim].P += score;
        } 
        else if (score < 0) { // 负分，表示不同意
          if (direction === 'E') dimensions[dim].I += Math.abs(score);
          else if (direction === 'I') dimensions[dim].E += Math.abs(score);
          else if (direction === 'S') dimensions[dim].N += Math.abs(score);
          else if (direction === 'N') dimensions[dim].S += Math.abs(score);
          else if (direction === 'T') dimensions[dim].F += Math.abs(score);
          else if (direction === 'F') dimensions[dim].T += Math.abs(score);
          else if (direction === 'J') dimensions[dim].P += Math.abs(score);
          else if (direction === 'P') dimensions[dim].J += Math.abs(score);
        }
        // 中立(score=0)不增加任何分数
      });
      
      // 确定每个维度的偏好并计算强度百分比
      const typeResult = {
        type: '',
        dimensions: {
          'E-I': { preference: '', strength: 0 },
          'S-N': { preference: '', strength: 0 },
          'T-F': { preference: '', strength: 0 },
          'J-P': { preference: '', strength: 0 }
        }
      };
      
      // 计算每个维度的偏好和强度
      Object.entries(dimensions).forEach(([dim, scores]) => {
        const dimension = dim as DimensionKey;
        const keys = Object.keys(scores);
        const values = Object.values(scores);
        const total = values[0] + values[1];
        
        let preference = '';
        let strength = 50; // 默认平衡
        
        if (total > 0) {
          if (values[0] > values[1]) {
            preference = keys[0];
            strength = Math.round((values[0] / total) * 100);
          } else {
            preference = keys[1];
            strength = Math.round((values[1] / total) * 100);
          }
        }
        
        typeResult.dimensions[dimension] = { preference, strength };
      });
      
      // 组合MBTI类型
      typeResult.type = [
        typeResult.dimensions['E-I'].preference,
        typeResult.dimensions['S-N'].preference,
        typeResult.dimensions['T-F'].preference,
        typeResult.dimensions['J-P'].preference
      ].join('');
      
      setResult(typeResult.type);
      setResultDetails(typeResult);
      setAnalysisType('basic');
      setLoading(false);
    }, 1500);
  };
  
  // 重新开始测试
  const restartTest = () => {
    setCurrentStep(0);
    setAnswers({});
    setResult(null);
    setResultDetails(null);
  };
  
  // 返回上一题
  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // 切换分析类型
  const changeAnalysisType = (type: AnalysisType) => {
    setAnalysisType(type);
    
    // 当选择职场分析时，加载职场数据
    if (type === 'career' && result) {
      // 无论是否已有数据，都尝试重新加载，解决潜在问题
      const data = getCareerAnalysis(result);
      console.log("加载职场数据:", result, data); // 调试信息
      
      // 对于暂未提供分析的类型，显示基础数据
      if (!data) {
        setCareerData({
          strengths: ["该类型职场分析正在完善中..."],
          workEnvironment: "我们正在为您的类型(" + result + ")准备更详细的职场分析内容，请稍后再查看。",
          teamRole: "团队角色分析正在完善中...",
          leadershipStyle: "领导风格分析正在完善中...",
          challenges: ["暂无详细挑战分析"],
          recommendations: ["暂无详细建议"],
          suitableCareers: ["正在整理适合的职业方向"]
        });
      } else {
        setCareerData(data);
      }
    }
  };

  // 渲染当前测试阶段
  const renderTestStage = () => {
    // 测试完成，显示结果
    if (result) {
      return (
        <div className="result-container">
          <div className="result-type">{result}</div>
          <div className="result-title">{mbtiProfiles[result as keyof typeof mbtiProfiles]?.title || ''}</div>
          <p className="result-description">{mbtiProfiles[result as keyof typeof mbtiProfiles]?.description || ''}</p>
          
          {/* 分析类型选择器 */}
          <div className="analysis-tabs">
            <button 
              onClick={() => changeAnalysisType('basic')} 
              className={`analysis-tab ${analysisType === 'basic' ? 'active' : ''}`}
            >
              基础分析
            </button>
            <button 
              onClick={() => changeAnalysisType('career')} 
              className={`analysis-tab ${analysisType === 'career' ? 'active' : ''}`}
            >
              职场分析
            </button>
            <button 
              onClick={() => changeAnalysisType('relationship')} 
              className={`analysis-tab ${analysisType === 'relationship' ? 'active' : ''}`}
            >
              关系分析
            </button>
          </div>
          
          {/* 维度强度图 */}
          {resultDetails && (
            <div className="dimensions-chart">
              <h4>您的偏好强度</h4>
              <div className="space-y-3">
                {Object.entries(resultDetails.dimensions).map(([dim, data]: [string, any]) => (
                  <div key={dim} className="dimension-item">
                    <div className="dimension-labels">
                      <span>{dim.split('-')[0]}</span>
                      <span className="center-label">{data.preference} {data.strength}%</span>
                      <span>{dim.split('-')[1]}</span>
                    </div>
                    <div className="dimension-bar">
                      {data.preference === dim.split('-')[0] ? (
                        <div 
                          className="dimension-value dimension-value-left"
                          style={{ width: `${data.strength}%` }}
                        ></div>
                      ) : (
                        <div 
                          className="dimension-value dimension-value-right"
                          style={{ width: `${data.strength}%` }}
                        ></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* 分析内容 - 根据当前选择显示不同内容 */}
          <div className="analysis-content mb-6">
            {analysisType === 'basic' && (
              <div className="basic-analysis">
                <p>这是基础分析内容。要查看更详细的职场分析或关系分析，请点击上方对应的选项卡。</p>
              </div>
            )}
            
            {analysisType === 'career' && (
              <div className="career-analysis">
                {careerData ? (
                  <div className="career-content">
                    <section>
                      <h4>职场优势</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {careerData.strengths.map((strength, index) => (
                          <li key={index}>{strength}</li>
                        ))}
                      </ul>
                    </section>
                    
                    <section>
                      <h4>理想工作环境</h4>
                      <p>{careerData.workEnvironment}</p>
                    </section>
                    
                    <section>
                      <h4>团队中的角色</h4>
                      <p>{careerData.teamRole}</p>
                    </section>
                    
                    <section>
                      <h4>领导风格</h4>
                      <p>{careerData.leadershipStyle}</p>
                    </section>
                    
                    <section>
                      <h4>职场挑战</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {careerData.challenges.map((challenge, index) => (
                          <li key={index}>{challenge}</li>
                        ))}
                      </ul>
                    </section>
                    
                    <section>
                      <h4>职业发展建议</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {careerData.recommendations.map((recommendation, index) => (
                          <li key={index}>{recommendation}</li>
                        ))}
                      </ul>
                    </section>
                    
                    <section>
                      <h4>适合的职业方向</h4>
                      <div className="careers-grid">
                        {careerData.suitableCareers.map((career, index) => (
                          <div key={index} className="career-item">{career}</div>
                        ))}
                      </div>
                    </section>
                  </div>
                ) : (
                  <div className="py-8 text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-brand border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status"></div>
                    <p className="mt-2">正在加载职场分析...</p>
                  </div>
                )}
              </div>
            )}
            
            {analysisType === 'relationship' && (
              <div className="relationship-analysis">
                <p>关系分析模块正在开发中，敬请期待...</p>
              </div>
            )}
          </div>
          
          <div className="flex gap-4 justify-center">
            <button 
              onClick={restartTest}
              className="btn-secondary"
            >
              重新测试
            </button>
            <button 
              onClick={() => window.print()}
              className="btn-primary"
            >
              打印结果
            </button>
          </div>
        </div>
      );
    }
    
    // 加载中
    if (loading) {
      return (
        <div className="loading-container text-center py-10">
          <div className="mb-4">分析您的答案中...</div>
          <div className="w-12 h-12 border-4 border-solid border-t-transparent rounded-full animate-spin mx-auto" style={{ borderColor: 'var(--color-brand)', borderTopColor: 'transparent' }}></div>
        </div>
      );
    }
    
    // 测试中
    const currentQuestion = questions[currentStep];
    const progress = Math.round((currentStep / questions.length) * 100);
    
    return (
      <div className="question-container">
        <div className="progress-container">
          <div className="progress-info">
            <span>问题 {currentStep + 1}/{questions.length}</span>
            <span>完成度: {progress}%</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-value" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        
        <h3 className="question-title">{currentQuestion.question}</h3>
        
        <div className="rating-options">
          {ratingOptions.map(option => (
            <button
              key={option.value}
              onClick={() => handleAnswer(option.value)}
              className="rating-button"
            >
              {option.label}
            </button>
          ))}
        </div>
        
        {currentStep > 0 && (
          <div className="flex justify-center mt-6">
            <button 
              onClick={goBack} 
              className="btn-secondary"
            >
              返回上一题
            </button>
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div id="test" className="test-container">
      <div className="test-header">
        <h2>MBTI人格测试</h2>
        <p>探索你的性格特质，发现真实的自我</p>
      </div>
      {renderTestStage()}
    </div>
  );
} 