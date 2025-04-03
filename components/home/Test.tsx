'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '../../app/contexts/LanguageContext';
import { getCareerAnalysis, CareerAnalysis } from '../analysis/careerAnalysis';
import CareerPathResult from '../analysis/CareerPathResult';
import { BsGraphUp, BsBriefcase, BsPeople, BsArrowRepeat, BsArrowLeft } from 'react-icons/bs';

// 定义类型
type CognitiveFunction = 'Se' | 'Si' | 'Ne' | 'Ni' | 'Te' | 'Ti' | 'Fe' | 'Fi';
type FunctionScore = { [key in CognitiveFunction]: number };
type AnalysisType = 'basic' | 'career' | 'relationship';

// 认知功能名称和描述
const cognitiveFunctions = {
  'Se': { 
    name: '外感知', 
    description: '关注并反应于当下的实际体验和感官信息'
  },
  'Si': { 
    name: '内感知', 
    description: '通过过往经验和记忆来处理和解释当前情况'
  },
  'Ne': { 
    name: '外直觉', 
    description: '看到多种可能性和想法之间的联系'
  },
  'Ni': { 
    name: '内直觉', 
    description: '整合信息以洞察事物的深层含义和未来发展'
  },
  'Te': { 
    name: '外思考', 
    description: '通过客观标准和外部数据组织和安排环境'
  },
  'Ti': { 
    name: '内思考', 
    description: '分析和理解概念与系统的内部逻辑一致性'
  },
  'Fe': { 
    name: '外情感', 
    description: '关注他人情绪和群体和谐，注重社会价值观'
  },
  'Fi': { 
    name: '内情感', 
    description: '遵循内在价值观和信念，关注个人真实感受'
  }
};

// MBTI类型到认知功能的映射
const mbtiToFunctions: { [key: string]: CognitiveFunction[] } = {
  'INTJ': ['Ni', 'Te', 'Fi', 'Se'],
  'INTP': ['Ti', 'Ne', 'Si', 'Fe'],
  'ENTJ': ['Te', 'Ni', 'Se', 'Fi'],
  'ENTP': ['Ne', 'Ti', 'Fe', 'Si'],
  'INFJ': ['Ni', 'Fe', 'Ti', 'Se'],
  'INFP': ['Fi', 'Ne', 'Si', 'Te'],
  'ENFJ': ['Fe', 'Ni', 'Se', 'Ti'],
  'ENFP': ['Ne', 'Fi', 'Te', 'Si'],
  'ISTJ': ['Si', 'Te', 'Fi', 'Ne'],
  'ISFJ': ['Si', 'Fe', 'Ti', 'Ne'],
  'ESTJ': ['Te', 'Si', 'Ne', 'Fi'],
  'ESFJ': ['Fe', 'Si', 'Ne', 'Ti'],
  'ISTP': ['Ti', 'Se', 'Ni', 'Fe'],
  'ISFP': ['Fi', 'Se', 'Ni', 'Te'],
  'ESTP': ['Se', 'Ti', 'Fe', 'Ni'],
  'ESFP': ['Se', 'Fi', 'Te', 'Ni']
};

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

// 取得与某一类型相配的MBTI类型
const getCompatibleTypes = (mbtiType: string): string[] => {
  // 基于认知功能兼容度的类型匹配
  const compatibilityMap: { [key: string]: string[] } = {
    'INTJ': ['ENFP', 'ENTP', 'INFJ', 'ENTJ'],
    'INTP': ['ENFJ', 'ENTJ', 'INFP', 'ENTP'],
    'ENTJ': ['INFP', 'INTP', 'ENFJ', 'INTJ'],
    'ENTP': ['INFJ', 'INTJ', 'ENFP', 'INTP'],
    'INFJ': ['ENFP', 'ENTP', 'INFJ', 'ENFJ'],
    'INFP': ['ENFJ', 'ENTJ', 'INFP', 'ENFP'],
    'ENFJ': ['INFP', 'INTP', 'ENFJ', 'ENTJ'],
    'ENFP': ['INFJ', 'INTJ', 'ENFP', 'INFP'],
    'ISTJ': ['ESFP', 'ESTP', 'ISTJ', 'ESTJ'],
    'ISFJ': ['ESFP', 'ESTP', 'ISFJ', 'ESFJ'],
    'ESTJ': ['ISFP', 'ISTP', 'ESTJ', 'ISTJ'],
    'ESFJ': ['ISFP', 'ISTP', 'ESFJ', 'ISFJ'],
    'ISTP': ['ESFJ', 'ESTJ', 'ISTP', 'ESTP'],
    'ISFP': ['ESFJ', 'ESTJ', 'ISFP', 'ESFP'],
    'ESTP': ['ISFJ', 'ISTJ', 'ESTP', 'ISTP'],
    'ESFP': ['ISFJ', 'ISTJ', 'ESFP', 'ISFP']
  };
  
  return compatibilityMap[mbtiType] || [];
};

export default function Test() {
  const { language, t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<string | null>(null);
  const [resultDetails, setResultDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [analysisType, setAnalysisType] = useState<AnalysisType>('basic');
  const [careerData, setCareerData] = useState<CareerAnalysis | null>(null);
  const [cognitiveScores, setCognitiveScores] = useState<FunctionScore | null>(null);
  
  // 设置CSS变量来控制同意/不同意标签
  useEffect(() => {
    document.documentElement.style.setProperty('--label-disagree', language === 'en' ? '"Disagree"' : '"不同意"');
    document.documentElement.style.setProperty('--label-agree', language === 'en' ? '"Agree"' : '"同意"');
  }, [language]);

  // 基于新问卷的MBTI测试问题 - 使用认知功能测量
  const questions = [
    // 外感知 (Se)
    {
      id: 1,
      question: t('test.newquestion.1') || "当机会出现时，我会跟随内心的直觉立即行动。",
      function: "Se"
    },
    {
      id: 2,
      question: t('test.newquestion.15') || "我享受投入当下的体验，喜欢充满活力的活动。",
      function: "Se"
    },
    {
      id: 3,
      question: t('test.newquestion.24'),
      function: "Se"
    },
    {
      id: 4,
      question: t('test.newquestion.38'),
      function: "Se"
    },
    
    // 内感知 (Si)
    {
      id: 5,
      question: t('test.newquestion.6'),
      function: "Si"
    },
    {
      id: 6,
      question: t('test.newquestion.12'),
      function: "Si"
    },
    {
      id: 7,
      question: t('test.newquestion.27'),
      function: "Si"
    },
    {
      id: 8,
      question: t('test.newquestion.40'),
      function: "Si"
    },
    
    // 外直觉 (Ne)
    {
      id: 9,
      question: t('test.newquestion.2'),
      function: "Ne"
    },
    {
      id: 10,
      question: t('test.newquestion.16'),
      function: "Ne"
    },
    {
      id: 11,
      question: t('test.newquestion.30'),
      function: "Ne"
    },
    {
      id: 12,
      question: t('test.newquestion.47'),
      function: "Ne"
    },
    
    // 内直觉 (Ni)
    {
      id: 13,
      question: t('test.newquestion.5'),
      function: "Ni"
    },
    {
      id: 14,
      question: t('test.newquestion.11'),
      function: "Ni"
    },
    {
      id: 15,
      question: t('test.newquestion.28'),
      function: "Ni"
    },
    {
      id: 16,
      question: t('test.newquestion.39'),
      function: "Ni"
    },
    
    // 外思考 (Te)
    {
      id: 17,
      question: t('test.newquestion.3'),
      function: "Te"
    },
    {
      id: 18,
      question: t('test.newquestion.14'),
      function: "Te"
    },
    {
      id: 19,
      question: t('test.newquestion.33'),
      function: "Te"
    },
    {
      id: 20,
      question: t('test.newquestion.42'),
      function: "Te"
    },
    
    // 内思考 (Ti)
    {
      id: 21,
      question: t('test.newquestion.7'),
      function: "Ti"
    },
    {
      id: 22,
      question: t('test.newquestion.31'),
      function: "Ti"
    },
    {
      id: 23,
      question: t('test.newquestion.35'),
      function: "Ti"
    },
    {
      id: 24,
      question: t('test.newquestion.44'),
      function: "Ti"
    },
    
    // 外情感 (Fe)
    {
      id: 25,
      question: t('test.newquestion.4'),
      function: "Fe"
    },
    {
      id: 26,
      question: t('test.newquestion.17'),
      function: "Fe"
    },
    {
      id: 27,
      question: t('test.newquestion.32'),
      function: "Fe"
    },
    {
      id: 28,
      question: t('test.newquestion.34'),
      function: "Fe"
    },
    
    // 内情感 (Fi)
    {
      id: 29,
      question: t('test.newquestion.8'),
      function: "Fi"
    },
    {
      id: 30,
      question: t('test.newquestion.13'),
      function: "Fi"
    },
    {
      id: 31,
      question: t('test.newquestion.25'),
      function: "Fi"
    },
    {
      id: 32,
      question: t('test.newquestion.43'),
      function: "Fi"
    }
  ];
  
  // 评分选项 - 7点量表，从"非常不同意"到"非常同意"
  const ratingOptions = [
    { value: 1, label: t('test.rating.stronglyDisagree') || '非常不同意' },
    { value: 2, label: t('test.rating.disagree') || '不同意' },
    { value: 3, label: t('test.rating.slightlyDisagree') || '有点不同意' },
    { value: 4, label: t('test.rating.neutral') || '中立' },
    { value: 5, label: t('test.rating.slightlyAgree') || '有点同意' },
    { value: 6, label: t('test.rating.agree') || '同意' },
    { value: 7, label: t('test.rating.stronglyAgree') || '非常同意' }
  ];
  
  const getMbtiTypeInfo = (type: string) => {
    const info = mbtiProfiles[type as keyof typeof mbtiProfiles];
    return {
      title: t(`mbti.${type}.title`) || info.title,
      description: t(`mbti.${type}.description`) || info.description
    };
  };

  // 处理用户回答问题
  const handleAnswer = (questionId: number, value: number) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);
    
    // 检查是否所有问题都已回答
    if (Object.keys(newAnswers).length === questions.length) {
      calculateResult(newAnswers);
    } else if (questionId === questions[currentStep].id) {
      // 前进到下一个问题
      setCurrentStep(currentStep + 1);
    }
  };

  // 计算MBTI结果
  const calculateResult = (userAnswers: Record<number, number>) => {
    setLoading(true);
    
    // 初始化认知功能得分
    const scores: FunctionScore = {
      'Se': 0, 'Si': 0, 'Ne': 0, 'Ni': 0,
      'Te': 0, 'Ti': 0, 'Fe': 0, 'Fi': 0
    };
    
    // 为每个问题计算得分
    questions.forEach(question => {
      const answer = userAnswers[question.id];
      if (answer) {
        // 7点量表：1=强烈不同意，7=强烈同意
        // 将答案转换为-3到+3的范围
        const normalizedScore = answer - 4;
        
        // 累加该认知功能的得分
        const func = question.function as CognitiveFunction;
        scores[func] += normalizedScore;
      }
    });
    
    // 设置认知功能得分
    setCognitiveScores(scores);
    
    // 计算外向/内向维度
    const isExtraverted = scores.Se + scores.Ne + scores.Te + scores.Fe > scores.Si + scores.Ni + scores.Ti + scores.Fi;
    
    // 基于认知功能得分确定四个维度的偏好
    const dimensions = {
      'E-I': isExtraverted ? 'E' : 'I',
      'S-N': scores.Se + scores.Si > scores.Ne + scores.Ni ? 'S' : 'N',
      'T-F': scores.Te + scores.Ti > scores.Fe + scores.Fi ? 'T' : 'F',
      'J-P': isExtraverted ? 
             (scores.Te + scores.Fe > scores.Ne + scores.Se ? 'J' : 'P') : 
             (scores.Ti + scores.Fi > scores.Ni + scores.Si ? 'P' : 'J')
    };
    
    // 计算四个维度的强度
    const strengths = {
      'E-I': Math.abs((scores.Se + scores.Ne + scores.Te + scores.Fe) - (scores.Si + scores.Ni + scores.Ti + scores.Fi)) / 20 * 100,
      'S-N': Math.abs((scores.Se + scores.Si) - (scores.Ne + scores.Ni)) / 20 * 100,
      'T-F': Math.abs((scores.Te + scores.Ti) - (scores.Fe + scores.Fi)) / 20 * 100,
      'J-P': Math.abs(isExtraverted ? 
              ((scores.Te + scores.Fe) - (scores.Ne + scores.Se)) : 
              ((scores.Ti + scores.Fi) - (scores.Ni + scores.Si))) / 20 * 100
    };
    
    // 构造MBTI类型字符串
    const mbtiType = `${dimensions['E-I']}${dimensions['S-N']}${dimensions['T-F']}${dimensions['J-P']}`;
    
    // 获取类型描述信息
    const typeInfo = getMbtiTypeInfo(mbtiType);
    
    // 设置结果
    setResult(mbtiType);
    setResultDetails({
      type: mbtiType,
      title: typeInfo.title,
      description: typeInfo.description,
      dimensions,
      strengths,
      functions: mbtiToFunctions[mbtiType]
    });
    
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  // 重新开始测试
  const restartTest = () => {
    setCurrentStep(0);
    setAnswers({});
    setResult(null);
    setResultDetails(null);
    setCognitiveScores(null);
    setAnalysisType('basic');
    setCareerData(null);
  };

  // 返回上一个问题
  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // 改变分析类型
  const changeAnalysisType = (type: AnalysisType) => {
    setAnalysisType(type);
    
    if (type === 'career' && result && !careerData) {
      // 获取职业分析
      const careerResult = getCareerAnalysis(result);
      if (careerResult) {
        setCareerData(careerResult);
      }
    }
  };

  // 渲染当前测试阶段内容
  const renderTestStage = () => {
    // 如果已有结果
    if (result) {
      // 分析类型切换按钮
      return (
        <div className="result-container">
          <div className="result-type">{result}</div>
          <div className="result-title">{getMbtiTypeInfo(result).title}</div>
          <p className="result-description">{getMbtiTypeInfo(result).description}</p>
          
          {/* 分析类型选择器 - 更改为图形化设计 */}
          <div className="analysis-tabs">
            <button 
              onClick={() => changeAnalysisType('basic')}
              className={`analysis-tab ${analysisType === 'basic' ? 'active' : ''}`}
            >
              <BsGraphUp size={24} style={{ marginBottom: '8px' }} />
              <div>{t('test.analysis.basic')}</div>
            </button>
            <button 
              onClick={() => changeAnalysisType('career')}
              className={`analysis-tab ${analysisType === 'career' ? 'active' : ''}`}
            >
              <BsBriefcase size={24} style={{ marginBottom: '8px' }} />
              <div>{t('test.analysis.career')}</div>
            </button>
            <button 
              onClick={() => changeAnalysisType('relationship')}
              className={`analysis-tab ${analysisType === 'relationship' ? 'active' : ''}`}
            >
              <BsPeople size={24} style={{ marginBottom: '8px' }} />
              <div>{t('test.analysis.relationship')}</div>
            </button>
          </div>
          
          <div className="flex gap-4 justify-center mt-8">
            <button 
              onClick={restartTest}
              className="btn-secondary"
            >
              {t('test.button.restart')}
            </button>
            <button 
              onClick={() => window.print()}
              className="btn-primary"
            >
              {t('test.button.print')}
            </button>
          </div>
        </div>
      );
    }
    
    // 如果正在加载结果
    if (loading) {
      return (
        <div className="loading-container">
          <div className="mb-4">{t('test.loading')}</div>
          <div className="w-12 h-12 border-4 border-solid border-t-transparent rounded-full animate-spin mx-auto" style={{ borderColor: 'var(--color-brand)', borderTopColor: 'transparent' }}></div>
        </div>
      );
    }
    
    // 渲染当前问题
    const currentQuestion = questions[currentStep];
    const progress = Math.round((currentStep / questions.length) * 100);
    
    return (
      <div className="question-container">
        <div className="progress-container">
          <div className="progress-info">
            <span>{t('test.progress.question')} {currentStep + 1}/{questions.length}</span>
            <span>{t('test.progress.completion')}: {progress}%</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-value" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        
        <h3 className="question-title">
          {currentQuestion.question || `问题 ${currentStep + 1} / ${questions.length}`}
        </h3>
        
        <div className="rating-options">
          {ratingOptions.map(option => (
            <button
              key={option.value}
              onClick={() => handleAnswer(currentQuestion.id, option.value)}
              className={`rating-button ${answers[currentQuestion.id] === option.value ? 'selected' : ''}`}
              aria-label={option.label}
            >
            </button>
          ))}
        </div>
        
        {currentStep > 0 && (
          <div className="flex justify-center">
            <button 
              onClick={goBack}
              className="btn-secondary"
            >
              {t('test.button.back')}
            </button>
          </div>
        )}
      </div>
    );
  };
  
  // 渲染结果分析
  const renderResults = () => {
    if (!result || !resultDetails) return null;
    
    const typeInfo = getMbtiTypeInfo(result);
    
    // 根据分析类型渲染不同内容
    switch (analysisType) {
      case 'basic':
        return (
          <div className="result-content">
            <h2 className="text-2xl font-bold mb-3">{t('result.yourType')}: {result} - {typeInfo.title}</h2>
            <p className="mb-4">{typeInfo.description}</p>
            
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">{t('result.dimensionAnalysis')}</h3>
              {Object.entries(resultDetails.dimensions).map(([dimension, preference]) => (
                <div key={dimension} className="mb-2">
                  <div className="flex justify-between mb-1">
                    <span>{dimension.split('-')[0]}</span>
                    <span>{Math.round(resultDetails.strengths[dimension as keyof typeof resultDetails.strengths])}%</span>
                    <span>{dimension.split('-')[1]}</span>
                  </div>
                  <div className="relative h-2 bg-gray-200 rounded">
                    <div 
                      className="absolute top-0 left-0 h-full bg-blue-500 rounded"
                      style={{ 
                        width: `${resultDetails.strengths[dimension as keyof typeof resultDetails.strengths]}%`,
                        left: preference === dimension.split('-')[0] ? '0' : 'auto',
                        right: preference === dimension.split('-')[1] ? '0' : 'auto'
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">{t('result.cognitiveFunction')}</h3>
              {cognitiveScores && resultDetails.functions?.map((func: CognitiveFunction, index: number) => (
                <div key={func} className="mb-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className={`inline-block w-6 h-6 rounded-full text-white text-center leading-6 mr-2 ${index < 2 ? 'bg-blue-600' : index < 4 ? 'bg-blue-400' : 'bg-gray-400'}`}>
                        {index + 1}
                      </span>
                      <span className="font-medium">{func} - {cognitiveFunctions[func].name}</span>
                    </div>
                    <span className={`text-sm px-2 py-1 rounded ${index < 2 ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}`}>
                      {index === 0 ? t('result.dominant') : 
                       index === 1 ? t('result.auxiliary') : 
                       index === 2 ? t('result.tertiary') : 
                       t('result.inferior')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{cognitiveFunctions[func].description}</p>
                  {cognitiveScores && (
                    <div className="mt-1 relative h-2 bg-gray-200 rounded">
                      <div 
                        className={`absolute top-0 left-0 h-full rounded ${index < 2 ? 'bg-blue-500' : index < 4 ? 'bg-blue-300' : 'bg-gray-400'}`}
                        style={{ 
                          width: `${Math.min(100, Math.max(0, (cognitiveScores[func] + 12) / 24 * 100))}%` 
                        }}
                      ></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-2">{t('result.personalityOverview')}</h3>
              <p className="mb-3">
                {t(`mbti.${result}.overview`) || t('result.overviewDefault')}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-bold mb-2">{t('result.strengths')}</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <li key={i}>
                        {t(`mbti.${result}.strengths.${i + 1}`) || t('result.dataNotAvailable')}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-bold mb-2">{t('result.challenges')}</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <li key={i}>
                        {t(`mbti.${result}.challenges.${i + 1}`) || t('result.dataNotAvailable')}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'career':
        return (
          <div className="result-content">
            <h2 className="text-2xl font-bold mb-3">{t('result.careerAnalysis')}: {result} - {typeInfo.title}</h2>
            
            {careerData ? (
              <>
                <div className="mb-5">
                  <h3 className="text-xl font-bold mb-2">{t('result.workEnvironment')}</h3>
                  <p>{careerData.workEnvironment}</p>
                </div>
                
                <div className="mb-5">
                  <h3 className="text-xl font-bold mb-2">{t('result.strengths')}</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {careerData.strengths.map((strength, index) => (
                      <li key={index}>{strength}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="mb-5">
                  <h3 className="text-xl font-bold mb-2">{t('result.teamRole')}</h3>
                  <p>{careerData.teamRole}</p>
                </div>
                
                <div className="mb-5">
                  <h3 className="text-xl font-bold mb-2">{t('result.leadershipStyle')}</h3>
                  <p>{careerData.leadershipStyle}</p>
                </div>
                
                <div className="mb-5">
                  <h3 className="text-xl font-bold mb-2">{t('result.challenges')}</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {careerData.challenges.map((challenge, index) => (
                      <li key={index}>{challenge}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="mb-5">
                  <h3 className="text-xl font-bold mb-2">{t('result.suitableCareers')}</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {careerData.suitableCareers.map((career, index) => (
                      <div key={index} className="bg-blue-50 p-2 rounded text-center">
                        {career}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-2">{t('result.recommendations')}</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {careerData.recommendations.map((rec, index) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              <p>{t('result.loadingCareerData')}</p>
            )}
          </div>
        );
        
      case 'relationship':
        return (
          <div className="result-content">
            <h2 className="text-2xl font-bold mb-3">{t('result.relationshipAnalysis')}: {result} - {typeInfo.title}</h2>
            
            <div className="mb-5">
              <h3 className="text-xl font-bold mb-2">{t('result.communicationStyle')}</h3>
              <p>{t(`mbti.${result}.communication`) || t('result.dataBeingPrepared')}</p>
            </div>
            
            <div className="mb-5">
              <h3 className="text-xl font-bold mb-2">{t('result.romanticRelationships')}</h3>
              <p>{t(`mbti.${result}.romantic`) || t('result.dataBeingPrepared')}</p>
            </div>
            
            <div className="mb-5">
              <h3 className="text-xl font-bold mb-2">{t('result.friendshipStyle')}</h3>
              <p>{t(`mbti.${result}.friendship`) || t('result.dataBeingPrepared')}</p>
            </div>
            
            <div className="mb-5">
              <h3 className="text-xl font-bold mb-2">{t('result.parentingStyle')}</h3>
              <p>{t(`mbti.${result}.parenting`) || t('result.dataBeingPrepared')}</p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-2">{t('result.bestMatches')}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
                {getCompatibleTypes(result).map((type: string) => (
                  <div key={type} className="bg-green-50 p-3 rounded-lg text-center">
                    <div className="font-bold">{type}</div>
                    <div className="text-sm">{getMbtiTypeInfo(type).title}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div id="test" className="test-container">
      <div className="test-header">
        <h2>{t('test.header.title')}</h2>
        {/* <p>{t('test.header.description')}</p> */}
      </div>
      {renderTestStage()}
      {renderResults()}
    </div>
  );
} 