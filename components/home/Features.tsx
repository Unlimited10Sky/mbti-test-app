import { FaChartLine, FaBrain, FaUserFriends, FaBriefcase } from 'react-icons/fa';

export default function Features() {
  const features = [
    {
      id: 1,
      icon: <FaChartLine className="h-6 w-6 text-[#0071e3]" />,
      title: "详尽的数据分析",
      description: "基于大样本数据，通过科学算法，为你提供准确的性格分析结果，深入解析你的思考和行为模式。"
    },
    {
      id: 2,
      icon: <FaBrain className="h-6 w-6 text-[#0071e3]" />,
      title: "认知功能解析",
      description: "全面分析你的认知功能偏好，包括内向/外向、感觉/直觉、思考/情感和判断/知觉四个维度。"
    },
    {
      id: 3,
      icon: <FaUserFriends className="h-6 w-6 text-[#0071e3]" />,
      title: "人际关系指导",
      description: "了解不同性格类型之间的相互影响，找到最适合你的社交方式和人际关系模式。"
    },
    {
      id: 4,
      icon: <FaBriefcase className="h-6 w-6 text-[#0071e3]" />,
      title: "职业发展规划",
      description: "基于你的性格类型，推荐最适合你的职业方向和工作环境，帮助你在职场中发挥最大潜能。"
    }
  ];

  return (
    <section id="features" className="bg-white section">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="heading">我们的优势</h2>
          <p className="subheading mx-auto">
            专业、科学、全面的性格分析系统，为你提供深入的自我认知和成长指导
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {features.map((feature) => (
            <div key={feature.id} className="bg-[#f5f5f7] rounded-2xl p-8 transition-all duration-300 hover:shadow-lg">
              <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mb-6 shadow-sm">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-[#1d1d1f] mb-3">{feature.title}</h3>
              <p className="text-[#86868b]">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-[#0071e3] to-[#007aff] rounded-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            <div className="p-8 lg:p-12 flex-1">
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">探索你的性格类型</h3>
              <p className="text-white/80 mb-6">
                通过完成我们的MBTI测试，你将获得对自己性格的深刻洞察。了解你在四个维度上的偏好如何塑造你的思维和行为模式。
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">内向 vs 外向</h4>
                  <p className="text-white/70 text-sm">能量来源与注意力方向</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">感觉 vs 直觉</h4>
                  <p className="text-white/70 text-sm">信息获取与认知方式</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">思考 vs 情感</h4>
                  <p className="text-white/70 text-sm">决策与判断偏好</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">判断 vs 知觉</h4>
                  <p className="text-white/70 text-sm">生活方式与外部世界互动</p>
                </div>
              </div>
            </div>
            <div className="flex-1 bg-[#f5f5f7]/10 p-8 lg:p-12 flex items-center justify-center">
              <div className="grid grid-cols-4 gap-2 w-full max-w-sm">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div 
                    key={i} 
                    className="aspect-square bg-white/20 rounded-md flex items-center justify-center text-white font-bold text-xs"
                  >
                    {["INTJ", "INTP", "ENTJ", "ENTP", "INFJ", "INFP", "ENFJ", "ENFP", "ISTJ", "ISFJ", "ESTJ", "ESFJ", "ISTP", "ISFP", "ESTP", "ESFP"][i]}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 