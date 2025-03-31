'use client';

import { CareerAnalysis } from './careerAnalysis';
import Image from 'next/image';

// SVG图标组件
const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

const PerfectionismIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
  </svg>
);

const AmbitionIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
  </svg>
);

const MotivationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
  </svg>
);

const LeadershipIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const UnlockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

interface CareerPathResultProps {
  mbtiType: string;
  careerData: CareerAnalysis;
  isPremium?: boolean;
}

export default function CareerPathResult({ mbtiType, careerData, isPremium = false }: CareerPathResultProps) {
  // 根据MBTI类型生成职业描述
  const generateDescription = (type: string) => {
    const descriptions: Record<string, string[]> = {
      'INTJ': [
        "在你的职业生涯中，你在需要战略思考和系统分析的环境中表现最佳。",
        "你天生具备理解复杂系统的能力，这使你成为解决棘手问题的宝贵人才。你在需要深入思考和创新解决方案的角色中表现突出，通常成为团队中的战略规划者。",
        "然而，你对自主性的强烈渴望可能使传统办公环境变得具有挑战性，你可能会发现自己在过于程序化或缺乏创新的角色中感到不满。你理想的职业应当允许你应用你的分析能力，在动态环境中解决复杂问题，并提供一定程度的独立性。"
      ],
      'INTP': [
        "在你的职业生涯中，你在提供动手实践和切实成果的环境中茁壮成长。",
        "你理解复杂系统的天赋使你成为各个领域不可或缺的问题解决者，从机械到计算机科学。你在需要快速思考和实用解决方案的角色中表现出色，经常成为危机情况中的首选人选。",
        "然而，你对自主性的强烈渴望可能使传统办公环境变得具有挑战性，你可能会发现自己在过于程序化或抽象理论化的角色中感到不安。你理想的职业允许你在动态、不断变化的情境中应用你的技能，提供自由地用你独特的方式处理任务的机会。"
      ],
      'default': [
        "在你的职业生涯中，你在能够充分发挥你独特能力和兴趣的环境中表现最佳。",
        "你的天赋和技能使你能够在特定领域做出重要贡献。你可能在需要你核心优势的角色中表现突出，并能在团队中发挥重要作用。",
        "理想的职业道路应当与你的价值观一致，提供适当的挑战，并允许你持续成长和发展你的技能。寻找能欣赏你独特贡献的环境至关重要。"
      ]
    };

    return descriptions[type] || descriptions['default'];
  };

  const description = generateDescription(mbtiType);

  // 完整特质数据 - 删除锁定状态，使所有特质可见
  const traits = [
    { name: "完美主义", level: 2, icon: <PerfectionismIcon />, iconClass: "trait-1" },
    { name: "野心", level: 3, icon: <AmbitionIcon />, iconClass: "trait-2" },
    { name: "动力", level: 2, icon: <MotivationIcon />, iconClass: "trait-3" },
    { name: "领导欲望", level: 2, icon: <LeadershipIcon />, iconClass: "trait-4" }
  ];

  // 将优势分组为两列
  const strengthsLeft = careerData.strengths.slice(0, Math.ceil(careerData.strengths.length / 2));
  const strengthsRight = careerData.strengths.slice(Math.ceil(careerData.strengths.length / 2));

  // 生成优势标题
  const generateStrengthTitle = (index: number) => {
    const titles = [
      "实用问题解决",
      "适应性思维",
      "战略规划",
      "系统分析",
      "创新思考",
      "决策能力",
      "团队协作",
      "领导影响力"
    ];
    return titles[index % titles.length];
  };

  // 工作环境和团队角色信息
  const workDetails = [
    { title: "理想工作环境", content: careerData.workEnvironment },
    { title: "团队中的角色", content: careerData.teamRole },
    { title: "领导风格", content: careerData.leadershipStyle }
  ];

  return (
    <section className="career-path-section">
      {/* 标题部分 */}
      <div className="career-path-header">
        <div className="section-number">2</div>
        <h2 className="section-title">职业发展路径</h2>
      </div>

      {/* 职业描述部分 */}
      <div className="career-path-description">
        {description.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      {/* 特质部分 */}
      <div className="traits-section">
        <h3 className="section-subtitle">影响力特质</h3>
        <div className="traits-grid">
          {traits.map((trait, index) => (
            <div key={index} className="trait-item">
              <div className={`trait-icon-container ${trait.iconClass}`}>
                {trait.icon}
              </div>
              <div className="trait-name">
                {trait.name}
                <span className="trait-level">{trait.level}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 工作环境和团队角色部分 */}
      <div className="work-details-section">
        <h3 className="section-subtitle">工作环境与团队角色</h3>
        <div className="work-details-grid">
          {workDetails.map((detail, index) => (
            <div key={index} className="work-detail-item">
              <h4 className="work-detail-title">{detail.title}</h4>
              <p className="work-detail-content">{detail.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 优势部分 */}
      <div className="strengths-section">
        <h3 className="section-subtitle">你的优势</h3>
        <div className="strengths-grid">
          <div>
            {strengthsLeft.map((strength, index) => (
              <div key={index} className="strength-item">
                <div className="strength-icon">
                  <CheckIcon />
                </div>
                <div className="strength-content">
                  <h4>{generateStrengthTitle(index)}</h4>
                  <p>{strength}</p>
                </div>
              </div>
            ))}
          </div>
          <div>
            {strengthsRight.map((strength, index) => (
              <div key={index} className="strength-item">
                <div className="strength-icon">
                  <CheckIcon />
                </div>
                <div className="strength-content">
                  <h4>{generateStrengthTitle(index + strengthsLeft.length)}</h4>
                  <p>{strength}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 职业推荐部分 */}
      <div className="careers-section">
        <h3 className="section-subtitle">推荐职业方向</h3>
        <div className="careers-grid">
          {careerData.suitableCareers.map((career, index) => (
            <div key={index} className="career-item">
              <span className="career-number">{index + 1}</span>
              <span className="career-name">{career}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 