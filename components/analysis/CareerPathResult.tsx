'use client';

import { CareerAnalysis } from './careerAnalysis';
import Image from 'next/image';
import { useLanguage } from '../../app/contexts/LanguageContext';

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
  const { t } = useLanguage();
  
  // 根据MBTI类型生成职业描述
  const generateDescription = (type: string) => {
    if (type === 'INTJ') {
      return [
        t('career.description.INTJ.1'),
        t('career.description.INTJ.2'),
        t('career.description.INTJ.3')
      ];
    } else if (type === 'INTP') {
      return [
        t('career.description.INTP.1'),
        t('career.description.INTP.2'),
        t('career.description.INTP.3')
      ];
    } else {
      return [
        t('career.description.default.1'),
        t('career.description.default.2'),
        t('career.description.default.3')
      ];
    }
  };

  const description = generateDescription(mbtiType);

  // 完整特质数据 - 删除锁定状态，使所有特质可见
  const traits = [
    { name: t('career.trait.perfectionism'), level: 2, icon: <PerfectionismIcon />, iconClass: "trait-1" },
    { name: t('career.trait.ambition'), level: 3, icon: <AmbitionIcon />, iconClass: "trait-2" },
    { name: t('career.trait.motivation'), level: 2, icon: <MotivationIcon />, iconClass: "trait-3" },
    { name: t('career.trait.leadership'), level: 2, icon: <LeadershipIcon />, iconClass: "trait-4" }
  ];

  // 处理职业分析数据中的翻译键
  const translatedCareerData = {
    strengths: careerData.strengths.map(key => t(key)),
    workEnvironment: t(careerData.workEnvironment),
    teamRole: t(careerData.teamRole),
    leadershipStyle: t(careerData.leadershipStyle),
    challenges: careerData.challenges.map(key => t(key)),
    recommendations: careerData.recommendations.map(key => t(key)),
    suitableCareers: careerData.suitableCareers.map(key => t(key))
  };

  // 将优势分组为两列
  const strengthsLeft = translatedCareerData.strengths.slice(0, Math.ceil(translatedCareerData.strengths.length / 2));
  const strengthsRight = translatedCareerData.strengths.slice(Math.ceil(translatedCareerData.strengths.length / 2));

  // 生成优势标题
  const generateStrengthTitle = (index: number) => {
    const titles = [
      t('career.strength.problemSolving'),
      t('career.strength.adaptiveThinking'),
      t('career.strength.strategicPlanning'),
      t('career.strength.systemAnalysis'),
      t('career.strength.innovativeThinking'),
      t('career.strength.decisionMaking'),
      t('career.strength.teamwork'),
      t('career.strength.leadership')
    ];
    return titles[index % titles.length];
  };

  // 工作环境和团队角色信息
  const workDetails = [
    { title: t('career.idealWorkEnvironment'), content: translatedCareerData.workEnvironment },
    { title: t('career.teamRole'), content: translatedCareerData.teamRole },
    { title: t('career.leadershipStyle'), content: translatedCareerData.leadershipStyle }
  ];

  return (
    <section className="career-path-section">
      {/* 标题部分 */}
      <div className="career-path-header">
        <div className="section-number">2</div>
        <h2 className="section-title">{t('career.title')}</h2>
      </div>

      {/* 职业描述部分 */}
      <div className="career-path-description">
        {description.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      {/* 特质部分 */}
      <div className="traits-section">
        <h3 className="section-subtitle">{t('career.traits')}</h3>
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
        <h3 className="section-subtitle">{t('career.workAndTeam')}</h3>
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
        <h3 className="section-subtitle">{t('career.strengths')}</h3>
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
        <h3 className="section-subtitle">{t('career.recommendedCareers')}</h3>
        <div className="careers-grid">
          {translatedCareerData.suitableCareers.map((career, index) => (
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