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
    zh: 'MBTI性格测试',
    en: 'MBTI Personality Test'
  },
  'hero.titleAccent': {
    zh: '了解你的性格类型',
    en: 'Discover Your Personality Type'
  },
  'hero.description': {
    zh: '通过回答32个精心设计的问题，了解你的MBTI人格类型。这个测试将帮助你更好地理解自己的思维方式、行为模式和人际关系风格。',
    en: 'Answer 32 carefully designed questions to discover your MBTI personality type. This test will help you better understand your thinking style, behavior patterns, and interpersonal dynamics.'
  },
  'hero.startTest': {
    zh: '开始测试',
    en: 'Start The Test'
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
  'header.language': {
    zh: '语言',
    en: 'Language'
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
  
  // 结果分析相关
  'result.yourType': {
    zh: '您的性格类型',
    en: 'Your Personality Type'
  },
  'result.careerAnalysis': {
    zh: '职业分析',
    en: 'Career Analysis'
  },
  'result.workEnvironment': {
    zh: '理想工作环境',
    en: 'Ideal Work Environment'
  },
  'result.teamRole': {
    zh: '团队角色',
    en: 'Team Role'
  },
  'result.leadershipStyle': {
    zh: '领导风格',
    en: 'Leadership Style'
  },
  'result.strengths': {
    zh: '优势特点',
    en: 'Strengths'
  },
  'result.challenges': {
    zh: '面临挑战',
    en: 'Challenges'
  },
  'result.suitableCareers': {
    zh: '适合的职业',
    en: 'Suitable Careers'
  },
  'result.recommendations': {
    zh: '职业发展建议',
    en: 'Career Development Suggestions'
  },
  'result.loadingCareerData': {
    zh: '正在加载职场分析数据...',
    en: 'Loading career analysis data...'
  },
  'result.relationshipAnalysis': {
    zh: '关系分析',
    en: 'Relationship Analysis'
  },
  'result.communicationStyle': {
    zh: '沟通风格',
    en: 'Communication Style'
  },
  'result.romanticRelationships': {
    zh: '恋爱关系',
    en: 'Romantic Relationships'
  },
  'result.friendshipStyle': {
    zh: '友谊风格',
    en: 'Friendship Style'
  },
  'result.parentingStyle': {
    zh: '养育风格',
    en: 'Parenting Style'
  },
  'result.bestMatches': {
    zh: '最佳匹配类型',
    en: 'Best Type Matches'
  },
  'result.dimensionAnalysis': {
    zh: '维度分析',
    en: 'Dimension Analysis'
  },
  'result.personalityOverview': {
    zh: '个性概览',
    en: 'Personality Overview'
  },
  'result.cognitiveFunction': {
    zh: '认知功能',
    en: 'Cognitive Functions'
  },
  'result.dominant': {
    zh: '主导',
    en: 'Dominant'
  },
  'result.auxiliary': {
    zh: '辅助',
    en: 'Auxiliary'
  },
  'result.tertiary': {
    zh: '第三',
    en: 'Tertiary'
  },
  'result.inferior': {
    zh: '劣势',
    en: 'Inferior'
  },
  'result.overviewDefault': {
    zh: '这种性格类型具有独特的思维和行为模式，影响着他们的人际互动和工作风格。',
    en: 'This personality type has unique thinking and behavioral patterns that influence their interpersonal interactions and work style.'
  },
  'result.dataNotAvailable': {
    zh: '详细数据正在准备中',
    en: 'Detailed data is being prepared'
  },
  'result.dataBeingPrepared': {
    zh: '此内容正在完善中，敬请期待更新。',
    en: 'This content is being refined, please look forward to updates.'
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
  },

  // INTJ职业分析详情
  'career.INTJ.strength.1': {
    zh: '战略性思维，能够看到长远发展并制定全面计划',
    en: 'Strategic thinking, ability to see long-term development and formulate comprehensive plans'
  },
  'career.INTJ.strength.2': {
    zh: '独立解决复杂问题的能力，擅长系统分析',
    en: 'Ability to independently solve complex problems, excels at system analysis'
  },
  'career.INTJ.strength.3': {
    zh: '持续追求专业知识和自我提升',
    en: 'Continuous pursuit of professional knowledge and self-improvement'
  },
  'career.INTJ.strength.4': {
    zh: '高标准和自驱力，对工作结果精益求精',
    en: 'High standards and self-motivation, striving for excellence in work outcomes'
  },
  'career.INTJ.strength.5': {
    zh: '创新思维，能提出独特的解决方案',
    en: 'Innovative thinking, ability to propose unique solutions'
  },
  'career.INTJ.workEnvironment': {
    zh: 'INTJ在允许独立工作、重视专业能力、提供智力挑战且干扰最小化的环境中表现最佳。他们偏好有明确目标但执行方式灵活的工作模式，以及能与其他聪明、能干的同事合作的环境。理想的工作场所应当以结果为导向，而非过度管理或充斥繁文缛节。',
    en: 'INTJs perform best in environments that allow independent work, value professional competence, provide intellectual challenges, and minimize distractions. They prefer work modes with clear goals but flexible execution methods, and environments where they can collaborate with other intelligent, capable colleagues. The ideal workplace should be results-oriented rather than over-managed or full of bureaucracy.'
  },
  'career.INTJ.teamRole': {
    zh: 'INTJ通常在团队中扮演战略规划者和系统架构师的角色。他们擅长确定长期方向，发现问题中的核心模式，并设计完整解决方案。虽然不常主动寻求领导位置，但当涉及复杂项目或需要转型变革时，他们往往成为团队的智囊和权威顾问。',
    en: 'INTJs typically play the role of strategic planners and system architects in teams. They excel at determining long-term directions, identifying core patterns in problems, and designing complete solutions. Though they don\'t often actively seek leadership positions, they tend to become the think tanks and authoritative advisors of teams when complex projects or transformational changes are involved.'
  },
  'career.INTJ.leadershipStyle': {
    zh: '作为领导者，INTJ采用远见卓识型领导风格，专注于设定清晰愿景和制定有效策略。他们基于能力分配任务，重视结果而非过程，对团队成员保持高标准期望。他们的领导特点是决策理性、目标明确、善于授权给有能力的下属，但可能在人际关系管理和情感支持方面需要有意识地投入更多精力。',
    en: 'As leaders, INTJs adopt a visionary leadership style, focusing on setting clear visions and developing effective strategies. They allocate tasks based on capability, value results over process, and maintain high-standard expectations for team members. Their leadership is characterized by rational decision-making, clear goals, and effective delegation to capable subordinates, though they may need to consciously invest more effort in interpersonal relationship management and emotional support.'
  },
  'career.INTJ.challenge.1': {
    zh: '可能被视为过于直接或批判性，伤害同事感受',
    en: 'May be seen as too direct or critical, hurting colleagues\' feelings'
  },
  'career.INTJ.challenge.2': {
    zh: '在沟通和协作需求高的环境中可能感到不适',
    en: 'May feel uncomfortable in environments with high communication and collaboration needs'
  },
  'career.INTJ.challenge.3': {
    zh: '有时过于专注理论和概念，忽视实际操作细节',
    en: 'Sometimes too focused on theory and concepts, neglecting practical operational details'
  },
  'career.INTJ.recommendation.1': {
    zh: '培养情商和人际沟通技巧，学习更外交的表达方式',
    en: 'Develop emotional intelligence and interpersonal communication skills, learn more diplomatic ways of expression'
  },
  'career.INTJ.recommendation.2': {
    zh: '主动寻求跨职能合作机会，拓展视角并提升团队协作能力',
    en: 'Actively seek cross-functional collaboration opportunities to broaden perspectives and enhance teamwork abilities'
  },
  'career.INTJ.recommendation.3': {
    zh: '建立配套的执行系统，确保战略落地转化为实际行动',
    en: 'Establish supporting execution systems to ensure strategies are transformed into actual actions'
  },
  'career.INTJ.career.1': {
    zh: '战略咨询顾问',
    en: 'Strategic Consulting Advisor'
  },
  'career.INTJ.career.2': {
    zh: '系统架构师',
    en: 'System Architect'
  },
  'career.INTJ.career.3': {
    zh: '数据科学家',
    en: 'Data Scientist'
  },
  'career.INTJ.career.4': {
    zh: '投资分析师',
    en: 'Investment Analyst'
  },
  'career.INTJ.career.5': {
    zh: '科研工作者',
    en: 'Research Scientist'
  },

  // INTP职业分析详情
  'career.INTP.strength.1': {
    zh: '深刻的分析思维和解决问题的能力',
    en: 'Profound analytical thinking and problem-solving abilities'
  },
  'career.INTP.strength.2': {
    zh: '创新型思考，能提出独特而有创造性的解决方案',
    en: 'Innovative thinking, able to propose unique and creative solutions'
  },
  'career.INTP.strength.3': {
    zh: '强大的逻辑推理能力，能够发现系统中的缺陷',
    en: 'Strong logical reasoning ability, capable of identifying flaws in systems'
  },
  'career.INTP.strength.4': {
    zh: '对于复杂理论和抽象概念有深入理解',
    en: 'Deep understanding of complex theories and abstract concepts'
  },
  'career.INTP.strength.5': {
    zh: '持续学习的内在动力，不断扩展知识面',
    en: 'Internal drive for continuous learning, constantly expanding knowledge base'
  },
  'career.INTP.workEnvironment': {
    zh: 'INTP在能够独立工作、有高度智力自由度、问题复杂且挑战性强的环境中表现最佳。他们偏好弹性工作安排，较少的官僚结构和重复性任务，以及能够与其他聪明且注重想法的同事进行深度交流的环境。理想的工作场所应当鼓励创新和理论探索，对结果而非工作方式进行评估。',
    en: 'INTPs perform best in environments where they can work independently, have high intellectual freedom, and face complex and challenging problems. They prefer flexible work arrangements, less bureaucratic structures and repetitive tasks, and environments where they can engage in deep exchanges with other intelligent, idea-oriented colleagues. The ideal workplace should encourage innovation and theoretical exploration, evaluating results rather than work methods.'
  },
  'career.INTP.teamRole': {
    zh: 'INTP在团队中通常扮演概念设计师和问题解决者的角色。他们善于挑战既有假设，提出创新性解决方案，并在复杂问题面前保持冷静分析。虽然不倾向于主导团队讨论，但当遇到需要深度分析或创新思维的问题时，他们的贡献往往极具价值。',
    en: 'INTPs typically play the role of concept designers and problem solvers in teams. They are good at challenging existing assumptions, proposing innovative solutions, and maintaining calm analysis in the face of complex problems. While they don\'t tend to dominate team discussions, their contributions are often highly valuable when facing issues that require deep analysis or innovative thinking.'
  },
  'career.INTP.leadershipStyle': {
    zh: '作为领导者，INTP采用思想引领型的领导风格，专注于创新和概念发展。他们赋予团队成员高度自主权，相信能力并促进智力发展。INTP领导通常建立扁平化组织结构，决策基于逻辑而非职位权威，并鼓励开放讨论和概念探索。他们可能更专注于开发系统和解决方案，而非日常管理。',
    en: 'As leaders, INTPs adopt a thought-leadership style, focusing on innovation and concept development. They grant team members high autonomy, trust in capabilities, and promote intellectual development. INTP leaders typically establish flat organizational structures, make decisions based on logic rather than positional authority, and encourage open discussion and conceptual exploration. They may focus more on developing systems and solutions rather than daily management.'
  },
  'career.INTP.challenge.1': {
    zh: '可能忽视细节和日常运营事务',
    en: 'May neglect details and daily operational matters'
  },
  'career.INTP.challenge.2': {
    zh: '在需要频繁社交互动的环境中感到耗能',
    en: 'May feel drained in environments requiring frequent social interactions'
  },
  'career.INTP.challenge.3': {
    zh: '可能难以将概念转化为可操作的具体步骤',
    en: 'May find it difficult to transform concepts into actionable concrete steps'
  },
  'career.INTP.recommendation.1': {
    zh: '发展项目管理和时间管理技能，将概念转化为可执行计划',
    en: 'Develop project management and time management skills to transform concepts into executable plans'
  },
  'career.INTP.recommendation.2': {
    zh: '学习有效委派和团队协作技巧，弥补执行力方面的不足',
    en: 'Learn effective delegation and team collaboration skills to compensate for execution deficiencies'
  },
  'career.INTP.recommendation.3': {
    zh: '培养更有效的沟通能力，特别是将复杂概念转化为他人易于理解的方式',
    en: 'Cultivate more effective communication skills, especially in translating complex concepts into ways that others can easily understand'
  },
  'career.INTP.career.1': {
    zh: '软件工程师/开发人员',
    en: 'Software Engineer/Developer'
  },
  'career.INTP.career.2': {
    zh: '研究科学家',
    en: 'Research Scientist'
  },
  'career.INTP.career.3': {
    zh: '数据分析师',
    en: 'Data Analyst'
  },
  'career.INTP.career.4': {
    zh: '系统分析师',
    en: 'Systems Analyst'
  },
  'career.INTP.career.5': {
    zh: '程序员',
    en: 'Programmer'
  },

  // INFJ职业分析详情
  'career.INFJ.strength.1': {
    zh: '出色的洞察力，能深入理解人和组织的动态',
    en: 'Excellent insight, able to deeply understand the dynamics of people and organizations'
  },
  'career.INFJ.strength.2': {
    zh: '长远规划能力，注重行动的意义和影响',
    en: 'Long-term planning ability, focusing on the meaning and impact of actions'
  },
  'career.INFJ.strength.3': {
    zh: '强烈的同理心和人际敏感度',
    en: 'Strong empathy and interpersonal sensitivity'
  },
  'career.INFJ.strength.4': {
    zh: '创造性问题解决能力，特别是涉及人的问题',
    en: 'Creative problem-solving ability, especially for issues involving people'
  },
  'career.INFJ.strength.5': {
    zh: '高度责任感和道德标准，工作认真负责',
    en: 'High sense of responsibility and moral standards, diligent and responsible in work'
  },
  'career.INFJ.workEnvironment': {
    zh: 'INFJ在有明确使命感、价值观驱动、关注人员发展且氛围和谐的环境中表现最佳。他们偏好能够进行深度专注工作、减少冲突与办公室政治，以及能够对他人产生积极影响的工作场所。理想的工作环境应当平衡独立工作与有意义的协作，并与个人价值观相符。',
    en: 'INFJs perform best in environments with a clear sense of mission, driven by values, focused on personnel development, and with a harmonious atmosphere. They prefer workplaces that allow for deep, focused work, minimize conflict and office politics, and enable them to have a positive impact on others. The ideal work environment should balance independent work with meaningful collaboration and align with personal values.'
  },
  'career.INFJ.teamRole': {
    zh: 'INFJ在团队中通常扮演调和者和远见者的角色。他们善于鼓舞团队围绕共同愿景团结，促进团队和谐，同时保持对长期目标的关注。INFJ特别擅长识别团队中的潜在问题和冲突，并在问题扩大前予以解决。他们往往是团队成员寻求个人建议和情感支持的对象。',
    en: 'INFJs typically play the role of harmonizers and visionaries in teams. They are good at inspiring teams to unite around a common vision, promoting team harmony while maintaining focus on long-term goals. INFJs are particularly skilled at identifying potential problems and conflicts within teams and resolving them before they escalate. They often become the go-to person for team members seeking personal advice and emotional support.'
  },
  'career.INFJ.leadershipStyle': {
    zh: '作为领导者，INFJ采用变革引导型领导风格，专注于创造有意义的变化和发展团队成员潜能。他们通过共同愿景和价值观激励他人，重视真诚沟通和团队成员个体需求。INFJ领导通常以身作则，而非通过指令领导，并能在组织变革中敏锐把握人的因素。他们特别擅长激发团队成员内在动力而非外部压力。',
    en: 'As leaders, INFJs adopt a transformational leadership style, focusing on creating meaningful change and developing team members\' potential. They inspire others through shared vision and values, valuing sincere communication and individual needs of team members. INFJ leaders typically lead by example rather than through directives, and are adept at grasping the human element in organizational change. They are particularly skilled at inspiring team members\' internal motivation rather than applying external pressure.'
  },
  'career.INFJ.challenge.1': {
    zh: '可能对批评过度敏感，影响工作效率和决策',
    en: 'May be overly sensitive to criticism, affecting work efficiency and decision-making'
  },
  'career.INFJ.challenge.2': {
    zh: '有时过度理想主义，设定不切实际的期望',
    en: 'Sometimes overly idealistic, setting unrealistic expectations'
  },
  'career.INFJ.challenge.3': {
    zh: '可能因过度关注他人需求而忽视自身界限和健康',
    en: 'May neglect personal boundaries and health due to excessive focus on others\' needs'
  },
  'career.INFJ.recommendation.1': {
    zh: '练习接受建设性反馈，将其视为成长而非个人批评',
    en: 'Practice accepting constructive feedback, viewing it as growth rather than personal criticism'
  },
  'career.INFJ.recommendation.2': {
    zh: '发展更实际的工作方法，将理想拆分为可实现的步骤',
    en: 'Develop more practical work methods, breaking down ideals into achievable steps'
  },
  'career.INFJ.recommendation.3': {
    zh: '设定清晰的个人界限，学会在工作热情和自我照顾间取得平衡',
    en: 'Set clear personal boundaries, learning to balance work enthusiasm and self-care'
  },
  'career.INFJ.career.1': {
    zh: '人力资源发展专家',
    en: 'Human Resources Development Specialist'
  },
  'career.INFJ.career.2': {
    zh: '组织发展顾问',
    en: 'Organizational Development Consultant'
  },
  'career.INFJ.career.3': {
    zh: '职业顾问/教练',
    en: 'Career Counselor/Coach'
  },
  'career.INFJ.career.4': {
    zh: '心理治疗师/辅导员',
    en: 'Psychotherapist/Counselor'
  },
  'career.INFJ.career.5': {
    zh: '非营利组织管理者',
    en: 'Non-profit Organization Manager'
  },
  'career.INFJ.career.1.description': {
    zh: '心理治疗师可以充分发挥你的洞察力和同理心，帮助他人解决心理问题，促进个人成长。',
    en: 'Psychotherapists can fully utilize your insight and empathy to help others solve psychological issues and promote personal growth.'
  },
  'career.INFJ.career.2.description': {
    zh: '人力资源发展专家能让你运用对人性的理解，培养人才并创造和谐的工作环境。',
    en: 'Human resources development specialists allow you to use your understanding of human nature to cultivate talent and create harmonious work environments.'
  },
  'career.INFJ.career.3.description': {
    zh: '职业顾问/教练可以发挥你帮助他人实现潜能的天赋，指导人们找到合适的职业道路。',
    en: 'Career counselors/coaches can leverage your talent for helping others realize their potential, guiding people to find suitable career paths.'
  },
  'career.INFJ.career.4.description': {
    zh: '组织发展顾问能让你将洞察力和系统思维结合起来，帮助组织实现健康发展和变革。',
    en: 'Organizational development consultants allow you to combine insight with systems thinking to help organizations achieve healthy development and transformation.'
  },
  'career.INFJ.career.5.description': {
    zh: '非营利组织管理者可以让你为有意义的事业工作，实现你对社会产生积极影响的愿望。',
    en: 'Non-profit organization managers allow you to work for meaningful causes, fulfilling your desire to make a positive impact on society.'
  },

  // ENFP职业分析详情
  'career.ENFP.strength.1': {
    zh: '出色的人际交往能力和建立关系的天赋',
    en: 'Excellent interpersonal skills and talent for building relationships'
  },
  'career.ENFP.strength.2': {
    zh: '创新思维和解决问题的创造力',
    en: 'Innovative thinking and creativity in problem-solving'
  },
  'career.ENFP.strength.3': {
    zh: '适应性强，能在变化环境中迅速调整',
    en: 'Strong adaptability, able to quickly adjust in changing environments'
  },
  'career.ENFP.strength.4': {
    zh: '激发和影响他人的能力',
    en: 'Ability to inspire and influence others'
  },
  'career.ENFP.strength.5': {
    zh: '看到可能性和机会的天赋',
    en: 'Talent for seeing possibilities and opportunities'
  },
  'career.ENFP.workEnvironment': {
    zh: 'ENFP在创新、灵活、重视人际关系且鼓励创造性表达的环境中表现最佳。他们偏好多样化任务、与各种人合作的机会，以及能够探索新想法的空间。理想的工作场所应当有开放的沟通文化，最小化严格的规章制度和重复性工作，同时提供充分的认可和成长机会。',
    en: 'ENFPs perform best in environments that are innovative, flexible, value interpersonal relationships, and encourage creative expression. They prefer diverse tasks, opportunities to collaborate with various people, and space to explore new ideas. The ideal workplace should have an open communication culture, minimize strict regulations and repetitive work, while providing ample recognition and growth opportunities.'
  },
  'career.ENFP.teamRole': {
    zh: 'ENFP在团队中通常扮演催化剂和激励者的角色。他们善于产生创新想法，激发团队热情，促进开放沟通，并帮助团队探索新的可能性。ENFP特别擅长在团队停滞时注入新能量，连接不同思想，以及在紧张情况下缓和气氛。他们往往能看到团队成员的潜力，并鼓励他们充分发挥。',
    en: 'ENFPs typically play the role of catalysts and motivators in teams. They are good at generating innovative ideas, inspiring team enthusiasm, promoting open communication, and helping teams explore new possibilities. ENFPs are particularly skilled at injecting new energy when teams stagnate, connecting different ideas, and easing tension in stressful situations. They often see the potential in team members and encourage them to fully realize it.'
  },
  'career.ENFP.leadershipStyle': {
    zh: '作为领导者，ENFP采用启发鼓舞型领导风格，通过热情和愿景激励团队。他们创造包容性环境，重视每个团队成员的贡献，鼓励创新和尝试。ENFP领导善于识别人才并帮助他们成长，灵活应对挑战，并在组织中培养积极文化。他们的领导更专注于可能性而非常规，往往通过个人魅力和真诚关怀获得团队支持。',
    en: 'As leaders, ENFPs adopt an inspirational leadership style, motivating teams through enthusiasm and vision. They create inclusive environments, value each team member\'s contribution, and encourage innovation and experimentation. ENFP leaders are good at identifying talent and helping them grow, flexibly responding to challenges, and fostering a positive culture in organizations. Their leadership focuses more on possibilities than conventions, often gaining team support through personal charisma and genuine care.'
  },
  'career.ENFP.challenge.1': {
    zh: '可能难以持续专注于长期项目的细节和后续工作',
    en: 'May find it difficult to maintain focus on details and follow-up work in long-term projects'
  },
  'career.ENFP.challenge.2': {
    zh: '有时过于分散注意力，同时追求多个想法而难以完成',
    en: 'Sometimes too scattered, pursuing multiple ideas simultaneously making completion difficult'
  },
  'career.ENFP.challenge.3': {
    zh: '在需要高度结构化和常规工作的环境中感到受限',
    en: 'Feel restricted in environments requiring highly structured and routine work'
  },
  'career.ENFP.recommendation.1': {
    zh: '发展项目管理技能，建立结构化系统跟踪任务和期限',
    en: 'Develop project management skills, establish structured systems to track tasks and deadlines'
  },
  'career.ENFP.recommendation.2': {
    zh: '学习优先级设定技巧，避免同时追求过多目标导致分散',
    en: 'Learn prioritization techniques to avoid scattering efforts by pursuing too many goals simultaneously'
  },
  'career.ENFP.recommendation.3': {
    zh: '与更注重细节和执行的同事合作，形成互补团队',
    en: 'Collaborate with colleagues who are more detail-oriented and execution-focused to form complementary teams'
  },
  'career.ENFP.career.1': {
    zh: '创意总监',
    en: 'Creative Director'
  },
  'career.ENFP.career.2': {
    zh: '营销策略师',
    en: 'Marketing Strategist'
  },
  'career.ENFP.career.3': {
    zh: '人力资源发展专家',
    en: 'Human Resources Development Specialist'
  },
  'career.ENFP.career.4': {
    zh: '公关顾问',
    en: 'Public Relations Consultant'
  },
  'career.ENFP.career.5': {
    zh: '企业培训师',
    en: 'Corporate Trainer'
  },

  // ENTJ职业分析详情
  'career.ENTJ.strength.1': {
    zh: '卓越的战略规划和远见卓识能力',
    en: 'Excellent strategic planning and visionary abilities'
  },
  'career.ENTJ.strength.2': {
    zh: '强大的决策能力和执行力',
    en: 'Strong decision-making and execution capabilities'
  },
  'career.ENTJ.strength.3': {
    zh: '自信的领导风格和目标导向性',
    en: 'Confident leadership style and goal orientation'
  },
  'career.ENTJ.strength.4': {
    zh: '优秀的组织和系统化能力',
    en: 'Excellent organizational and systematization abilities'
  },
  'career.ENTJ.strength.5': {
    zh: '出色的分析思维和逻辑推理能力',
    en: 'Outstanding analytical thinking and logical reasoning'
  },
  'career.ENTJ.workEnvironment': {
    zh: 'ENTJ在充满挑战、注重结果、提供领导机会和战略规划的环境中表现最佳。他们偏好能够做出重要决策、执行变革并看到明确成果的工作场所。理想的工作环境应当有清晰的晋升路径，奖励能力和成就，并提供与其他高能力专业人士合作的机会。',
    en: 'ENTJs perform best in environments that are challenging, results-oriented, and provide opportunities for leadership and strategic planning. They prefer workplaces where they can make important decisions, implement changes, and see clear outcomes. The ideal work environment should have clear paths for advancement, reward competence and achievement, and offer opportunities to collaborate with other high-capability professionals.'
  },
  'career.ENTJ.teamRole': {
    zh: 'ENTJ在团队中通常扮演领导者和策略家的角色。他们擅长设定明确方向，制定有效计划，并激励团队实现目标。他们常常自然而然地承担指挥职责，推动团队向前发展，并确保项目保持在正轨上。他们的直接沟通风格和高标准推动整个团队追求卓越。',
    en: 'ENTJs typically play the role of leaders and strategists in teams. They excel at setting clear directions, formulating effective plans, and motivating teams to achieve goals. They often naturally assume command responsibilities, drive teams forward, and ensure projects stay on track. Their direct communication style and high standards drive the entire team to pursue excellence.'
  },
  'career.ENTJ.leadershipStyle': {
    zh: '作为领导者，ENTJ采用战略型领导风格，专注于设定明确的愿景、制定有效策略并确保高效执行。他们直接了当，对绩效有高要求，同时也愿意授权给有能力的团队成员。ENTJ领导者有能力做出艰难决策，即使这些决策不受欢迎，他们也能坚定地推进变革，并对结果负责。',
    en: 'As leaders, ENTJs adopt a strategic leadership style, focusing on setting clear visions, developing effective strategies, and ensuring efficient execution. They are straightforward, have high performance expectations, while also being willing to delegate to capable team members. ENTJ leaders are capable of making difficult decisions, even if these decisions are unpopular, they can firmly advance change and take responsibility for results.'
  },
  'career.ENTJ.challenge.1': {
    zh: '可能被视为过于支配或专制',
    en: 'May be perceived as overly dominant or autocratic'
  },
  'career.ENTJ.challenge.2': {
    zh: '有时对他人的情感需求和反应缺乏敏感性',
    en: 'Sometimes lacks sensitivity to others\' emotional needs and reactions'
  },
  'career.ENTJ.challenge.3': {
    zh: '对效率的关注可能导致过于直接或苛刻的批评',
    en: 'Focus on efficiency may lead to overly direct or harsh criticism'
  },
  'career.ENTJ.recommendation.1': {
    zh: '发展情商，特别是在理解和回应他人情感需求方面',
    en: 'Develop emotional intelligence, particularly in understanding and responding to others\' emotional needs'
  },
  'career.ENTJ.recommendation.2': {
    zh: '学习在保持有效性的同时软化交流方式',
    en: 'Learn to soften communication style while maintaining effectiveness'
  },
  'career.ENTJ.recommendation.3': {
    zh: '培养耐心和倾听技巧，尤其是面对不同工作风格的团队成员时',
    en: 'Cultivate patience and listening skills, especially when facing team members with different work styles'
  },
  'career.ENTJ.career.1': {
    zh: '企业首席执行官/高管',
    en: 'Corporate CEO/Executive'
  },
  'career.ENTJ.career.2': {
    zh: '管理咨询顾问',
    en: 'Management Consultant'
  },
  'career.ENTJ.career.3': {
    zh: '投资银行家/金融战略家',
    en: 'Investment Banker/Financial Strategist'
  },
  'career.ENTJ.career.4': {
    zh: '法律专业人士',
    en: 'Legal Professional'
  },
  'career.ENTJ.career.5': {
    zh: '企业家/商业开发者',
    en: 'Entrepreneur/Business Developer'
  },

  // ENTP职业分析详情
  'career.ENTP.strength.1': {
    zh: '杰出的创新思维和概念化能力',
    en: 'Outstanding innovative thinking and conceptualization abilities'
  },
  'career.ENTP.strength.2': {
    zh: '快速解决复杂问题的能力',
    en: 'Ability to quickly solve complex problems'
  },
  'career.ENTP.strength.3': {
    zh: '出色的辩论和说服技巧',
    en: 'Excellent debating and persuasion skills'
  },
  'career.ENTP.strength.4': {
    zh: '适应性强，能够迅速掌握新概念和技能',
    en: 'Strong adaptability, able to quickly grasp new concepts and skills'
  },
  'career.ENTP.strength.5': {
    zh: '对多学科领域的广泛兴趣和知识',
    en: 'Broad interests and knowledge across multiple disciplines'
  },
  'career.ENTP.workEnvironment': {
    zh: 'ENTP在知识密集、提供智力挑战、允许创新和创造性解决问题的环境中表现最佳。他们偏好最小化常规和重复性任务，最大化自主性和灵活性的工作场所。理想的工作环境应当重视创新思维，允许探索新想法，并为智力辩论和交流提供空间。',
    en: 'ENTPs perform best in environments that are knowledge-intensive, provide intellectual challenges, and allow for innovation and creative problem-solving. They prefer workplaces that minimize routine and repetitive tasks, and maximize autonomy and flexibility. The ideal work environment should value innovative thinking, permit exploration of new ideas, and provide space for intellectual debate and exchange.'
  },
  'career.ENTP.teamRole': {
    zh: 'ENTP在团队中通常扮演创新者和概念催化剂的角色。他们善于提出突破性想法，质疑既定假设，并推动团队考虑新的可能性。他们通过智力挑战和创造性思维激发团队活力，并在解决看似不可能的问题时展现价值。虽然他们可能不总是专注于细节或跟进，但他们的创新视角常常为团队开辟新方向。',
    en: 'ENTPs typically play the role of innovators and concept catalysts in teams. They excel at proposing breakthrough ideas, questioning established assumptions, and pushing teams to consider new possibilities. They energize teams through intellectual challenges and creative thinking, and demonstrate value in solving seemingly impossible problems. While they may not always focus on details or follow-up, their innovative perspectives often open new directions for teams.'
  },
  'career.ENTP.leadershipStyle': {
    zh: '作为领导者，ENTP采用创新型领导风格，通过挑战传统和鼓励创新思维来激励团队。他们营造一个开放、鼓励尝试和允许失败的环境，以促进创新。ENTP领导者通常重视智力能力，鼓励辩论和不同观点，同时保持对最终目标的关注。他们灵活适应变化，善于发现机会并迅速调整战略以利用新情况。',
    en: 'As leaders, ENTPs adopt an innovative leadership style, inspiring teams by challenging conventions and encouraging innovative thinking. They create an environment that is open, encourages experimentation, and allows for failure to promote innovation. ENTP leaders typically value intellectual capability, encourage debate and different perspectives, while maintaining focus on the ultimate goal. They adapt flexibly to changes, excel at identifying opportunities, and quickly adjust strategies to leverage new situations.'
  },
  'career.ENTP.challenge.1': {
    zh: '可能难以坚持常规任务或按部就班完成项目',
    en: 'May find it difficult to persist with routine tasks or complete projects in a systematic manner'
  },
  'career.ENTP.challenge.2': {
    zh: '有时过于专注于理论可能性而非实际实施',
    en: 'Sometimes overly focused on theoretical possibilities rather than practical implementation'
  },
  'career.ENTP.challenge.3': {
    zh: '可能因不断追求新想法而分散精力或延迟完成',
    en: 'May scatter efforts or delay completion due to constantly pursuing new ideas'
  },
  'career.ENTP.recommendation.1': {
    zh: '培养项目管理和执行技能，以将创意转化为实际成果',
    en: 'Develop project management and execution skills to transform ideas into practical outcomes'
  },
  'career.ENTP.recommendation.2': {
    zh: '与执行力强的同事合作，帮助将概念转化为现实',
    en: 'Collaborate with execution-oriented colleagues to help transform concepts into reality'
  },
  'career.ENTP.recommendation.3': {
    zh: '使用任务管理工具和技术来跟踪进度和保持专注',
    en: 'Use task management tools and techniques to track progress and maintain focus'
  },
  'career.ENTP.career.1': {
    zh: '创业者/企业创始人',
    en: 'Entrepreneur/Business Founder'
  },
  'career.ENTP.career.2': {
    zh: '产品设计师/创新顾问',
    en: 'Product Designer/Innovation Consultant'
  },
  'career.ENTP.career.3': {
    zh: '战略顾问',
    en: 'Strategic Consultant'
  },
  'career.ENTP.career.4': {
    zh: '市场营销策略师',
    en: 'Marketing Strategist'
  },
  'career.ENTP.career.5': {
    zh: '研发科学家/工程师',
    en: 'R&D Scientist/Engineer'
  },

  // ENFJ职业分析详情
  'career.ENFJ.strength.1': {
    zh: '卓越的人际交往能力和对他人需求的敏感性',
    en: 'Excellent interpersonal skills and sensitivity to others\' needs'
  },
  'career.ENFJ.strength.2': {
    zh: '富有魅力的沟通风格和说服能力',
    en: 'Charismatic communication style and persuasive abilities'
  },
  'career.ENFJ.strength.3': {
    zh: '卓越的团队建设和人员发展技能',
    en: 'Outstanding team building and personnel development skills'
  },
  'career.ENFJ.strength.4': {
    zh: '强烈的目标导向性和组织能力',
    en: 'Strong goal orientation and organizational capabilities'
  },
  'career.ENFJ.strength.5': {
    zh: '对社会影响和价值观的深刻理解',
    en: 'Deep understanding of social impact and values'
  },
  'career.ENFJ.workEnvironment': {
    zh: 'ENFJ在重视协作、提供真实人际连接和符合个人价值观的环境中表现最佳。他们偏好能够直接看到对他人积极影响的工作场所，以及能够参与团队合作实现有意义目标的环境。理想的工作环境应当重视和谐关系，认可人际贡献，并提供领导和指导他人的机会。',
    en: 'ENFJs perform best in environments that value collaboration, provide authentic interpersonal connections, and align with personal values. They prefer workplaces where they can directly see their positive impact on others, and environments where they can participate in team collaboration to achieve meaningful goals. The ideal work environment should value harmonious relationships, recognize interpersonal contributions, and provide opportunities to lead and guide others.'
  },
  'career.ENFJ.teamRole': {
    zh: 'ENFJ在团队中通常扮演催化剂和团队建设者的角色。他们能够激发团队士气，调和不同意见，并帮助每个成员发挥最大潜能。他们善于关注团队动态，预见并解决潜在冲突，同时保持对共同目标的承诺。他们常常成为非正式的心理顾问和指导者，为团队成员提供支持和鼓励。',
    en: 'ENFJs typically play the role of catalysts and team builders. They can inspire team morale, reconcile different opinions, and help each member maximize their potential. They excel at attending to team dynamics, anticipating and resolving potential conflicts, while maintaining commitment to common goals. They often become informal counselors and mentors, providing support and encouragement to team members.'
  },
  'career.ENFJ.leadershipStyle': {
    zh: '作为领导者，ENFJ采用变革型领导风格，通过个人魅力、真诚关怀和共同愿景来激励团队。他们特别关注团队文化和团队成员的发展，投入时间了解每个人的优势和需求。ENFJ领导者以身作则，展示他们所期望的承诺和热情，他们的领导力来源于真诚的关系建立和对团队成员潜力的信任。',
    en: 'As leaders, ENFJs adopt a transformational leadership style, inspiring teams through personal charisma, genuine care, and shared vision. They pay special attention to team culture and the development of team members, investing time to understand each person\'s strengths and needs. ENFJ leaders lead by example, demonstrating the commitment and enthusiasm they expect, and their leadership derives from authentic relationship building and trust in team members\' potential.'
  },
  'career.ENFJ.challenge.1': {
    zh: '可能过度投入他人需求，导致个人倦怠',
    en: 'May overcommit to others\' needs, leading to personal burnout'
  },
  'career.ENFJ.challenge.2': {
    zh: '有时对批评和冲突过度敏感',
    en: 'Sometimes overly sensitive to criticism and conflict'
  },
  'career.ENFJ.challenge.3': {
    zh: '可能在做出会让人失望的必要决定时犹豫不决',
    en: 'May hesitate in making necessary decisions that would disappoint others'
  },
  'career.ENFJ.recommendation.1': {
    zh: '设定清晰的个人界限，定期练习自我关爱',
    en: 'Set clear personal boundaries, regularly practice self-care'
  },
  'career.ENFJ.recommendation.2': {
    zh: '发展接受建设性批评的能力，将其视为成长机会',
    en: 'Develop the ability to accept constructive criticism, viewing it as an opportunity for growth'
  },
  'career.ENFJ.recommendation.3': {
    zh: '培养做出困难决策的技能，特别是当这些决策符合长期利益时',
    en: 'Cultivate skills in making difficult decisions, especially when these decisions align with long-term interests'
  },
  'career.ENFJ.career.1': {
    zh: '人力资源总监',
    en: 'Human Resources Director'
  },
  'career.ENFJ.career.2': {
    zh: '培训和发展专家',
    en: 'Training and Development Specialist'
  },
  'career.ENFJ.career.3': {
    zh: '非营利组织领导者',
    en: 'Non-profit Organization Leader'
  },
  'career.ENFJ.career.4': {
    zh: '企业文化顾问',
    en: 'Corporate Culture Consultant'
  },
  'career.ENFJ.career.5': {
    zh: '教育行政人员',
    en: 'Educational Administrator'
  },

  // INFP职业分析详情
  'career.INFP.strength.1': {
    zh: '深厚的同理心和对他人需求的洞察力',
    en: 'Deep empathy and insight into others\' needs'
  },
  'career.INFP.strength.2': {
    zh: '创造力和想象力，能够提出独特的解决方案',
    en: 'Creativity and imagination, able to propose unique solutions'
  },
  'career.INFP.strength.3': {
    zh: '强烈的个人价值观和道德标准',
    en: 'Strong personal values and moral standards'
  },
  'career.INFP.strength.4': {
    zh: '灵活适应能力，特别是在支持性环境中',
    en: 'Flexible adaptability, especially in supportive environments'
  },
  'career.INFP.strength.5': {
    zh: '对创造和表达的天然热情',
    en: 'Natural enthusiasm for creation and expression'
  },
  'career.INFP.workEnvironment': {
    zh: 'INFP在与个人价值观一致、鼓励创造性表达、提供独立空间的环境中表现最佳。他们偏好低压力、支持性、允许灵活性的工作场所，以及能够看到他们工作对他人积极影响的环境。理想的工作环境应当有良好的人际氛围，重视真实性和个人贡献，尊重每个人的独特性。',
    en: 'INFPs perform best in environments that align with their personal values, encourage creative expression, and provide independent space. They prefer low-pressure, supportive workplaces that allow flexibility, and environments where they can see their work\'s positive impact on others. The ideal work environment should have a good interpersonal atmosphere, value authenticity and personal contributions, and respect each person\'s uniqueness.'
  },
  'career.INFP.teamRole': {
    zh: 'INFP在团队中通常扮演和谐者和价值守护者的角色。他们通过关注每个人的情感和需求来促进团队和谐，并在面临道德困境时保持团队的价值方向。他们的创造力和灵活性为团队提供了独特的视角，他们善于在冲突中寻找共同点和创新解决方案。虽然不总是最外向的成员，但他们的真诚和支持对塑造团队文化非常重要。',
    en: 'INFPs typically play the role of harmonizers and value guardians in teams. They promote team harmony by attending to each person\'s emotions and needs, and maintain the team\'s value direction when facing moral dilemmas. Their creativity and flexibility provide unique perspectives for the team, and they excel at finding common ground and innovative solutions in conflicts. Though not always the most outgoing members, their sincerity and support are crucial for shaping team culture.'
  },
  'career.INFP.leadershipStyle': {
    zh: '作为领导者，INFP采用以价值观为导向的领导风格，通过个人榜样和真诚关怀来引导团队。他们创造一个尊重每个人独特贡献的环境，专注于团队的全面发展而非仅仅关注结果。INFP领导者通常倾听不同声音，寻求共识，并在道德问题上坚定立场。他们的领导力来源于对愿景的热忱和对团队成员的个人投入。',
    en: 'As leaders, INFPs adopt a values-oriented leadership style, guiding teams through personal example and genuine care. They create an environment that respects each person\'s unique contribution, focusing on the team\'s holistic development rather than merely results. INFP leaders typically listen to different voices, seek consensus, and take firm stands on moral issues. Their leadership derives from passion for the vision and personal investment in team members.'
  },
  'career.INFP.challenge.1': {
    zh: '可能过度理想化工作环境或项目，导致现实失望',
    en: 'May over-idealize work environments or projects, leading to realistic disappointments'
  },
  'career.INFP.challenge.2': {
    zh: '有时在高压环境或面对冲突时感到不适',
    en: 'Sometimes uncomfortable in high-pressure environments or when facing conflict'
  },
  'career.INFP.challenge.3': {
    zh: '可能因追求完美或疑虑而拖延决策或行动',
    en: 'May delay decisions or actions due to perfectionism or doubts'
  },
  'career.INFP.recommendation.1': {
    zh: '培养现实主义，在不放弃价值的同时设定可达到的期望',
    en: 'Cultivate realism, setting achievable expectations without abandoning values'
  },
  'career.INFP.recommendation.2': {
    zh: '发展更实际的工作方法，将理想拆分为可实现的步骤',
    en: 'Develop more practical work methods, breaking down ideals into achievable steps'
  },
  'career.INFP.recommendation.3': {
    zh: '练习应对批评和反馈的技巧，视为提高机会而非个人攻击',
    en: 'Practice skills for handling criticism and feedback, viewing them as opportunities for improvement rather than personal attacks'
  },
  'career.INFP.career.1': {
    zh: '作家/内容创作者',
    en: 'Writer/Content Creator'
  },
  'career.INFP.career.2': {
    zh: '心理辅导员/治疗师',
    en: 'Counselor/Therapist'
  },
  'career.INFP.career.3': {
    zh: '艺术家/设计师',
    en: 'Artist/Designer'
  },
  'career.INFP.career.4': {
    zh: '社会工作者',
    en: 'Social Worker'
  },
  'career.INFP.career.5': {
    zh: '人力资源发展专家',
    en: 'Human Resources Development Specialist'
  },

  // ISTJ职业分析详情
  'career.ISTJ.strength.1': {
    zh: '高度责任感和可靠性',
    en: 'High sense of responsibility and reliability'
  },
  'career.ISTJ.strength.2': {
    zh: '出色的组织能力和对细节的关注',
    en: 'Excellent organizational ability and attention to detail'
  },
  'career.ISTJ.strength.3': {
    zh: '实际、系统化的问题解决方法',
    en: 'Practical, systematic problem-solving approach'
  },
  'career.ISTJ.strength.4': {
    zh: '遵守规则和流程的坚定承诺',
    en: 'Strong commitment to following rules and procedures'
  },
  'career.ISTJ.strength.5': {
    zh: '逻辑分析和事实导向的决策能力',
    en: 'Logical analysis and fact-oriented decision-making ability'
  },
  'career.ISTJ.workEnvironment': {
    zh: 'ISTJ在结构化、有序、重视传统和可靠性的环境中表现最佳。他们偏好有清晰预期、稳定性和可预测性的工作场所。理想的工作环境应当提供明确的规则和程序，重视准确性和细致，并认可一致性和辛勤工作的价值。',
    en: 'ISTJs perform best in environments that are structured, orderly, and value tradition and reliability. They prefer workplaces with clear expectations, stability, and predictability. The ideal work environment should provide clear rules and procedures, value accuracy and thoroughness, and recognize the value of consistency and hard work.'
  },
  'career.ISTJ.teamRole': {
    zh: 'ISTJ在团队中通常扮演稳定者和维护者的角色。他们确保项目按流程进行，保持对细节的关注，并确保团队遵守既定规范。他们的可靠性和勤奋使他们成为团队可以依赖的支柱，特别是在需要精确和一致性的任务中。虽然可能不是最具创新性的成员，但他们的实用主义和决心对团队的成功至关重要。',
    en: 'ISTJs typically play the role of stabilizers and maintainers in teams. They ensure projects proceed according to procedure, maintain attention to detail, and ensure the team adheres to established norms. Their reliability and diligence make them pillars that the team can depend on, especially in tasks requiring precision and consistency. While they may not be the most innovative members, their pragmatism and determination are essential to the team\'s success.'
  },
  'career.ISTJ.leadershipStyle': {
    zh: '作为领导者，ISTJ采用系统化的领导风格，通过明确的结构、规则和期望来引导团队。他们设定清晰的程序和标准，确保团队成员明确他们的职责。ISTJ领导者通过个人榜样来展示责任感和勤奋，重视一致性和可靠性。他们的决策基于逻辑和事实，通常避免冒险，优先考虑稳定性和可预测性。',
    en: 'As leaders, ISTJs adopt a systematic leadership style, guiding teams through clear structures, rules, and expectations. They establish clear procedures and standards, ensuring team members understand their responsibilities. ISTJ leaders demonstrate responsibility and diligence through personal example, valuing consistency and reliability. Their decisions are based on logic and facts, typically avoiding risks, prioritizing stability and predictability.'
  },
  'career.ISTJ.challenge.1': {
    zh: '可能抵制变化和新方法',
    en: 'May resist change and new approaches'
  },
  'career.ISTJ.challenge.2': {
    zh: '有时过于关注规则和程序而忽视灵活性',
    en: 'Sometimes overly focused on rules and procedures at the expense of flexibility'
  },
  'career.ISTJ.challenge.3': {
    zh: '在处理抽象概念和理论化问题时可能不够舒适',
    en: 'May not be comfortable dealing with abstract concepts and theoretical issues'
  },
  'career.ISTJ.recommendation.1': {
    zh: '培养对变化和新方法的开放态度，将其视为提高效率的机会',
    en: 'Cultivate openness to change and new approaches, viewing them as opportunities for improved efficiency'
  },
  'career.ISTJ.recommendation.2': {
    zh: '在适当情况下允许灵活性，特别是当严格遵循规则可能不是最佳选择时',
    en: 'Allow for flexibility when appropriate, especially when strictly following rules may not be the best option'
  },
  'career.ISTJ.recommendation.3': {
    zh: '发展更舒适地处理抽象概念的能力，这可能有助于解决复杂问题',
    en: 'Develop greater comfort with abstract concepts, which may aid in solving complex problems'
  },
  'career.ISTJ.career.1': {
    zh: '会计师/财务分析师',
    en: 'Accountant/Financial Analyst'
  },
  'career.ISTJ.career.2': {
    zh: '项目管理人员',
    en: 'Project Manager'
  },
  'career.ISTJ.career.3': {
    zh: '军事或执法人员',
    en: 'Military or Law Enforcement Officer'
  },
  'career.ISTJ.career.4': {
    zh: '行政管理人员',
    en: 'Administrative Manager'
  },
  'career.ISTJ.career.5': {
    zh: '品质保证专家',
    en: 'Quality Assurance Specialist'
  },

  // ISTP职业分析详情
  'career.ISTP.strength.1': {
    zh: '卓越的技术和机械能力',
    en: 'Excellent technical and mechanical abilities'
  },
  'career.ISTP.strength.2': {
    zh: '冷静应对危机和压力的能力',
    en: 'Ability to calmly handle crises and pressure'
  },
  'career.ISTP.strength.3': {
    zh: '强大的逻辑分析和问题解决技能',
    en: 'Strong logical analysis and problem-solving skills'
  },
  'career.ISTP.strength.4': {
    zh: '实用主义和高效的工作方法',
    en: 'Pragmatism and efficient work methods'
  },
  'career.ISTP.strength.5': {
    zh: '灵活适应不断变化情况的能力',
    en: 'Ability to flexibly adapt to constantly changing situations'
  },
  'career.ISTP.workEnvironment': {
    zh: 'ISTP在提供实际挑战、技术问题和动手操作机会的环境中表现最佳。他们偏好有足够自主权，最小化管理和规则限制，以及能够看到明确工作成果的工作场所。理想的工作环境应当允许灵活性和创新，重视技术熟练度，并提供多样化的问题解决机会。',
    en: 'ISTPs perform best in environments that offer practical challenges, technical problems, and hands-on opportunities. They prefer workplaces with sufficient autonomy, minimal management and rule restrictions, and where they can see clear work results. The ideal work environment should allow for flexibility and innovation, value technical proficiency, and provide diverse problem-solving opportunities.'
  },
  'career.ISTP.teamRole': {
    zh: 'ISTP在团队中通常扮演实用问题解决者和技术专家的角色。他们以冷静高效的方式解决紧急问题，提供基于逻辑和经验的解决方案。虽然不是最外向的团队成员，但当他们发言时，通常提供简洁而有价值的见解。他们更喜欢独立工作，但在危机时刻能够与团队无缝合作。',
    en: 'ISTPs typically play the role of practical problem solvers and technical experts in teams. They solve urgent problems in a calm, efficient manner, providing solutions based on logic and experience. While not the most outgoing team members, when they speak, they usually offer concise and valuable insights. They prefer to work independently but can seamlessly collaborate with the team in moments of crisis.'
  },
  'career.ISTP.leadershipStyle': {
    zh: '作为领导者，ISTP采用简洁实用的领导风格，更多关注结果而非程序或理论。他们授予团队成员高度自主权，信任他们的能力完成工作而不需微观管理。ISTP领导者通常不寻求领导职位，但在需要技术专长或危机管理时往往会自然担任领导角色。他们以身作则，展示他们期望的技能水平，而不是发表长篇演讲。',
    en: 'As leaders, ISTPs adopt a concise, practical leadership style, focusing more on results than procedures or theories. They grant team members high autonomy, trusting their ability to complete work without micromanagement. ISTP leaders typically don\'t seek leadership positions but often naturally assume leadership roles when technical expertise or crisis management is needed. They lead by example, demonstrating the skill level they expect, rather than giving lengthy speeches.'
  },
  'career.ISTP.challenge.1': {
    zh: '可能对过度计划和理论讨论感到不耐烦',
    en: 'May become impatient with excessive planning and theoretical discussions'
  },
  'career.ISTP.challenge.2': {
    zh: '有时难以表达情感或理解他人的情感需求',
    en: 'Sometimes find it difficult to express emotions or understand others\' emotional needs'
  },
  'career.ISTP.challenge.3': {
    zh: '可能显得过于保留或疏离，特别是在社交场合',
    en: 'May appear overly reserved or detached, especially in social situations'
  },
  'career.ISTP.recommendation.1': {
    zh: '培养倾听技巧，特别是在处理抽象概念或理论框架时',
    en: 'Develop listening skills, especially when dealing with abstract concepts or theoretical frameworks'
  },
  'career.ISTP.recommendation.2': {
    zh: '发展情商，特别是识别和回应他人情感需求的能力',
    en: 'Develop emotional intelligence, particularly the ability to identify and respond to others\' emotional needs'
  },
  'career.ISTP.recommendation.3': {
    zh: '尝试更频繁地分享想法和观点，帮助团队了解你的思考过程',
    en: 'Try to share ideas and viewpoints more frequently, helping the team understand your thinking process'
  },
  'career.ISTP.career.1': {
    zh: '工程师（机械、电气等）',
    en: 'Engineer (Mechanical, Electrical, etc.)'
  },
  'career.ISTP.career.2': {
    zh: '飞行员/驾驶员',
    en: 'Pilot/Driver'
  },
  'career.ISTP.career.3': {
    zh: '计算机程序员/系统分析师',
    en: 'Computer Programmer/Systems Analyst'
  },
  'career.ISTP.career.4': {
    zh: '急救医疗技术员/急诊室医生',
    en: 'Emergency Medical Technician/ER Physician'
  },
  'career.ISTP.career.5': {
    zh: '法医调查员',
    en: 'Forensic Investigator'
  },

  // ESTJ职业分析详情
  'career.ESTJ.strength.1': {
    zh: '出色的组织和管理能力',
    en: 'Excellent organizational and management abilities'
  },
  'career.ESTJ.strength.2': {
    zh: '高效执行和实施计划的能力',
    en: 'Ability to efficiently execute and implement plans'
  },
  'career.ESTJ.strength.3': {
    zh: '守规矩、负责任的工作态度',
    en: 'Rule-abiding, responsible work attitude'
  },
  'career.ESTJ.strength.4': {
    zh: '务实的问题解决方法',
    en: 'Practical problem-solving approach'
  },
  'career.ESTJ.strength.5': {
    zh: '清晰直接的沟通风格',
    en: 'Clear and direct communication style'
  },
  'career.ESTJ.workEnvironment': {
    zh: 'ESTJ在结构化、有序、重视传统和明确责任划分的环境中表现最佳。他们偏好有明确目标、时间表和流程的工作场所。理想的工作环境应当奖励勤奋和成就，有明确的晋升途径，并提供管理和组织他人的机会。',
    en: 'ESTJs perform best in environments that are structured, orderly, value tradition, and have clear responsibility delineation. They prefer workplaces with clear goals, schedules, and processes. The ideal work environment should reward diligence and achievement, have clear promotion paths, and offer opportunities to manage and organize others.'
  },
  'career.ESTJ.teamRole': {
    zh: 'ESTJ在团队中通常扮演组织者和管理者的角色。他们善于建立结构，分配任务，并确保团队按计划高效运作。他们设定明确的预期和期限，并确保团队成员履行其职责。ESTJ的直接沟通风格有助于明确任务和解决冲突，他们可靠的领导确保项目按时完成。',
    en: 'ESTJs typically play the role of organizers and managers in teams. They excel at establishing structure, allocating tasks, and ensuring the team operates efficiently according to plan. They set clear expectations and deadlines, and ensure team members fulfill their responsibilities. ESTJs\' direct communication style helps clarify tasks and resolve conflicts, and their reliable leadership ensures projects are completed on time.'
  },
  'career.ESTJ.leadershipStyle': {
    zh: '作为领导者，ESTJ采用实用型领导风格，通过建立明确的结构、规则和责任来引导团队。他们直接、高效，设定高标准，并以身作则。ESTJ领导者专注于实际结果，偏好传统和经过验证的方法，在危机时能够快速果断地做出决策。他们通过奖励和认可来激励团队成员，并确保每个人都履行职责。',
    en: 'As leaders, ESTJs adopt a practical leadership style, guiding teams by establishing clear structures, rules, and responsibilities. They are direct, efficient, set high standards, and lead by example. ESTJ leaders focus on practical results, prefer traditional and proven methods, and can make quick, decisive decisions during crises. They motivate team members through rewards and recognition, and ensure everyone fulfills their duties.'
  },
  'career.ESTJ.challenge.1': {
    zh: '可能被视为过于控制或不灵活',
    en: 'May be perceived as overly controlling or inflexible'
  },
  'career.ESTJ.challenge.2': {
    zh: '有时对新想法或非传统方法持怀疑态度',
    en: 'Sometimes skeptical of new ideas or unconventional approaches'
  },
  'career.ESTJ.challenge.3': {
    zh: '可能对情感因素或他人敏感性考虑不足',
    en: 'May not sufficiently consider emotional factors or others\' sensitivities'
  },
  'career.ESTJ.recommendation.1': {
    zh: '培养灵活性和开放性，尤其是对新方法和创新思想',
    en: 'Develop flexibility and openness, especially to new approaches and innovative ideas'
  },
  'career.ESTJ.recommendation.2': {
    zh: '提升情商，特别是理解和应对他人情感需求的能力',
    en: 'Enhance emotional intelligence, particularly the ability to understand and address others\' emotional needs'
  },
  'career.ESTJ.recommendation.3': {
    zh: '在维持效率的同时，学会更耐心地倾听不同观点',
    en: 'Learn to listen more patiently to different perspectives while maintaining efficiency'
  },
  'career.ESTJ.career.1': {
    zh: '企业经理/高管',
    en: 'Corporate Manager/Executive'
  },
  'career.ESTJ.career.2': {
    zh: '项目经理',
    en: 'Project Manager'
  },
  'career.ESTJ.career.3': {
    zh: '财务总监/会计主管',
    en: 'Financial Director/Accounting Supervisor'
  },
  'career.ESTJ.career.4': {
    zh: '军事/执法领导',
    en: 'Military/Law Enforcement Leadership'
  },
  'career.ESTJ.career.5': {
    zh: '行政管理人员',
    en: 'Administrative Manager'
  },

  // ESFJ职业分析详情
  'career.ESFJ.strength.1': {
    zh: '卓越的人际交往能力和团队协作技巧',
    en: 'Excellent interpersonal abilities and team collaboration skills'
  },
  'career.ESFJ.strength.2': {
    zh: '强烈的责任感和可靠性',
    en: 'Strong sense of responsibility and reliability'
  },
  'career.ESFJ.strength.3': {
    zh: '组织和管理日常活动的能力',
    en: 'Ability to organize and manage daily activities'
  },
  'career.ESFJ.strength.4': {
    zh: '关注他人需求和情感的能力',
    en: 'Ability to attend to others\' needs and emotions'
  },
  'career.ESFJ.strength.5': {
    zh: '实际和有序的工作方法',
    en: 'Practical and orderly work methods'
  },
  'career.ESFJ.workEnvironment': {
    zh: 'ESFJ在友好、协作、重视团队和谐的环境中表现最佳。他们偏好有清晰结构和预期的工作场所，以及能够与他人密切合作并看到自己努力直接影响他人的环境。理想的工作环境应当提供稳定性和安全感，认可个人贡献，并允许通过帮助和支持他人来发挥作用。',
    en: 'ESFJs perform best in environments that are friendly, collaborative, and value team harmony. They prefer workplaces with clear structure and expectations, and environments where they can work closely with others and see the direct impact of their efforts on people. The ideal work environment should provide stability and security, recognize personal contributions, and allow them to make a difference by helping and supporting others.'
  },
  'career.ESFJ.teamRole': {
    zh: 'ESFJ在团队中通常扮演调解者和支持者的角色。他们促进团队和谐，关注团队成员的情感需求，并积极提供实际支持。他们擅长协调团队活动，维持良好的团队氛围，并确保每个人都感到被重视和包容。ESFJ通常是团队中的"社交粘合剂"，通过他们的热情和关怀帮助建立强大的团队联系。',
    en: 'ESFJs typically play the role of mediators and supporters in teams. They promote team harmony, attend to team members\' emotional needs, and actively provide practical support. They excel at coordinating team activities, maintaining a positive team atmosphere, and ensuring everyone feels valued and included. ESFJs are often the "social glue" in teams, helping build strong team connections through their warmth and care.'
  },
  'career.ESFJ.leadershipStyle': {
    zh: '作为领导者，ESFJ采用关怀型领导风格，通过关注团队成员的需求和发展来引导团队。他们创造一个支持性的环境，重视每个人的贡献，并通过个人关注和认可来激励团队。ESFJ领导者通常有很强的组织能力，设定清晰的期望，并确保团队成员拥有成功所需的资源。他们的领导力来源于建立关系和促进团队凝聚力的能力。',
    en: 'As leaders, ESFJs adopt a caring leadership style, guiding teams by attending to team members\' needs and development. They create a supportive environment, value each person\'s contributions, and motivate the team through personal attention and recognition. ESFJ leaders typically have strong organizational abilities, set clear expectations, and ensure team members have the resources needed for success. Their leadership derives from their ability to build relationships and foster team cohesion.'
  },
  'career.ESFJ.challenge.1': {
    zh: '可能过度关注他人认可和批准',
    en: 'May be overly concerned with others\' approval and validation'
  },
  'career.ESFJ.challenge.2': {
    zh: '有时在处理冲突或给予负面反馈时感到不适',
    en: 'Sometimes uncomfortable dealing with conflict or giving negative feedback'
  },
  'career.ESFJ.challenge.3': {
    zh: '可能过度承诺或难以设定个人界限',
    en: 'May overcommit or find it difficult to set personal boundaries'
  },
  'career.ESFJ.recommendation.1': {
    zh: '发展自我价值感，减少对外部认可的依赖',
    en: 'Develop a sense of self-worth, reducing dependence on external validation'
  },
  'career.ESFJ.recommendation.2': {
    zh: '培养处理冲突和提供建设性批评的技能',
    en: 'Cultivate skills for handling conflict and providing constructive criticism'
  },
  'career.ESFJ.recommendation.3': {
    zh: '学习设定健康边界，优先考虑自我照顾',
    en: 'Learn to set healthy boundaries, prioritizing self-care'
  },
  'career.ESFJ.career.1': {
    zh: '人力资源专员',
    en: 'Human Resources Specialist'
  },
  'career.ESFJ.career.2': {
    zh: '医疗保健专业人员',
    en: 'Healthcare Professional'
  },
  'career.ESFJ.career.3': {
    zh: '客户服务经理',
    en: 'Customer Service Manager'
  },
  'career.ESFJ.career.4': {
    zh: '社区服务协调员',
    en: 'Community Service Coordinator'
  },
  'career.ESFJ.career.5': {
    zh: '教师/教育管理员',
    en: 'Teacher/Educational Administrator'
  },

  // ISFJ职业分析详情
  'career.ISFJ.strength.1': {
    zh: '出色的组织和记忆能力',
    en: 'Excellent organizational and memory abilities'
  },
  'career.ISFJ.strength.2': {
    zh: '对细节和准确性的关注',
    en: 'Attention to detail and accuracy'
  },
  'career.ISFJ.strength.3': {
    zh: '关怀和支持他人的能力',
    en: 'Ability to care for and support others'
  },
  'career.ISFJ.strength.4': {
    zh: '高度的责任感和可靠性',
    en: 'High sense of responsibility and reliability'
  },
  'career.ISFJ.strength.5': {
    zh: '实际的问题解决方法',
    en: 'Practical problem-solving approach'
  },
  'career.ISFJ.workEnvironment': {
    zh: 'ISFJ在稳定、友好、有序的环境中表现最佳，这些环境重视传统、合作和对他人的关怀。他们偏好有明确预期、低冲突水平和支持性氛围的工作场所，以及能够看到他们的贡献直接帮助他人的环境。理想的工作环境应当提供一定的结构和常规性，同时认可他们对细节和准确性的关注。',
    en: 'ISFJs perform best in environments that are stable, friendly, and orderly, valuing tradition, cooperation, and care for others. They prefer workplaces with clear expectations, low levels of conflict, and a supportive atmosphere, and environments where they can see their contributions directly helping others. The ideal work environment should provide some structure and routine, while recognizing their attention to detail and accuracy.'
  },
  'career.ISFJ.teamRole': {
    zh: 'ISFJ在团队中通常扮演支持者和维护者的角色。他们提供实际和情感上的支持，注重细节，并确保团队运作顺畅。他们善于记住团队成员的偏好和需求，创造和谐的工作环境，并自愿承担必要但可能不被注意的任务。虽然可能不是最引人注目的团队成员，但他们的持续贡献和可靠性对团队的长期成功至关重要。',
    en: 'ISFJs typically play the role of supporters and maintainers in teams. They provide practical and emotional support, attend to details, and ensure smooth team operations. They excel at remembering team members\' preferences and needs, creating harmonious work environments, and voluntarily taking on necessary but potentially overlooked tasks. While they may not be the most prominent team members, their consistent contributions and reliability are crucial to the team\'s long-term success.'
  },
  'career.ISFJ.leadershipStyle': {
    zh: '作为领导者，ISFJ采用服务导向型领导风格，通过关心团队成员的需求和提供必要的支持来引导团队。他们创造一个有序、和谐的环境，通过个人榜样和对责任的承诺来领导。ISFJ领导者通常关注细节，遵循既定程序，并重视稳定性和一致性。他们通过建立信任和创造安全的团队环境来激励团队成员。',
    en: 'As leaders, ISFJs adopt a service-oriented leadership style, guiding teams by caring for team members\' needs and providing necessary support. They create an orderly, harmonious environment, leading through personal example and commitment to responsibilities. ISFJ leaders typically pay attention to details, follow established procedures, and value stability and consistency. They motivate team members by building trust and creating a safe team environment.'
  },
  'career.ISFJ.challenge.1': {
    zh: '可能过度承担责任而导致压力过大',
    en: 'May take on too much responsibility, leading to excessive stress'
  },
  'career.ISFJ.challenge.2': {
    zh: '有时对变化和新方法产生抗拒',
    en: 'Sometimes resist change and new approaches'
  },
  'career.ISFJ.challenge.3': {
    zh: '可能难以对他人设定界限或表达个人需求',
    en: 'May find it difficult to set boundaries with others or express personal needs'
  },
  'career.ISFJ.recommendation.1': {
    zh: '培养适应性和灵活性，尝试将变化视为成长机会',
    en: 'Cultivate adaptability and flexibility, trying to view change as an opportunity for growth'
  },
  'career.ISFJ.recommendation.2': {
    zh: '练习自我关爱和设立个人界限，学会适时说"不"',
    en: 'Practice self-care and establish personal boundaries, learning to say "no" when appropriate'
  },
  'career.ISFJ.recommendation.3': {
    zh: '寻求建设性反馈并将其视为提高的工具而非个人批评',
    en: 'Seek constructive feedback and view it as a tool for improvement rather than personal criticism'
  },
  'career.ISFJ.career.1': {
    zh: '医疗保健专业人员',
    en: 'Healthcare Professional'
  },
  'career.ISFJ.career.2': {
    zh: '行政助理/办公室经理',
    en: 'Administrative Assistant/Office Manager'
  },
  'career.ISFJ.career.3': {
    zh: '初等教育教师',
    en: 'Elementary Education Teacher'
  },
  'career.ISFJ.career.4': {
    zh: '社会工作者',
    en: 'Social Worker'
  },
  'career.ISFJ.career.5': {
    zh: '人力资源专员',
    en: 'Human Resources Specialist'
  },

  // ESFP职业分析详情
  'career.ESFP.strength.1': {
    zh: '出色的人际交往能力和社交技巧',
    en: 'Excellent interpersonal and social skills'
  },
  'career.ESFP.strength.2': {
    zh: '积极乐观的态度和感染力',
    en: 'Positive, optimistic attitude and infectious energy'
  },
  'career.ESFP.strength.3': {
    zh: '灵活性和适应能力强',
    en: 'Strong flexibility and adaptability'
  },
  'career.ESFP.strength.4': {
    zh: '实用的解决问题能力',
    en: 'Practical problem-solving ability'
  },
  'career.ESFP.strength.5': {
    zh: '天生的表演才能和魅力',
    en: 'Natural performance talent and charm'
  },
  'career.ESFP.workEnvironment': {
    zh: 'ESFP在充满活力、鼓励创造性表达、提供多样化任务和丰富社交互动的环境中表现最佳。他们偏好直接看到工作成果，有机会与不同人合作，并能够实际动手的工作场所。理想的工作环境应当有轻松友好的氛围，最小化繁文缛节，并允许一定程度的自发性和乐趣。',
    en: 'ESFPs perform best in environments that are energetic, encourage creative expression, provide diverse tasks, and offer rich social interactions. They prefer workplaces where they can directly see work results, have opportunities to collaborate with various people, and engage in hands-on activities. The ideal work environment should have a relaxed, friendly atmosphere, minimize bureaucracy, and allow for some spontaneity and fun.'
  },
  'career.ESFP.teamRole': {
    zh: 'ESFP在团队中通常扮演活力源和调解者的角色。他们为团队带来热情和乐观情绪，帮助缓解紧张氛围并促进积极的团队动态。他们善于通过幽默和个人魅力激励他人，促进团队成员之间的合作。他们实际的问题解决方法和"立即行动"的心态使团队保持前进动力。',
    en: 'ESFPs typically play the role of energizers and mediators in teams. They bring enthusiasm and optimistic energy to the team, helping to relieve tense atmospheres and promote positive team dynamics. They excel at motivating others through humor and personal charm, fostering cooperation between team members. Their practical problem-solving approach and "act now" mindset keep the team moving forward.'
  },
  'career.ESFP.leadershipStyle': {
    zh: '作为领导者，ESFP采用活力激励型领导风格，通过热情和亲身示范来激励团队。他们创造一个充满活力和支持性的工作环境，鼓励开放沟通和团队合作。ESFP领导者关注当下需求，灵活应对变化，善于调解冲突并保持团队士气。他们的领导特点是实用性、包容性和对团队成员个人关系的重视。',
    en: 'As leaders, ESFPs adopt an energetically inspiring leadership style, motivating teams through enthusiasm and personal example. They create a vibrant and supportive work environment, encouraging open communication and team collaboration. ESFP leaders focus on current needs, adapt flexibly to changes, excel at mediating conflicts, and maintaining team morale. Their leadership is characterized by practicality, inclusivity, and an emphasis on personal relationships with team members.'
  },
  'career.ESFP.challenge.1': {
    zh: '可能对长期规划和抽象概念缺乏耐心',
    en: 'May lack patience for long-term planning and abstract concepts'
  },
  'career.ESFP.challenge.2': {
    zh: '有时过度社交或分心，影响任务完成',
    en: 'Sometimes overly social or distracted, affecting task completion'
  },
  'career.ESFP.challenge.3': {
    zh: '可能在需要长时间独立工作的项目中感到不适',
    en: 'May feel uncomfortable in projects requiring extended periods of independent work'
  },
  'career.ESFP.recommendation.1': {
    zh: '培养规划和目标设定技能，将长期项目分解为有趣的短期任务',
    en: 'Develop planning and goal-setting skills, breaking down long-term projects into interesting short-term tasks'
  },
  'career.ESFP.recommendation.2': {
    zh: '学习时间管理策略，平衡社交活动和工作职责',
    en: 'Learn time management strategies, balancing social activities and work responsibilities'
  },
  'career.ESFP.recommendation.3': {
    zh: '在需要深度专注的工作阶段创造适合的环境，减少干扰',
    en: 'Create suitable environments for work phases requiring deep focus, reducing distractions'
  },
  'career.ESFP.career.1': {
    zh: '活动策划/组织者',
    en: 'Event Planner/Organizer'
  },
  'career.ESFP.career.2': {
    zh: '旅游管理/导游',
    en: 'Tourism Management/Tour Guide'
  },
  'career.ESFP.career.3': {
    zh: '销售代表',
    en: 'Sales Representative'
  },
  'career.ESFP.career.4': {
    zh: '营销专员',
    en: 'Marketing Specialist'
  },
  'career.ESFP.career.5': {
    zh: '表演艺术家/演员',
    en: 'Performance Artist/Actor'
  },

  // ISFP职业分析详情
  'career.ISFP.strength.1': {
    zh: '强烈的美感和艺术天赋',
    en: 'Strong aesthetic sense and artistic talent'
  },
  'career.ISFP.strength.2': {
    zh: '真诚和对价值观的坚持',
    en: 'Sincerity and adherence to values'
  },
  'career.ISFP.strength.3': {
    zh: '实际和灵活的工作方式',
    en: 'Practical and flexible work approach'
  },
  'career.ISFP.strength.4': {
    zh: '对细节和审美品质的敏感度',
    en: 'Sensitivity to details and aesthetic qualities'
  },
  'career.ISFP.strength.5': {
    zh: '同理心和温和的沟通风格',
    en: 'Empathy and gentle communication style'
  },
  'career.ISFP.workEnvironment': {
    zh: 'ISFP在允许个人表达、尊重个体价值观、提供实际和有形成果的环境中表现最佳。他们偏好低压力、少冲突且能够自主工作的工作场所。理想的工作环境应当欣赏创造力和审美敏感性，允许灵活性和独立性，并强调通过具体行动产生积极影响。',
    en: 'ISFPs perform best in environments that allow personal expression, respect individual values, and provide practical and tangible outcomes. They prefer low-pressure, low-conflict workplaces where they can work autonomously. The ideal work environment should appreciate creativity and aesthetic sensitivity, allow for flexibility and independence, and emphasize making a positive impact through concrete actions.'
  },
  'career.ISFP.teamRole': {
    zh: 'ISFP在团队中通常扮演和谐者和实用贡献者的角色。他们通过温和的存在和真诚的关怀帮助维持团队和谐。他们善于看到并欣赏团队成员的独特品质，并通过实际行动而非言辞表达支持。虽然他们可能不是最外向的成员，但他们的审美敏感性和对细节的关注为团队项目增添了重要价值。',
    en: 'ISFPs typically play the role of harmonizers and practical contributors in teams. They help maintain team harmony through their gentle presence and genuine care. They excel at seeing and appreciating the unique qualities of team members, and express support through actions rather than words. While they may not be the most outgoing members, their aesthetic sensitivity and attention to detail add significant value to team projects.'
  },
  'career.ISFP.leadershipStyle': {
    zh: '作为领导者，ISFP采用低调而真诚的领导风格，更多通过榜样而非指令来引导团队。他们创造一个支持性、包容的环境，尊重个体差异和风格。ISFP领导者倾听团队成员的想法，提供实际支持，并鼓励个人表达和创造性。他们的领导特点是温和、真实和以价值观为基础，更关注人和过程而非权力或地位。',
    en: 'As leaders, ISFPs adopt a low-key, authentic leadership style, guiding teams more through example than directives. They create a supportive, inclusive environment that respects individual differences and styles. ISFP leaders listen to team members\' ideas, provide practical support, and encourage personal expression and creativity. Their leadership is characterized by gentleness, authenticity, and value-based approaches, focusing more on people and processes than power or status.'
  },
  'career.ISFP.challenge.1': {
    zh: '可能难以明确表达自己的需求和意见',
    en: 'May find it difficult to clearly express their needs and opinions'
  },
  'career.ISFP.challenge.2': {
    zh: '有时因对批评敏感而回避必要的冲突',
    en: 'Sometimes avoid necessary conflicts due to sensitivity to criticism'
  },
  'career.ISFP.challenge.3': {
    zh: '可能对长期规划和组织结构缺乏兴趣',
    en: 'May lack interest in long-term planning and organizational structures'
  },
  'career.ISFP.recommendation.1': {
    zh: '培养更直接的沟通技巧，特别是在表达需求和设定界限时',
    en: 'Develop more direct communication skills, especially when expressing needs and setting boundaries'
  },
  'career.ISFP.recommendation.2': {
    zh: '练习将建设性批评视为专业成长的工具而非个人攻击',
    en: 'Practice viewing constructive criticism as a tool for professional growth rather than personal attack'
  },
  'career.ISFP.recommendation.3': {
    zh: '发展基本的组织和规划技能，辅助创造性工作',
    en: 'Develop basic organizational and planning skills to support creative work'
  },
  'career.ISFP.career.1': {
    zh: '艺术家/设计师',
    en: 'Artist/Designer'
  },
  'career.ISFP.career.2': {
    zh: '摄影师',
    en: 'Photographer'
  },
  'career.ISFP.career.3': {
    zh: '室内设计师/装饰师',
    en: 'Interior Designer/Decorator'
  },
  'career.ISFP.career.4': {
    zh: '按摩师/物理治疗师',
    en: 'Massage Therapist/Physical Therapist'
  },
  'career.ISFP.career.5': {
    zh: '森林管理员/环保工作者',
    en: 'Forest Ranger/Environmental Worker'
  },

  // ESTP职业分析详情
  'career.ESTP.strength.1': {
    zh: '杰出的危机管理和快速反应能力',
    en: 'Outstanding crisis management and quick response abilities'
  },
  'career.ESTP.strength.2': {
    zh: '实际的问题解决方法和资源利用能力',
    en: 'Practical problem-solving approach and resource utilization skills'
  },
  'career.ESTP.strength.3': {
    zh: '风险管理和机会把握的天赋',
    en: 'Talent for risk management and seizing opportunities'
  },
  'career.ESTP.strength.4': {
    zh: '强大的观察力和环境适应性',
    en: 'Strong observational skills and environmental adaptability'
  },
  'career.ESTP.strength.5': {
    zh: '直接有效的沟通风格和谈判技巧',
    en: 'Direct, effective communication style and negotiation skills'
  },
  'career.ESTP.workEnvironment': {
    zh: 'ESTP在充满活力、提供直接行动机会和显著成果的环境中表现最佳。他们偏好多样化任务、最小的规章制度和能够运用机智解决实际问题的工作场所。理想的工作环境应当奖励主动性和结果，提供竞争性挑战，并允许一定程度的风险承担和创业精神。',
    en: 'ESTPs perform best in environments that are dynamic, provide opportunities for direct action, and offer tangible results. They prefer workplaces with varied tasks, minimal regulations, and where they can use ingenuity to solve practical problems. The ideal work environment should reward initiative and results, offer competitive challenges, and allow for some risk-taking and entrepreneurial spirit.'
  },
  'career.ESTP.teamRole': {
    zh: 'ESTP在团队中通常扮演推动者和问题解决者的角色。他们善于在危机中保持冷静，提供实际解决方案，并鼓励团队采取行动而非过度分析。他们的能量和实际态度帮助团队克服障碍，他们善于协商资源并找到捷径。虽然可能不是最耐心的规划者，但在需要立即行动时，他们是无价的团队资产。',
    en: 'ESTPs typically play the role of drivers and problem solvers in teams. They excel at staying calm during crises, providing practical solutions, and encouraging the team to take action rather than over-analyze. Their energy and practical attitude help teams overcome obstacles, and they are skilled at negotiating resources and finding shortcuts. While they may not be the most patient planners, they are invaluable team assets when immediate action is required.'
  },
  'career.ESTP.leadershipStyle': {
    zh: '作为领导者，ESTP采用行动导向型领导风格，通过迅速决策和解决问题来引导团队。他们专注于实际结果，而非理论或程序。ESTP领导者为团队创造充满活力的环境，鼓励适度风险承担和创新解决方案。他们通常直接坦率，重视绩效和实用解决方案，能够在压力下迅速适应和做出决策。',
    en: 'As leaders, ESTPs adopt an action-oriented leadership style, guiding teams through rapid decision-making and problem-solving. They focus on practical results rather than theory or procedure. ESTP leaders create an energetic environment for their teams, encouraging moderate risk-taking and innovative solutions. They are typically direct and straightforward, value performance and practical solutions, and can quickly adapt and make decisions under pressure.'
  },
  'career.ESTP.challenge.1': {
    zh: '可能缺乏耐心进行详细规划或遵循严格程序',
    en: 'May lack patience for detailed planning or following strict procedures'
  },
  'career.ESTP.challenge.2': {
    zh: '有时可能偏好短期成果而忽视长期影响',
    en: 'Sometimes may prefer short-term results while overlooking long-term impacts'
  },
  'career.ESTP.challenge.3': {
    zh: '对单调重复任务可能表现出明显的不耐烦',
    en: 'May show noticeable impatience with monotonous, repetitive tasks'
  },
  'career.ESTP.recommendation.1': {
    zh: '培养长期规划技能，将战略视为实现更大成功的工具',
    en: 'Develop long-term planning skills, viewing strategy as a tool for achieving greater success'
  },
  'career.ESTP.recommendation.2': {
    zh: '在做决定前，考虑行动的潜在长期后果',
    en: 'Consider the potential long-term consequences of actions before making decisions'
  },
  'career.ESTP.recommendation.3': {
    zh: '通过将重复任务视为达成更大目标的必要步骤来建立耐心',
    en: 'Build patience by viewing repetitive tasks as necessary steps toward achieving larger goals'
  },
  'career.ESTP.career.1': {
    zh: '销售代表/经理',
    en: 'Sales Representative/Manager'
  },
  'career.ESTP.career.2': {
    zh: '企业家/创业者',
    en: 'Entrepreneur/Business Owner'
  },
  'career.ESTP.career.3': {
    zh: '紧急响应人员',
    en: 'Emergency Response Personnel'
  },
  'career.ESTP.career.4': {
    zh: '体育教练/运动员',
    en: 'Sports Coach/Athlete'
  },
  'career.ESTP.career.5': {
    zh: '项目经理',
    en: 'Project Manager'
  },

  // MBTI新问卷问题翻译
  'test.newquestion.1': {
    zh: "当机会出现时，我会跟随内心的直觉立即行动。",
    en: "When opportunities arise, I trust my instincts and take immediate action."
  },
  'test.newquestion.2': {
    zh: "我喜欢天马行空地思考，经常能将不相关的事物联系起来产生新想法。",
    en: "I enjoy thinking outside the box and making unexpected connections between different ideas."
  },
  'test.newquestion.3': {
    zh: "我习惯用具体的数据和可测量的标准来评判成功。",
    en: "I prefer using concrete data and measurable criteria to evaluate success."
  },
  'test.newquestion.4': {
    zh: "我经常能感同身受，自然地关心和照顾他人的情绪需求。",
    en: "I naturally empathize with others and care about their emotional needs."
  },
  'test.newquestion.5': {
    zh: "我常常能预见事情的发展方向，直觉通常比较准确。",
    en: "I often have accurate hunches about how situations will unfold."
  },
  'test.newquestion.6': {
    zh: "我很容易发现事物的细微变化，特别是与往常不同的地方。",
    en: "I'm quick to notice subtle changes, especially when things differ from the usual."
  },
  'test.newquestion.7': {
    zh: "我做决定时更相信逻辑分析而非感觉。",
    en: "I rely more on logical analysis than feelings when making decisions."
  },
  'test.newquestion.8': {
    zh: "对事物的好坏，我往往有很强烈的直觉判断。",
    en: "I often have strong intuitive judgments about whether something is right or wrong."
  },
  'test.newquestion.9': {
    zh: "我会不自觉地把他人的困难当作自己的责任。",
    en: "I unconsciously take on others' problems as if they were my own."
  },
  'test.newquestion.10': {
    zh: "我善于用事实和证据来说服他人。",
    en: "I'm skilled at using facts and evidence to persuade others."
  },
  'test.newquestion.11': {
    zh: "我经常有突然的顿悟，看透事物本质或未来方向。",
    en: "I often experience moments of clarity where I suddenly understand the deeper meaning of things."
  },
  'test.newquestion.12': {
    zh: "我会把新经历与过往经验对比，找出可靠的规律。",
    en: "I compare new experiences with past ones to identify reliable patterns."
  },
  'test.newquestion.13': {
    zh: "我很清楚自己想要什么，也知道什么对自己是重要的。",
    en: "I have a clear sense of my personal values and what matters to me."
  },
  'test.newquestion.14': {
    zh: "我擅长找到最省力但有效的解决方案。",
    en: "I excel at finding efficient solutions that require minimal effort."
  },
  'test.newquestion.15': {
    zh: "我享受投入当下的体验，喜欢充满活力的活动。",
    en: "I enjoy being fully engaged in dynamic, energetic activities."
  },
  'test.newquestion.16': {
    zh: "我的思维喜欢自由发散，经常能看到事物间有趣的联系。",
    en: "My mind naturally makes free associations, seeing interesting connections between things."
  },
  'test.newquestion.17': {
    zh: "我很在意社会规范，会努力维护群体的和谐。",
    en: "I'm mindful of social norms and work to maintain group harmony."
  },
  'test.newquestion.18': {
    zh: "我善于制定全面的计划，同时推进多个目标。",
    en: "I'm good at developing comprehensive plans to advance multiple objectives simultaneously."
  },
  'test.newquestion.19': {
    zh: "我重视个人的自由选择，会追求让自己开心的事。",
    en: "I value personal freedom and pursue what brings me genuine happiness."
  },
  'test.newquestion.20': {
    zh: "我解决问题时能同时考虑多个角度和方法。",
    en: "I can consider multiple perspectives and approaches when solving problems."
  },
  'test.newquestion.21': {
    zh: "我经常有深刻的领悟或情感上的突破。",
    en: "I often experience profound insights or emotional breakthroughs."
  },
  'test.newquestion.22': {
    zh: "我喜欢按照既定的步骤做事，确保结果可控。",
    en: "I prefer following established procedures to ensure predictable outcomes."
  },
  'test.newquestion.23': {
    zh: "我容易感受到生活中的奇妙时刻和有意义的巧合。",
    en: "I'm sensitive to meaningful coincidences and magical moments in life."
  },
  'test.newquestion.24': {
    zh: "我善于抓住机会，快速采取行动。",
    en: "I'm quick to seize opportunities and take action when they present themselves."
  },
  'test.newquestion.25': {
    zh: "我坚持自己的理想和信念，也尊重他人的追求。",
    en: "I stay true to my ideals and beliefs while respecting those of others."
  },
  'test.newquestion.26': {
    zh: "我会仔细分析不符合原则的事物，找出问题所在。",
    en: "I carefully analyze things that don't align with established principles."
  },
  'test.newquestion.27': {
    zh: "我习惯通过长期观察来确定什么是可靠的标准。",
    en: "I rely on long-term observation to determine what's reliable and standard."
  },
  'test.newquestion.28': {
    zh: "我对事物背后的深层含义和象征意义很感兴趣。",
    en: "I'm drawn to the deeper symbolic meanings and patterns behind things."
  },
  'test.newquestion.29': {
    zh: "我善于观察形势，了解在不同场合应该如何表现。",
    en: "I'm good at reading situations and knowing how to conduct myself appropriately."
  },
  'test.newquestion.30': {
    zh: "我喜欢不断探索新的想法，不愿被固定思维限制。",
    en: "I enjoy exploring new ideas and refuse to be confined by conventional thinking."
  },
  'test.newquestion.31': {
    zh: "我习惯用清晰的逻辑推理来分析问题。",
    en: "I habitually use clear logical reasoning to analyze situations."
  },
  'test.newquestion.32': {
    zh: "我善于照顾他人，让大家感到舒适自在。",
    en: "I'm naturally good at caring for others and making them feel comfortable."
  },
  'test.newquestion.33': {
    zh: "我擅长教导他人用更有效率的方式完成工作。",
    en: "I excel at teaching others how to complete tasks more efficiently."
  },
  'test.newquestion.34': {
    zh: "我重视与团队成员的沟通，致力于建立团结的氛围。",
    en: "I value team communication and work to build a sense of unity."
  },
  'test.newquestion.35': {
    zh: "我喜欢完善和改进已有的想法，使其更加严密。",
    en: "I enjoy refining and improving existing ideas to make them more precise."
  },
  'test.newquestion.36': {
    zh: "我经常反思什么是真正重要的，什么是值得坚持的。",
    en: "I regularly reflect on what's truly important and worth pursuing."
  },
  'test.newquestion.37': {
    zh: "我善于将不同领域的经验和想法融入当前工作中。",
    en: "I'm skilled at integrating experiences and ideas from different domains into my current work."
  },
  'test.newquestion.38': {
    zh: "我的存在往往能影响周围的氛围，推动事情向前发展。",
    en: "My presence tends to influence the atmosphere and drive things forward."
  },
  'test.newquestion.39': {
    zh: "我会有意识地调整自己，以适应未来的挑战。",
    en: "I consciously adapt myself to meet future challenges."
  },
  'test.newquestion.40': {
    zh: "我享受有规律的生活节奏，保持稳定的工作状态。",
    en: "I enjoy maintaining a regular, stable rhythm in my work and life."
  },
  'test.newquestion.41': {
    zh: "我容易与他人建立深层的情感联系。",
    en: "I easily form deep emotional connections with others."
  },
  'test.newquestion.42': {
    zh: "我更相信客观的评判标准，而不是主观感受。",
    en: "I trust objective criteria more than subjective feelings."
  },
  'test.newquestion.43': {
    zh: "我会经常检查自己的选择是否符合内心的价值观。",
    en: "I frequently check if my choices align with my core values."
  },
  'test.newquestion.44': {
    zh: "我喜欢研究事物的运作原理，理解其中的逻辑。",
    en: "I enjoy understanding how things work and their underlying logic."
  },
  'test.newquestion.45': {
    zh: "我愿意挑战自己的思维局限，追求创新的突破。",
    en: "I'm willing to challenge my mental limits and pursue innovative breakthroughs."
  },
  'test.newquestion.46': {
    zh: "我善于发现现状与过去的差异，并思考其中的含义。",
    en: "I'm good at identifying differences between current and past situations, and understanding their implications."
  },
  'test.newquestion.47': {
    zh: "我喜欢寻找多种解决问题的方法，而不仅仅满足于常规方案。",
    en: "I enjoy finding multiple ways to solve a problem, not just settling for conventional solutions."
  },
  'test.newquestion.48': {
    zh: "我能自然地配合他人的节奏，保持良好的互动。",
    en: "I naturally synchronize with others' rhythms and maintain good interactions."
  },
  'dimension.extraversion': {
    zh: '外向',
    en: 'Extraversion'
  },
  'dimension.introversion': {
    zh: '内向',
    en: 'Introversion'
  },
  'dimension.sensing': {
    zh: '感觉',
    en: 'Sensing'
  },
  'dimension.intuition': {
    zh: '直觉',
    en: 'Intuition'
  },
  'dimension.thinking': {
    zh: '思考',
    en: 'Thinking'
  },
  'dimension.feeling': {
    zh: '情感',
    en: 'Feeling'
  },
  'dimension.judging': {
    zh: '判断',
    en: 'Judging'
  },
  'dimension.perceiving': {
    zh: '感知',
    en: 'Perceiving'
  },
  'result.suitableCareersDescription': {
    zh: '基于你的MBTI类型特质，以下职业方向可能非常适合你的性格和能力：',
    en: 'Based on your MBTI type traits, the following career paths may be particularly suitable for your personality and abilities:'
  },
  'result.careerMatchReason': {
    zh: '作为{career}，你可以充分发挥你的天赋优势，在这个领域中实现自我价值并获得职业成就感。',
    en: 'As a {career}, you can fully utilize your natural talents, achieve self-fulfillment and gain a sense of professional accomplishment in this field.'
  },
  'career.INTJ.career.1.description': {
    zh: '战略咨询顾问可以充分发挥你的系统思维和未来导向能力，帮助组织规划长期发展路径。',
    en: 'Strategic consulting advisors can fully leverage your systems thinking and future-oriented abilities to help organizations plan long-term development paths.'
  },
  'career.INTJ.career.2.description': {
    zh: '系统架构师需要你的逻辑分析和创新能力，设计复杂系统架构并解决技术挑战。',
    en: 'System architects need your logical analysis and innovative capabilities to design complex system architectures and solve technical challenges.'
  },
  'career.INTJ.career.3.description': {
    zh: '数据科学家能充分利用你的分析能力和洞察力，从复杂数据中发现有价值的模式和趋势。',
    en: 'Data scientists can fully utilize your analytical abilities and insights to discover valuable patterns and trends from complex data.'
  },
  'career.INTJ.career.4.description': {
    zh: '投资分析师需要你的战略思维和远见卓识，评估投资风险并做出明智的财务决策。',
    en: 'Investment analysts need your strategic thinking and foresight to assess investment risks and make informed financial decisions.'
  },
  'career.INTJ.career.5.description': {
    zh: '科研工作者能满足你对知识的追求和解决复杂问题的热情，让你在专业领域深入探索。',
    en: 'Research scientists can satisfy your pursuit of knowledge and passion for solving complex problems, allowing you to explore deeply in professional fields.'
  },
  'career.ESFP.career.1.description': {
    zh: '娱乐表演者能让你充分展示你的自然魅力和表达天赋，在舞台上感受观众的即时反馈。',
    en: 'Entertainment performers allow you to fully showcase your natural charm and expressive talents, feeling immediate audience feedback on stage.'
  },
  'career.ESFP.career.2.description': {
    zh: '销售代表角色能让你利用你的人际魅力和说服能力，在与客户面对面接触中获得成就感。',
    en: 'Sales representative roles allow you to leverage your interpersonal charm and persuasive abilities, gaining satisfaction from face-to-face client interactions.'
  },
  'career.ESFP.career.3.description': {
    zh: '活动策划师职业让你发挥创意和组织能力，创造令人难忘的体验并享受即时的积极反馈。',
    en: 'Event planner careers let you use your creativity and organizational ability to create memorable experiences and enjoy immediate positive feedback.'
  },
  'career.ESFP.career.4.description': {
    zh: '旅游导游工作能让你与各种人互动，分享你的热情和知识，并体验不同的环境和文化。',
    en: 'Tour guide jobs allow you to interact with various people, share your enthusiasm and knowledge, and experience different environments and cultures.'
  },
  'career.ESFP.career.5.description': {
    zh: '酒店与餐饮管理职位让你在充满活力的社交环境中工作，运用你解决问题的能力提供卓越服务。',
    en: 'Hospitality and restaurant management positions let you work in vibrant social environments, using your problem-solving abilities to provide excellent service.'
  },
  'mbti.INTJ.overview': {
    zh: 'INTJ型人格以其战略思维、独立性和渴望改进系统而著称。你擅长看到全局，识别模式，并为复杂问题开发长期解决方案。你重视知识和能力，追求持续的自我提升，并以高标准要求自己和他人。',
    en: 'INTJ personalities are known for their strategic thinking, independence, and desire to improve systems. You excel at seeing the big picture, identifying patterns, and developing long-term solutions for complex problems. You value knowledge and competence, pursue continuous self-improvement, and have high standards for yourself and others.'
  },
  'mbti.INTP.overview': {
    zh: 'INTP型人格以其逻辑思维、对概念的热爱和不断探索未知的驱动力而闻名。你擅长发现复杂问题的解决方案，喜欢挑战传统思维，并寻求对世界运作原理的深刻理解。你重视知识自由，偏好独立工作，并欣赏创新和原创性思维。',
    en: 'INTP personalities are known for their logical thinking, love of concepts, and drive to explore the unknown. You excel at finding solutions to complex problems, enjoy challenging conventional thinking, and seek deep understanding of how the world works. You value intellectual freedom, prefer working independently, and appreciate innovation and original thinking.'
  },
  'mbti.ENTJ.overview': {
    zh: 'ENTJ型人格以其决断力、战略性思维和领导能力著称。你擅长组织资源、制定长期计划并指导他人实现共同目标。你重视效率和能力，积极追求进步，并愿意做出艰难决策以确保成功。',
    en: 'ENTJ personalities are known for their decisiveness, strategic thinking, and leadership abilities. You excel at organizing resources, creating long-term plans, and guiding others toward shared goals. You value efficiency and competence, actively pursue progress, and are willing to make tough decisions to ensure success.'
  },
  'mbti.ENTP.overview': {
    zh: 'ENTP型人格以其创新思维、辩论技巧和对可能性的热情而著称。你擅长发现新机会、挑战传统观念并生成创造性解决方案。你重视智力刺激，喜欢多样化的项目，并在不断变化的环境中茁壮成长。',
    en: 'ENTP personalities are known for their innovative thinking, debating skills, and enthusiasm for possibilities. You excel at spotting new opportunities, challenging traditional ideas, and generating creative solutions. You value intellectual stimulation, enjoy variety in projects, and thrive in constantly changing environments.'
  },
  'mbti.INFJ.overview': {
    zh: 'INFJ型人格以其深刻的洞察力、强烈的同理心和对意义追求而著称。你擅长理解他人的感受和动机，并帮助他们实现个人成长。你重视真实的联系，致力于对他人和社会产生积极影响，并在工作中寻求深层意义和目标。',
    en: 'INFJ personalities are known for their deep insights, strong empathy, and pursuit of meaning. You excel at understanding others\' feelings and motivations, and helping them achieve personal growth. You value authentic connections, are dedicated to making a positive impact on others and society, and seek profound meaning and purpose in your work.'
  },
  'mbti.INFP.overview': {
    zh: 'INFP型人格以其理想主义、强烈的个人价值观和创造性思维而著称。你擅长发现他人的潜力，表达复杂情感，并创造有意义的作品。你重视真实性和和谐，追求个人成长，并致力于与自己的核心信念保持一致。',
    en: 'INFP personalities are known for their idealism, strong personal values, and creative thinking. You excel at seeing potential in others, expressing complex emotions, and creating meaningful work. You value authenticity and harmony, pursue personal growth, and are committed to staying true to your core beliefs.'
  },
  'mbti.ENFJ.overview': {
    zh: 'ENFJ型人格以其强大的沟通能力、同理心和激励他人的天赋而著称。你擅长营造团队和谐、识别他人的潜力并帮助他们成长。你重视真诚的联系，渴望为他人的生活带来积极影响，并在促进集体幸福方面表现出色。',
    en: 'ENFJ personalities are known for their strong communication skills, empathy, and gift for inspiring others. You excel at fostering team harmony, recognizing others\' potential, and helping them grow. You value genuine connections, desire to make a positive impact on the lives of others, and excel at promoting collective well-being.'
  },
  'mbti.ENFP.overview': {
    zh: 'ENFP型人格以其热情、创造力和对可能性的热爱而著称。你擅长与各种人建立联系、发现新机会并激励他人实现其潜力。你重视自由和真实性，寻求多样化的体验，并享受将创新想法转化为现实的过程。',
    en: 'ENFP personalities are known for their enthusiasm, creativity, and love of possibilities. You excel at connecting with diverse people, spotting new opportunities, and inspiring others to realize their potential. You value freedom and authenticity, seek varied experiences, and enjoy transforming innovative ideas into reality.'
  },
  'mbti.ISTJ.overview': {
    zh: 'ISTJ型人格以其可靠性、责任心和实际的问题解决能力而著称。你擅长创建有序系统、关注细节并确保工作完成。你重视传统和稳定性，依靠过去的经验做出决策，并以完成承诺和维护高标准为荣。',
    en: 'ISTJ personalities are known for their reliability, sense of duty, and practical problem-solving abilities. You excel at creating orderly systems, attending to details, and ensuring tasks are completed. You value tradition and stability, rely on past experiences to make decisions, and take pride in fulfilling commitments and maintaining high standards.'
  },
  'mbti.ISFJ.overview': {
    zh: 'ISFJ型人格以其细心、忠诚和踏实的性格特点而著称。你擅长关注他人需求、维护传统并创造安全舒适的环境。你重视稳定和和谐，努力为所爱的人提供实际支持，并通过细致入微的关怀和服务表达关心。',
    en: 'ISFJ personalities are known for their attentiveness, loyalty, and down-to-earth nature. You excel at anticipating others\' needs, upholding traditions, and creating safe, comfortable environments. You value stability and harmony, work hard to provide practical support for those you care about, and express concern through thoughtful care and service.'
  },
  'mbti.ESTJ.overview': {
    zh: 'ESTJ型人格以其组织能力、务实态度和对结构的偏好而著称。你擅长实施系统、管理资源并确保按时完成任务。你重视效率和可靠性，喜欢明确的规则和责任，并勇于承担领导角色以确保团队达到目标。',
    en: 'ESTJ personalities are known for their organizational abilities, practical mindset, and preference for structure. You excel at implementing systems, managing resources, and ensuring tasks are completed on time. You value efficiency and reliability, appreciate clear rules and responsibilities, and willingly take on leadership roles to ensure teams meet their objectives.'
  },
  'mbti.ESFJ.overview': {
    zh: 'ESFJ型人格以其热情友好、关怀他人和组织能力而著称。你擅长创造和谐环境、满足他人的实际需求并保持社交联系。你重视合作和传统，注重维护良好关系，并从帮助和支持他人中获得满足感。',
    en: 'ESFJ personalities are known for their warmth, care for others, and organizational abilities. You excel at creating harmonious environments, meeting others\' practical needs, and maintaining social connections. You value cooperation and tradition, place importance on maintaining good relationships, and find fulfillment in helping and supporting others.'
  },
  'mbti.ISTP.overview': {
    zh: 'ISTP型人格以其实用性、适应力和解决问题的能力而著称。你擅长理解系统如何运作、处理危机并高效运用工具和资源。你重视独立和自由，喜欢动手实践，并在需要临场应变的情况下表现出色。',
    en: 'ISTP personalities are known for their practicality, adaptability, and problem-solving abilities. You excel at understanding how systems work, handling crises, and using tools and resources efficiently. You value independence and freedom, enjoy hands-on experiences, and thrive in situations that require thinking on your feet.'
  },
  'mbti.ISFP.overview': {
    zh: 'ISFP型人格以其艺术敏感性、真实表达和对生活美学的欣赏而著称。你擅长创造美丽的事物、体验当下并表达深刻的情感。你重视个人自由和真实性，以自己独特的方式欣赏美，并通常在艺术和设计等创造性领域表现出色。',
    en: 'ISFP personalities are known for their artistic sensitivity, authentic expression, and appreciation for life\'s aesthetics. You excel at creating beautiful things, experiencing the present moment, and expressing deep emotions. You value personal freedom and authenticity, appreciate beauty in your own unique way, and often excel in creative fields like art and design.'
  },
  'mbti.ESTP.overview': {
    zh: 'ESTP型人格以其活力四射、实用性和冒险精神而著称。你擅长快速解决问题、把握机会并在压力下表现出色。你重视自由和体验，喜欢实际行动而非理论，并擅长适应不断变化的环境和状况。',
    en: 'ESTP personalities are known for their energy, practicality, and adventurous spirit. You excel at solving problems quickly, seizing opportunities, and performing well under pressure. You value freedom and experiences, prefer practical action over theory, and are skilled at adapting to ever-changing environments and situations.'
  },
  'mbti.ESFP.overview': {
    zh: 'ESFP型人格以其热情洋溢、社交能力和对生活的热爱而著称。你擅长创造愉快体验、与各类人交流并为当下带来活力。你重视自由表达和享受生活，喜欢与他人分享积极情感，并在提升团队氛围方面发挥重要作用。',
    en: 'ESFP personalities are known for their enthusiasm, social skills, and zest for life. You excel at creating enjoyable experiences, connecting with all types of people, and bringing energy to the present moment. You value free expression and enjoying life, like sharing positive emotions with others, and play a vital role in lifting team spirits.'
  },
  // MBTI关系分析内容
  'mbti.ESFP.communication': {
    zh: 'ESFP在沟通中往往活力四射、生动直接。你喜欢面对面交流，善于运用手势、表情和语调变化来增强表达效果。你的沟通风格注重实用性和娱乐性，倾向于用生动的故事和实例来说明观点，而非抽象理论。在沟通中，你通常乐于分享个人经历，并且善于创造轻松愉快的氛围，让对话充满活力。',
    en: 'As an ESFP, you tend to be energetic, vivid, and direct in communication. You prefer face-to-face interactions and are skilled at using gestures, expressions, and tone variations to enhance your expression. Your communication style emphasizes practicality and entertainment, tending to illustrate points with lively stories and examples rather than abstract theories. In communication, you generally enjoy sharing personal experiences and excel at creating a relaxed, pleasant atmosphere that makes conversations vibrant.'
  },
  'mbti.ESFP.romantic': {
    zh: 'ESFP在恋爱关系中通常热情而富有表现力。你重视情感体验的质量和强度，喜欢通过行动和体贴的小惊喜来表达爱意。你的恋爱风格注重当下的快乐和共同体验，而不是长远的规划。作为伴侣，你通常会给对方带来活力和乐趣，善于发现并创造特别的时刻。你渴望真实的情感连接，并希望伴侣欣赏你的自发性和乐观态度。',
    en: 'In romantic relationships, you as an ESFP are typically passionate and expressive. You value the quality and intensity of emotional experiences and enjoy expressing love through actions and thoughtful surprises. Your dating style focuses on present happiness and shared experiences rather than long-term planning. As a partner, you usually bring vitality and joy to your significant other, excelling at discovering and creating special moments. You crave authentic emotional connections and hope your partner appreciates your spontaneity and optimistic attitude.'
  },
  'mbti.ESFP.friendship': {
    zh: 'ESFP作为朋友通常慷慨且富有感染力。你享受与朋友共度时光，尤其是进行有趣的活动和体验。你的友谊风格注重忠诚和真诚，愿意为朋友提供实际帮助和情感支持。你通常是社交圈中的"生活助燃剂"，有能力让聚会更加活跃，并帮助朋友们敞开心扉。你重视友谊中的自由和接纳，欣赏能够与你一起享受生活并接受你本真性格的朋友。',
    en: 'As an ESFP friend, you are typically generous and infectious in your enthusiasm. You enjoy spending time with friends, especially engaging in fun activities and experiences. Your friendship style emphasizes loyalty and sincerity, willingly providing practical help and emotional support to friends. You are often the "life enhancer" in social circles, with the ability to make gatherings more lively and help friends open up. You value freedom and acceptance in friendships, appreciating friends who can enjoy life with you and accept your authentic personality.'
  },
  'mbti.ESFP.parenting': {
    zh: 'ESFP作为父母通常充满活力且具有感染力。你的养育风格注重乐趣和体验，喜欢通过实际活动来教导子女。你通常能够创造一个活跃且充满爱的家庭环境，鼓励孩子探索世界和表达自我。作为父母，你倾向于灵活和适应性强，能够理解每个孩子的独特需求。你重视与孩子建立真实的情感联系，并通过自己的行动教导他们享受生活和关爱他人的价值。',
    en: 'As an ESFP parent, you are typically energetic and inspiring. Your parenting style emphasizes fun and experience, preferring to teach children through practical activities. You usually create an active and loving family environment that encourages children to explore the world and express themselves. As a parent, you tend to be flexible and adaptive, able to understand each child\'s unique needs. You value establishing authentic emotional connections with your children and teach them the value of enjoying life and caring for others through your own actions.'
  },

  // 为其他类型添加相似内容（可以根据各类型特点调整）
  'mbti.INFJ.communication': {
    zh: 'INFJ的沟通风格通常深思熟虑、富有洞察力且温和。他们倾向于寻找对话中的深层含义和模式，经常使用隐喻和类比来表达复杂想法。虽然在群体中可能较为安静，但在一对一交流或讨论重要话题时，他们会变得热情且富有表现力。INFJs善于倾听，能够敏锐地感知他人未说出口的感受，这使他们成为出色的调解者和顾问。',
    en: 'INFJs communicate in a thoughtful, insightful, and gentle manner. They tend to look for deeper meanings and patterns in conversations, often using metaphors and analogies to express complex ideas. While they may be quiet in groups, they become passionate and expressive in one-on-one interactions or when discussing meaningful topics. INFJs are excellent listeners who can perceive unspoken feelings acutely, making them outstanding mediators and counselors.'
  },
  'mbti.INFJ.romantic': {
    zh: 'INFJ在恋爱关系中寻求深度的情感和精神连接。他们倾向于慎重选择伴侣，珍视真诚、相互理解和共同的价值观。一旦建立连接，INFJ会全心投入，对伴侣极度忠诚和体贴。他们往往在关系中寻求长期承诺和持续成长。理想的伴侣会尊重他们的独立性和深度，同时愿意分享内心世界。由于他们敏感的本性，INFJ可能需要伴侣提供情感安全感和理解。',
    en: 'In romantic relationships, INFJs seek profound emotional and spiritual connections. They tend to be selective about partners, valuing authenticity, mutual understanding, and shared values. Once connected, INFJs invest deeply, showing extreme loyalty and thoughtfulness toward their partners. They typically seek long-term commitment and continuous growth in relationships. An ideal partner respects their independence and depth while being willing to share their inner world. Due to their sensitive nature, INFJs may need emotional security and understanding from their partners.'
  },
  'mbti.INFJ.friendship': {
    zh: 'INFJ通常拥有精心选择的小圈子朋友，而非广泛的社交网络。他们在友谊中寻求真实性和深度，宁愿与少数几个亲密朋友建立持久的联系，而非维持众多表面关系。作为朋友，INFJ可靠、支持性强且善于洞察，能够为他们所关心的人提供宝贵的指导和情感支持。虽然他们可能需要独处时间来恢复能量，但他们非常重视与亲密朋友的联系，并愿意为这些关系投入大量精力。',
    en: 'INFJs typically maintain a carefully selected small circle of friends rather than an extensive social network. They seek authenticity and depth in friendships, preferring to establish lasting connections with a few close friends rather than maintaining numerous superficial relationships. As friends, INFJs are reliable, supportive, and insightful, offering valuable guidance and emotional support to those they care about. While they may need alone time to recharge, they greatly value connections with close friends and willingly invest significant energy in these relationships.'
  },
  'mbti.INFJ.parenting': {
    zh: 'INFJ父母通常富有洞察力、关怀备至且注重孩子的个人成长。他们创造一个支持性的环境，鼓励孩子探索自己的兴趣和才能，同时培养强烈的价值观和同理心。INFJ父母善于识别孩子的独特需求和潜力，能够提供情感指导和深度交流。他们可能会为孩子设定较高期望，特别是在道德和人格发展方面，并通过榜样而非严格规则来教导。虽然他们偶尔需要独处来恢复精力，但他们对家庭生活的投入和奉献使他们成为温暖且有影响力的父母。',
    en: 'INFJ parents are typically insightful, nurturing, and focused on their children\'s personal growth. They create a supportive environment that encourages children to explore their interests and talents while developing strong values and empathy. INFJ parents excel at identifying their children\'s unique needs and potential, providing emotional guidance and meaningful conversation. They may set high expectations, particularly regarding moral and character development, teaching through example rather than strict rules. Although they occasionally need solitude to recharge, their commitment and dedication to family life make them warm and influential parents.'
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