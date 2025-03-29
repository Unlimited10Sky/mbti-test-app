import { FaCheck } from 'react-icons/fa';

export default function Pricing() {
  const plans = [
    {
      id: 1,
      name: "基础版",
      price: "免费",
      description: "了解你的基本MBTI类型",
      features: [
        "完整的MBTI测试评估",
        "16种性格类型结果",
        "基础的类型描述",
        "基础的强项分析"
      ],
      buttonText: "开始免费测试",
      buttonLink: "#test",
      highlighted: false
    },
    {
      id: 2,
      name: "专业版",
      price: "￥99",
      description: "深入了解你的性格特质",
      features: [
        "包含基础版全部功能",
        "详细的性格类型描述",
        "认知功能深度分析",
        "个性化的职业发展建议",
        "人际关系模式指导",
        "个人成长策略",
        "性格优势完整解析",
        "PDF格式完整报告"
      ],
      buttonText: "升级到专业版",
      buttonLink: "#",
      highlighted: true
    },
    {
      id: 3,
      name: "专家咨询版",
      price: "￥299",
      description: "获得专业人士的个性化指导",
      features: [
        "包含专业版全部功能",
        "与认证心理咨询师1对1视频咨询（60分钟）",
        "个性化成长计划制定",
        "职业规划专业建议",
        "关系提升策略咨询",
        "后续电子邮件支持（30天）"
      ],
      buttonText: "选择专家咨询",
      buttonLink: "#",
      highlighted: false
    }
  ];
  
  return (
    <section id="pricing" className="section bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="heading">价格方案</h2>
          <p className="subheading mx-auto">
            选择最适合你需求的测试方案，深入了解自己
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div 
              key={plan.id} 
              className={`rounded-2xl overflow-hidden transition-all duration-300 ${
                plan.highlighted 
                  ? 'bg-[#0071e3] text-white shadow-lg transform md:-translate-y-4' 
                  : 'bg-[#f5f5f7] hover:shadow-md'
              }`}
            >
              <div className="p-8">
                <h3 className={`text-xl font-bold mb-2 ${plan.highlighted ? 'text-white' : 'text-[#1d1d1f]'}`}>
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <span className={`text-3xl font-bold ${plan.highlighted ? 'text-white' : 'text-[#1d1d1f]'}`}>
                    {plan.price}
                  </span>
                </div>
                <p className={`mb-6 ${plan.highlighted ? 'text-white/80' : 'text-[#86868b]'}`}>
                  {plan.description}
                </p>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <FaCheck className={`w-5 h-5 mr-3 mt-0.5 ${plan.highlighted ? 'text-white' : 'text-[#0071e3]'}`} />
                      <span className={plan.highlighted ? 'text-white/90' : 'text-[#1d1d1f]'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <a
                  href={plan.buttonLink}
                  className={`block w-full py-3 px-6 rounded-lg text-center font-medium transition-all duration-300 ${
                    plan.highlighted
                      ? 'bg-white text-[#0071e3] hover:bg-gray-100'
                      : 'bg-[#0071e3] text-white hover:bg-[#0077ed]'
                  }`}
                >
                  {plan.buttonText}
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-[#86868b] text-sm">
            如需团队或企业测试方案，请联系我们获取定制报价。
            <br />
            所有付费方案支持7天内无条件退款。
          </p>
        </div>
      </div>
    </section>
  );
} 