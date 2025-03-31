// MBTI类型职场分析数据
// 每种类型包括：职业优势、工作环境偏好、团队角色、领导风格、职业挑战与建议、适合的职业方向

export type CareerAnalysis = {
  strengths: string[];  // 职场优势
  workEnvironment: string;  // 理想工作环境
  teamRole: string;  // 团队中的角色
  leadershipStyle: string;  // 领导风格
  challenges: string[];  // 职场挑战
  recommendations: string[];  // 职业发展建议
  suitableCareers: string[];  // 适合的职业方向
};

// 用于类型安全的MBTI类型列表
export type MBTIType = 'INTJ' | 'INTP' | 'ENTJ' | 'ENTP' | 'INFJ' | 'INFP' | 'ENFJ' | 'ENFP' | 
                       'ISTJ' | 'ISFJ' | 'ESTJ' | 'ESFJ' | 'ISTP' | 'ISFP' | 'ESTP' | 'ESFP';

// 导出获取职场分析的函数
export function getCareerAnalysis(mbtiType: string): CareerAnalysis | null {
  // 确保类型代码格式化为大写
  const formattedType = mbtiType.toUpperCase() as MBTIType;
  
  // 为不同的MBTI类型创建职业分析数据
  // 这里只返回基本结构，具体文本内容将通过LanguageContext的t函数处理
  const typeMap: Record<MBTIType, boolean> = {
    'INTJ': true,
    'INTP': true,
    'ENTJ': true,
    'ENTP': true,
    'INFJ': true,
    'INFP': true,
    'ENFJ': true,
    'ENFP': true,
    'ISTJ': true,
    'ISFJ': true,
    'ESTJ': true,
    'ESFJ': true,
    'ISTP': true,
    'ISFP': true,
    'ESTP': true,
    'ESFP': true
  };
  
  // 检查是否是有效的MBTI类型
  if (formattedType in typeMap) {
    // 返回数据结构，具体文本将在组件中通过t函数填充
    return {
      strengths: [
        `career.${formattedType}.strength.1`,
        `career.${formattedType}.strength.2`,
        `career.${formattedType}.strength.3`,
        `career.${formattedType}.strength.4`,
        `career.${formattedType}.strength.5`
      ],
      workEnvironment: `career.${formattedType}.workEnvironment`,
      teamRole: `career.${formattedType}.teamRole`,
      leadershipStyle: `career.${formattedType}.leadershipStyle`,
      challenges: [
        `career.${formattedType}.challenge.1`,
        `career.${formattedType}.challenge.2`,
        `career.${formattedType}.challenge.3`
      ],
      recommendations: [
        `career.${formattedType}.recommendation.1`,
        `career.${formattedType}.recommendation.2`,
        `career.${formattedType}.recommendation.3`
      ],
      suitableCareers: [
        `career.${formattedType}.career.1`,
        `career.${formattedType}.career.2`,
        `career.${formattedType}.career.3`,
        `career.${formattedType}.career.4`,
        `career.${formattedType}.career.5`
      ]
    };
  }
  
  // 如果类型暂不可用，返回null
  return null;
} 