import { FaCheck, FaStar, FaShieldAlt, FaHeadset } from 'react-icons/fa';
import Link from 'next/link';

export default function Pricing() {
  const plans = [
    {
      id: 1,
      name: "基础版",
      price: "免费",
      description: "了解你的基本MBTI类型",
      icon: <FaCheck className="h-5 w-5" />,
      features: [
        "完整的MBTI测试评估",
        "16种性格类型结果",
        "基础的类型描述",
        "基础的强项分析"
      ],
      buttonText: "开始免费测试",
      buttonLink: "#test",
      highlighted: false,
      bgColor: "bg-gradient-to-br from-white to-[#f5f5f7]",
      iconBgColor: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      id: 2,
      name: "专业版",
      price: "￥99",
      period: "/一次性付费",
      description: "深入了解你的性格特质",
      icon: <FaStar className="h-5 w-5" />,
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
      highlighted: true,
      popular: true,
      bgColor: "bg-gradient-to-br from-[#0071e3] to-[#0077ed]",
      iconBgColor: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      id: 3,
      name: "专家咨询版",
      price: "￥299",
      period: "/一次性付费",
      description: "获得专业人士的个性化指导",
      icon: <FaHeadset className="h-5 w-5" />,
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
      highlighted: false,
      bgColor: "bg-gradient-to-br from-white to-[#f5f5f7]",
      iconBgColor: "bg-purple-100",
      iconColor: "text-purple-600"
    }
  ];
  
  return (
    <section id="pricing" className="section bg-white py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-[#0071e3]/10 text-[#0071e3] rounded-full text-sm font-medium mb-4">价格方案</span>
          <h2 className="text-4xl font-bold text-[#1d1d1f] mb-6">选择最适合你的方案</h2>
          <p className="text-[#86868b] text-xl max-w-3xl mx-auto">
            我们提供多种测试方案，满足不同深度的自我探索需求
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div 
              key={plan.id} 
              className={`rounded-2xl overflow-hidden transition-all duration-500 transform hover:-translate-y-2 hover:shadow-xl ${
                plan.highlighted 
                  ? 'shadow-lg relative z-10' 
                  : 'shadow-md'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 mt-4 mr-4 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  最受欢迎
                </div>
              )}
              <div className={`p-8 ${plan.highlighted ? plan.bgColor : plan.bgColor}`}>
                <div className={`${plan.iconBgColor} ${plan.iconColor} w-12 h-12 rounded-full flex items-center justify-center mb-6`}>
                  {plan.icon}
                </div>
                
                <h3 className={`text-2xl font-bold mb-2 ${plan.highlighted ? 'text-white' : 'text-[#1d1d1f]'}`}>
                  {plan.name}
                </h3>
                
                <div className="mb-4 flex items-end">
                  <span className={`text-4xl font-bold ${plan.highlighted ? 'text-white' : 'text-[#1d1d1f]'}`}>
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className={`ml-2 text-sm ${plan.highlighted ? 'text-white/70' : 'text-[#86868b]'}`}>
                      {plan.period}
                    </span>
                  )}
                </div>
                
                <p className={`mb-6 text-lg ${plan.highlighted ? 'text-white/80' : 'text-[#86868b]'}`}>
                  {plan.description}
                </p>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <FaCheck className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 ${
                        plan.highlighted ? 'text-white' : 'text-[#0071e3]'
                      }`} />
                      <span className={`${plan.highlighted ? 'text-white/90' : 'text-[#1d1d1f]'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  href={plan.buttonLink}
                  className={`block w-full py-4 px-6 rounded-xl text-center font-medium transition-all duration-300 ${
                    plan.highlighted
                      ? 'bg-white text-[#0071e3] hover:bg-gray-100'
                      : 'bg-[#0071e3] text-white hover:bg-[#0077ed]'
                  }`}
                >
                  {plan.buttonText}
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-20 max-w-4xl mx-auto bg-[#f5f5f7] rounded-2xl p-8 shadow-md">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
              <div className="flex items-center mb-4">
                <FaShieldAlt className="text-[#0071e3] w-6 h-6 mr-3" />
                <h3 className="text-2xl font-bold text-[#1d1d1f]">满意度保证</h3>
              </div>
              <p className="text-[#86868b] text-lg">
                我们提供7天内无条件退款保证。如果对测试结果不满意，可以随时联系我们获取全额退款。我们的目标是帮助你更好地了解自己。
              </p>
            </div>
            <div className="md:w-1/3 flex justify-center md:justify-end">
              <Link 
                href="#faq" 
                className="inline-flex items-center text-[#0071e3] font-medium hover:underline"
              >
                了解更多
                <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-10 text-center text-[#86868b] text-sm">
          <p>
            如需团队或企业测试方案，请
            <a href="mailto:bourneliu66@gmail.com" className="text-[#0071e3] hover:underline ml-1">
              联系我们
            </a>
            获取定制报价。
          </p>
        </div>
      </div>
    </section>
  );
} 