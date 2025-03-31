'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// 定义支持的语言类型
export type Language = 'zh' | 'en';

// 上下文接口
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// 创建上下文
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// 中英文翻译对照表
const translations: Record<string, Record<Language, string>> = {
  // Hero组件文本
  'hero.title': {
    zh: 'AI驱动的MBTI性格分析，',
    en: 'AI-Powered MBTI Personality Analysis,'
  },
  'hero.titleAccent': {
    zh: '精准识别你的性格特质与潜能',
    en: 'Accurately Identify Your Personality Traits and Potential'
  },
  'hero.description': {
    zh: '基于精确算法，帮助你找到最合适的职业发展路径和人际关系模式',
    en: 'Based on precise algorithms to help you find the most suitable career path and relationship patterns'
  },
  'hero.startTest': {
    zh: '开始测试',
    en: 'Start Test'
  },
  'hero.learnMore': {
    zh: '了解更多',
    en: 'Learn More'
  },
  'hero.userCount': {
    zh: '已有超过',
    en: 'Over'
  },
  'hero.userCountSuffix': {
    zh: '用户通过我们的测试找到自我',
    en: 'users have found themselves through our test'
  },
  
  // 语言选择器
  'language.chinese': {
    zh: '中文',
    en: 'Chinese'
  },
  'language.english': {
    zh: '英文 (English)',
    en: 'English'
  },
  'language.japanese': {
    zh: '日文 (日本語)',
    en: 'Japanese (日本語)'
  },
  'language.spanish': {
    zh: '西班牙文 (Español)',
    en: 'Spanish (Español)'
  },
  'language.french': {
    zh: '法文 (Français)',
    en: 'French (Français)'
  },
  'language.german': {
    zh: '德文 (Deutsch)',
    en: 'German (Deutsch)'
  },
  'language.korean': {
    zh: '韩文 (한국어)',
    en: 'Korean (한국어)'
  },
  'language.russian': {
    zh: '俄文 (Русский)',
    en: 'Russian (Русский)'
  },
  
  // Header组件文本
  'header.home': {
    zh: '首页',
    en: 'Home'
  },
  'header.features': {
    zh: '功能特点',
    en: 'Features'
  },
  'header.startTest': {
    zh: '开始测试',
    en: 'Start Test'
  },
  'header.pricing': {
    zh: '价格方案',
    en: 'Pricing'
  },
  'header.faq': {
    zh: '常见问题',
    en: 'FAQ'
  },
  'header.ctaButton': {
    zh: '立即测试',
    en: 'Take Test Now'
  },
  
  // 测试组件文本
  'test.header.title': {
    zh: 'AI 驱动的 MBTI 性格测试',
    en: 'AI-Powered MBTI Personality Test'
  },
  'test.header.description': {
    zh: '基于精确算法，提供专业的心理分析与职业匹配建议',
    en: 'Based on precise algorithms, providing professional psychological analysis and career matching recommendations'
  },
  
  // 测试进度
  'test.progress.question': {
    zh: '问题',
    en: 'Question'
  },
  'test.progress.completion': {
    zh: '完成度',
    en: 'Completion'
  },
  
  // 评分选项
  'test.rating.stronglyDisagree': {
    zh: '强烈不同意',
    en: 'Strongly Disagree'
  },
  'test.rating.disagree': {
    zh: '不同意',
    en: 'Disagree'
  },
  'test.rating.slightlyDisagree': {
    zh: '略不同意',
    en: 'Slightly Disagree'
  },
  'test.rating.neutral': {
    zh: '中立',
    en: 'Neutral'
  },
  'test.rating.slightlyAgree': {
    zh: '略同意',
    en: 'Slightly Agree'
  },
  'test.rating.agree': {
    zh: '同意',
    en: 'Agree'
  },
  'test.rating.stronglyAgree': {
    zh: '强烈同意',
    en: 'Strongly Agree'
  },
  
  // 按钮
  'test.button.back': {
    zh: '返回上一题',
    en: 'Back'
  },
  'test.button.restart': {
    zh: '重新测试',
    en: 'Restart Test'
  },
  'test.button.print': {
    zh: '打印结果',
    en: 'Print Results'
  },
  
  // 分析选项卡
  'test.analysis.basic': {
    zh: '基础分析',
    en: 'Basic Analysis'
  },
  'test.analysis.career': {
    zh: '职场分析',
    en: 'Career Analysis'
  },
  'test.analysis.relationship': {
    zh: '关系分析',
    en: 'Relationship Analysis'
  },
  
  // 结果页
  'test.result.yourPreference': {
    zh: '您的偏好强度',
    en: 'Your Preference Strength'
  },
  'test.result.basicInfo': {
    zh: '您的MBTI类型是',
    en: 'Your MBTI type is'
  },
  'test.result.description': {
    zh: '，代表着独特的思维方式和行为模式。要查看更详细的职场分析或关系分析，请点击上方对应的选项卡。',
    en: ', representing a unique thinking style and behavioral pattern. To view more detailed career or relationship analysis, please click on the corresponding tab above.'
  },
  
  // 加载中
  'test.loading': {
    zh: '分析您的答案中...',
    en: 'Analyzing your answers...'
  },
  
  // 职场分析
  'test.career.loading': {
    zh: '正在加载职场分析...',
    en: 'Loading career analysis...'
  },
  'test.relationship.developing': {
    zh: '关系分析模块正在开发中，敬请期待...',
    en: 'Relationship analysis module is under development, stay tuned...'
  },
  
  // MBTI英文问题翻译 - 仅保存每个维度的前两个问题作为示例
  'test.question.1': {
    zh: '在朋友聚会或同学聚餐时，我通常愿意主动引导话题并分享自己的经历。',
    en: 'At gatherings with friends or classmates, I usually take the initiative to guide the conversation and share my experiences.'
  },
  'test.question.2': {
    zh: '我更享受与一两个知己长谈，而不是参加热闹的社交活动。',
    en: 'I enjoy having deep conversations with one or two close friends rather than attending lively social events.'
  },
  'test.question.8': {
    zh: '处理工作或学习任务时，我更注重实际操作和具体细节，而非创新思路和概念。',
    en: 'When handling work or study tasks, I focus more on practical operations and specific details rather than innovative ideas and concepts.'
  },
  'test.question.9': {
    zh: '我常常会联想事物之间不明显的关联，发现他人容易忽略的可能性。',
    en: 'I often see connections between things that aren\'t obvious and discover possibilities that others might overlook.'
  },
  'test.question.15': {
    zh: '在团队分工或家庭决策中，我倾向于基于逻辑和效率做决定，而非考虑每个人的感受。',
    en: 'In team assignments or family decisions, I tend to make decisions based on logic and efficiency rather than considering everyone\'s feelings.'
  },
  'test.question.16': {
    zh: '我能敏锐察觉到他人情绪的细微变化，并自然地表达关心。',
    en: 'I can keenly detect subtle changes in others\' emotions and naturally express concern.'
  },
  'test.question.22': {
    zh: '我习惯提前规划行程安排，例如旅行计划、学习计划或工作日程。',
    en: 'I am accustomed to planning my schedule in advance, such as travel plans, study plans, or work schedules.'
  },
  'test.question.23': {
    zh: '我喜欢保持选择的开放性，根据情况随时调整计划和安排。',
    en: 'I like to keep my options open and adjust plans and arrangements according to circumstances.'
  },
  
  // MBTI 类型名称和描述
  'mbti.INTJ.title': {
    zh: '建筑师',
    en: 'Architect'
  },
  'mbti.INTJ.description': {
    zh: '战略性思考者，具有独特的洞察力和创新能力',
    en: 'Strategic thinker with unique insight and innovative capability'
  },
  'mbti.INTP.title': {
    zh: '逻辑学家',
    en: 'Logician'
  },
  'mbti.INTP.description': {
    zh: '创新的思想家，知识的探索者，善于发现复杂问题的解决方案',
    en: 'Innovative thinker, explorer of knowledge, adept at finding solutions to complex problems'
  },
  'mbti.ENTJ.title': {
    zh: '指挥官',
    en: 'Commander'
  },
  'mbti.ENTJ.description': {
    zh: '果断的领导者，善于规划和决策，追求高效和成功',
    en: 'Decisive leader, good at planning and decision-making, pursuing efficiency and success'
  },
  'mbti.ENTP.title': {
    zh: '辩论家',
    en: 'Debater'
  },
  'mbti.ENTP.description': {
    zh: '机智灵活的思想家，喜欢智力挑战和创新想法',
    en: 'Quick-witted flexible thinker who enjoys intellectual challenges and innovative ideas'
  },
  'mbti.INFJ.title': {
    zh: '提倡者',
    en: 'Advocate'
  },
  'mbti.INFJ.description': {
    zh: '理想主义者，有强烈的个人信念，致力于帮助他人',
    en: 'Idealist with strong personal beliefs, dedicated to helping others'
  },
  'mbti.INFP.title': {
    zh: '调停者',
    en: 'Mediator'
  },
  'mbti.INFP.description': {
    zh: '富有同情心的理想主义者，看重个人价值和内在和谐',
    en: 'Compassionate idealist who values personal virtues and inner harmony'
  },
  'mbti.ENFJ.title': {
    zh: '主人公',
    en: 'Protagonist'
  },
  'mbti.ENFJ.description': {
    zh: '富有魅力的协调者，能鼓舞他人，致力于积极影响',
    en: 'Charismatic coordinator who can inspire others, committed to making a positive impact'
  },
  'mbti.ENFP.title': {
    zh: '探险家',
    en: 'Campaigner'
  },
  'mbti.ENFP.description': {
    zh: '热情洋溢的创新者，总能看到可能性，渴望帮助他人成长',
    en: 'Enthusiastic innovator who always sees possibilities and desires to help others grow'
  },
  'mbti.ISTJ.title': {
    zh: '物流师',
    en: 'Logistician'
  },
  'mbti.ISTJ.description': {
    zh: '实际可靠的组织者，注重细节和秩序，重视传统和忠诚',
    en: 'Practical and reliable organizer who focuses on details and order, values tradition and loyalty'
  },
  'mbti.ISFJ.title': {
    zh: '守卫者',
    en: 'Defender'
  },
  'mbti.ISFJ.description': {
    zh: '尽职尽责的保护者，愿意付出努力帮助他人，注重稳定',
    en: 'Dedicated protector who is willing to make efforts to help others, values stability'
  },
  'mbti.ESTJ.title': {
    zh: '总经理',
    en: 'Executive'
  },
  'mbti.ESTJ.description': {
    zh: '高效的管理者，重视秩序和规则，思维条理清晰',
    en: 'Efficient manager who values order and rules, thinks clearly and systematically'
  },
  'mbti.ESFJ.title': {
    zh: '执政官',
    en: 'Consul'
  },
  'mbti.ESFJ.description': {
    zh: '热心的合作者，关注他人需求，重视和谐与责任',
    en: 'Warm-hearted collaborator who cares about others\' needs, values harmony and responsibility'
  },
  'mbti.ISTP.title': {
    zh: '鉴赏家',
    en: 'Virtuoso'
  },
  'mbti.ISTP.description': {
    zh: '灵活的分析者，善于利用工具解决实际问题，喜欢探索',
    en: 'Flexible analyst who is good at using tools to solve practical problems, enjoys exploration'
  },
  'mbti.ISFP.title': {
    zh: '冒险家',
    en: 'Adventurer'
  },
  'mbti.ISFP.description': {
    zh: '灵活善变的艺术家，以自己的方式欣赏美，追求和平',
    en: 'Flexible and versatile artist who appreciates beauty in their own way, pursues peace'
  },
  'mbti.ESTP.title': {
    zh: '企业家',
    en: 'Entrepreneur'
  },
  'mbti.ESTP.description': {
    zh: '活力四射的问题解决者，喜欢冒险和实际体验',
    en: 'Energetic problem-solver who enjoys adventure and practical experiences'
  },
  'mbti.ESFP.title': {
    zh: '表演者',
    en: 'Entertainer'
  },
  'mbti.ESFP.description': {
    zh: '自发友好的娱乐者，喜欢与他人互动，享受当下',
    en: 'Spontaneous and friendly entertainer who enjoys interacting with others and living in the moment'
  },
  
  // 职业分析组件文本
  'career.title': {
    zh: '职业发展路径',
    en: 'Career Development Path'
  },
  'career.traits': {
    zh: '影响力特质',
    en: 'Influential Traits'
  },
  'career.workAndTeam': {
    zh: '工作环境与团队角色',
    en: 'Work Environment & Team Role'
  },
  'career.strengths': {
    zh: '你的优势',
    en: 'Your Strengths'
  },
  'career.recommendedCareers': {
    zh: '推荐职业方向',
    en: 'Recommended Career Paths'
  },
  
  // 工作环境详情
  'career.idealWorkEnvironment': {
    zh: '理想工作环境',
    en: 'Ideal Work Environment'
  },
  'career.teamRole': {
    zh: '团队中的角色',
    en: 'Team Role'
  },
  'career.leadershipStyle': {
    zh: '领导风格',
    en: 'Leadership Style'
  },
  
  // 性格特质
  'career.trait.perfectionism': {
    zh: '完美主义',
    en: 'Perfectionism'
  },
  'career.trait.ambition': {
    zh: '野心',
    en: 'Ambition'
  },
  'career.trait.motivation': {
    zh: '动力',
    en: 'Motivation'
  },
  'career.trait.leadership': {
    zh: '领导欲望',
    en: 'Leadership Desire'
  },
  
  // 优势标题
  'career.strength.problemSolving': {
    zh: '实用问题解决',
    en: 'Practical Problem Solving'
  },
  'career.strength.adaptiveThinking': {
    zh: '适应性思维',
    en: 'Adaptive Thinking'
  },
  'career.strength.strategicPlanning': {
    zh: '战略规划',
    en: 'Strategic Planning'
  },
  'career.strength.systemAnalysis': {
    zh: '系统分析',
    en: 'System Analysis'
  },
  'career.strength.innovativeThinking': {
    zh: '创新思考',
    en: 'Innovative Thinking'
  },
  'career.strength.decisionMaking': {
    zh: '决策能力',
    en: 'Decision Making'
  },
  'career.strength.teamwork': {
    zh: '团队协作',
    en: 'Teamwork'
  },
  'career.strength.leadership': {
    zh: '领导影响力',
    en: 'Leadership Influence'
  },
  
  // 职业描述
  'career.description.INTJ.1': {
    zh: '在你的职业生涯中，你在需要战略思考和系统分析的环境中表现最佳。',
    en: 'In your career, you perform best in environments that require strategic thinking and systematic analysis.'
  },
  'career.description.INTJ.2': {
    zh: '你天生具备理解复杂系统的能力，这使你成为解决棘手问题的宝贵人才。你在需要深入思考和创新解决方案的角色中表现突出，通常成为团队中的战略规划者。',
    en: 'You naturally possess the ability to understand complex systems, making you a valuable asset for solving challenging problems. You excel in roles that require deep thinking and innovative solutions, often becoming the strategic planner in your team.'
  },
  'career.description.INTJ.3': {
    zh: '然而，你对自主性的强烈渴望可能使传统办公环境变得具有挑战性，你可能会发现自己在过于程序化或缺乏创新的角色中感到不满。你理想的职业应当允许你应用你的分析能力，在动态环境中解决复杂问题，并提供一定程度的独立性。',
    en: 'However, your strong desire for autonomy may make traditional office environments challenging, and you might find yourself dissatisfied in roles that are overly procedural or lack innovation. Your ideal career should allow you to apply your analytical abilities, solve complex problems in a dynamic environment, and provide a degree of independence.'
  },
  
  'career.description.INTP.1': {
    zh: '在你的职业生涯中，你在提供动手实践和切实成果的环境中茁壮成长。',
    en: 'In your career, you thrive in environments that provide hands-on practice and tangible results.'
  },
  'career.description.INTP.2': {
    zh: '你理解复杂系统的天赋使你成为各个领域不可或缺的问题解决者，从机械到计算机科学。你在需要快速思考和实用解决方案的角色中表现出色，经常成为危机情况中的首选人选。',
    en: 'Your gift for understanding complex systems makes you an indispensable problem solver in various fields, from mechanics to computer science. You excel in roles that require quick thinking and practical solutions, often becoming the go-to person in crisis situations.'
  },
  'career.description.INTP.3': {
    zh: '然而，你对自主性的强烈渴望可能使传统办公环境变得具有挑战性，你可能会发现自己在过于程序化或抽象理论化的角色中感到不安。你理想的职业允许你在动态、不断变化的情境中应用你的技能，提供自由地用你独特的方式处理任务的机会。',
    en: 'However, your strong desire for autonomy may make traditional office environments challenging, and you might find yourself uncomfortable in roles that are overly procedural or abstractly theoretical. Your ideal career allows you to apply your skills in dynamic, ever-changing contexts, offering the freedom to tackle tasks in your unique way.'
  },
  
  'career.description.default.1': {
    zh: '在你的职业生涯中，你在能够充分发挥你独特能力和兴趣的环境中表现最佳。',
    en: 'In your career, you perform best in environments where you can fully utilize your unique abilities and interests.'
  },
  'career.description.default.2': {
    zh: '你的天赋和技能使你能够在特定领域做出重要贡献。你可能在需要你核心优势的角色中表现突出，并能在团队中发挥重要作用。',
    en: 'Your talents and skills enable you to make significant contributions in specific areas. You likely excel in roles that require your core strengths and can play important roles within a team.'
  },
  'career.description.default.3': {
    zh: '理想的职业道路应当与你的价值观一致，提供适当的挑战，并允许你持续成长和发展你的技能。寻找能欣赏你独特贡献的环境至关重要。',
    en: 'The ideal career path should align with your values, provide appropriate challenges, and allow you to continuously grow and develop your skills. Finding environments that appreciate your unique contributions is essential.'
  }
};

// Provider组件
export function LanguageProvider({ children }: { children: ReactNode }) {
  // 从localStorage获取初始语言设置，如果没有则默认为中文
  const [language, setLanguage] = useState<Language>('zh');
  
  // 页面加载时从localStorage获取语言设置
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'zh' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }
  }, []);
  
  // 更改语言并保存到localStorage
  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };
  
  // 翻译函数
  const translate = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    return translations[key][language] || key;
  };
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t: translate }}>
      {children}
    </LanguageContext.Provider>
  );
}

// 使用上下文的Hook
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 