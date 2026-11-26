export type QuoteCategory = string;

export type QuoteStatus = '必选' | '按需必选' | '推荐选配' | '可选';
export type QuoteBilling = '一次性' | '每月' | '每小时' | '按需';

export type QuoteService = {
  id: number;
  catalogNumber?: string;
  name: string;
  category: QuoteCategory;
  status: QuoteStatus;
  summary: string;
  deliverables?: string;
  effort: string;
  cost: string;
  min: number | null;
  max: number | null;
  billing: QuoteBilling;
  unit: string;
  rateNote?: string;
  startingAt?: boolean;
  oneTimeMin?: number;
  oneTimeMax?: number;
};

export type QuotePackage = {
  id: string;
  name: string;
  stage: string;
  summary: string;
  includes: string;
  features: string[];
  price: number | null;
  priceNote: string;
  monthly: number | null;
  serviceIds: number[];
  recommended?: boolean;
};

export const quoteCategories: Array<{ name: QuoteCategory; count: number }> = [
  { name: '通用技术', count: 5 },
  { name: '独立站建设', count: 7 },
  { name: '数字营销技术', count: 7 },
  { name: 'AEO / GEO', count: 5 },
  { name: '电商及接口', count: 6 },
  { name: 'AI 与自动化', count: 7 },
  { name: '运维与顾问', count: 5 },
];

export const quotePackages: QuotePackage[] = [
  {
    id: 'starter-site',
    name: '基础档 · 商品展示站',
    stage: '建立海外品牌官网',
    summary: '适合先建立产品展示与海外客户咨询入口的企业。',
    includes: '商品展示独立站 · 首年服务器与域名 · 基础 SEO + AEO/GEO',
    features: [
      '商品展示独立站，首年服务器与域名',
      '小语种自动翻译，适配电脑、平板和手机',
      '图片、代码与访问速度优化',
      '网站配色、首页与内页装修，含基础资料填充',
      '基础 SEO 与建站期 AEO/GEO 优化',
      '源码交付、数据备份、1 年售后服务',
    ],
    price: 39800,
    priceNote: '试行参考价；网站空间续费 2,000 元/年，域名续费另计',
    monthly: 0,
    serviceIds: [3, 7, 13, 20, 21, 22, 23],
  },
  {
    id: 'growth-site',
    name: '进阶档 · 在线获客站',
    stage: '接通交易与客户服务',
    summary: '适合希望在线收款、自动回复咨询并看懂流量来源的团队。',
    includes: '包含基础档 · Stripe 接入 · AI 客服 · 流量转化看板',
    features: [
      '包含基础档全部服务',
      'Stripe 或当地可用支付接入，先核实开户主体',
      '多语言智能体客服，支持转人工',
      'GA4 + Search Console 流量分析与看板',
      '客户已有 Adobe Analytics 授权时可按需接入',
    ],
    price: 69800,
    priceNote: '试行参考价；支付开户资格、Token、手续费及 Adobe 授权另确认',
    monthly: 0,
    serviceIds: [3, 7, 13, 20, 21, 22, 23, 14, 17, 25, 32],
    recommended: true,
  },
  {
    id: 'intelligence-site',
    name: '高级档 · AI 知识自动化',
    stage: '打通企业知识与业务流程',
    summary: '适合产品资料和业务知识较多、需要自动更新与智能问答的企业。',
    includes: '包含进阶档 · 数据清洗 · RAG 知识库 · 自动化流程',
    features: [
      '包含进阶档全部服务',
      '清洗并规范产品、文档及业务数据',
      '企业 RAG 知识库，回答可追溯来源',
      '自动导入、更新知识和生成客户答复',
      'CRM、ERP 或商品系统对接可作为扩展项单独评估',
    ],
    price: null,
    priceNote: '按数据量、资料格式与接口范围评估',
    monthly: 0,
    serviceIds: [3, 7, 13, 20, 21, 22, 23, 14, 17, 25, 32, 31, 33, 42],
  },
];

export const quoteServices: QuoteService[] = [
  { id: 1, name: 'IT 技术诊断与咨询', category: '通用技术', status: '推荐选配', summary: '评估系统、网站、出海需求及技术可行性。', deliverables: '诊断报告、问题清单、实施建议', effort: '0.5–2 工作日', cost: '人力 + Token', min: 1500, max: 6000, billing: '一次性', unit: '次' },
  { id: 2, name: '云服务器选型与部署咨询', category: '通用技术', status: '按需必选', summary: '按市场、规模和预算选择服务器及架构。', deliverables: '选型、架构方案、成本预估', effort: '2–4 小时', cost: '人力', min: 800, max: 1500, billing: '一次性', unit: '次' },
  { id: 3, name: '网站及服务器部署', category: '通用技术', status: '必选', summary: '配置域名解析、SSL、CDN 与生产环境。', deliverables: '上线网站、安全配置、部署文档', effort: '1–2 工作日', cost: '人力 + 服务器 + 域名', min: 3000, max: 6000, billing: '一次性', unit: '次' },
  { id: 4, name: '自动化部署体系搭建', category: '通用技术', status: '可选', summary: '建立可复用的网站构建、发布与回滚流程。', deliverables: 'Docker、CI/CD、测试与生产环境、回滚', effort: '2–4 工作日', cost: '人力 + 云资源', min: 6000, max: 12000, billing: '一次性', unit: '套' },
  { id: 5, name: '企业邮箱及域名服务', category: '通用技术', status: '推荐选配', summary: '配置商务邮箱及域名验证。', deliverables: '邮箱账号、SPF / DKIM / DMARC', effort: '0.5–1 工作日', cost: '人力 + 域名 + 邮箱订阅', min: 1500, max: 3000, billing: '一次性', unit: '次' },
  { id: 6, name: '广告落地页搭建', category: '独立站建设', status: '按需必选', summary: '承接广告及社媒流量，适合初期市场测试。', deliverables: '产品展示、卖点、CTA、询价表单、WhatsApp', effort: '1–2 工作日', cost: '人力 + Token', min: 3000, max: 6000, billing: '一次性', unit: '页' },
  { id: 7, name: '品牌展示型独立站', category: '独立站建设', status: '按需必选', summary: '为品牌建立海外官方展示渠道。', deliverables: '首页、品牌、产品、联系、CMS、基础 SEO', effort: '3–5 工作日', cost: '人力 + Token + 服务器', min: 8800, max: 14800, billing: '一次性', unit: '站' },
  { id: 8, name: 'B2B 外贸获客型独立站', category: '独立站建设', status: '按需必选', summary: '面向采购商、经销商和批发客户获取线索。', deliverables: '分类筛选、询价、经销商申请、线索管理', effort: '5–8 工作日', cost: '人力 + Token + 服务器 + 数据库', min: 14800, max: 24800, billing: '一次性', unit: '站' },
  { id: 9, name: 'B2C 电商型独立站', category: '独立站建设', status: '按需必选', summary: '为海外消费者提供在线商品浏览和下单能力。', deliverables: '商品、购物车、会员、结算、订单、库存、促销', effort: '10–18 工作日', cost: '人力 + Token + 服务器 + 电商系统', min: 29800, max: 54800, billing: '一次性', unit: '站' },
  { id: 10, name: '企业级定制独立站', category: '独立站建设', status: '可选', summary: '按特殊品牌视觉与业务流程定制开发。', deliverables: '定制 UI、前后端、业务逻辑、管理后台', effort: '20 工作日起', cost: '定制化', min: 60000, max: 60000, billing: '一次性', unit: '起' },
  { id: 11, name: '多语言及本地化网站改造', category: '独立站建设', status: '按需必选', summary: '适配目标市场语言、货币与地址格式。', deliverables: '多语言、货币、日期地址、多语言 SEO', effort: '1–4 工作日', cost: '人力 + Token + 翻译', min: 3000, max: 12000, billing: '一次性', unit: '次' },
  { id: 12, name: '网站迁移与改版', category: '独立站建设', status: '可选', summary: '迁移或升级已有网站并保留旧页面访问路径。', deliverables: '网站及数据库迁移、页面改造、URL 重定向、部署', effort: '2–7 工作日', cost: '人力 + Token + 云资源', min: 6000, max: 20000, billing: '一次性', unit: '次' },
  { id: 13, name: 'SEO 搜索引擎优化', category: '数字营销技术', status: '推荐选配', summary: '提升网站在自然搜索中的可检索性与曝光机会。', deliverables: 'SEO 诊断、关键词布局、结构化数据、索引优化', effort: '1–3 工作日', cost: '人力 + Token + SEO 工具', min: 3000, max: 9000, billing: '一次性', unit: '次' },
  { id: 14, name: '网站数据统计系统', category: '数字营销技术', status: '推荐选配', summary: '跟踪网站流量、访问行为和转化事件。', deliverables: 'GA4、Search Console、Clarity、关键事件', effort: '0.5–1 工作日', cost: '人力', min: 1500, max: 3000, billing: '一次性', unit: '次' },
  { id: 15, name: '广告像素及转化追踪', category: '数字营销技术', status: '按需必选', summary: '为效果广告配置网站端转化事件追踪。', deliverables: 'Meta、TikTok、Google Ads 转化事件', effort: '1–2 工作日', cost: '人力', min: 3000, max: 6000, billing: '一次性', unit: '渠道' },
  { id: 16, name: '服务端转化 API 搭建', category: '数字营销技术', status: '推荐选配', summary: '通过服务端事件补充广告转化数据。', deliverables: 'Meta CAPI、事件去重、验证', effort: '2–4 工作日', cost: '人力 + 服务器 + API', min: 6000, max: 12000, billing: '一次性', unit: '渠道' },
  { id: 17, name: '数据可视化看板搭建', category: '数字营销技术', status: '可选', summary: '整合网站、广告与销售数据进行查看。', deliverables: '流量、广告、询盘看板、自动报表', effort: '3–7 工作日', cost: '人力 + API + 数据库', min: 9000, max: 20000, billing: '一次性', unit: '套' },
  { id: 18, name: 'CRM 客户管理系统搭建', category: '数字营销技术', status: '推荐选配', summary: '跟踪潜客来源、销售阶段与跟进进度。', deliverables: '标签、来源、销售阶段、跟进、自动通知', effort: '3–7 工作日', cost: '人力 + 软件 + 数据库', min: 9000, max: 20000, billing: '一次性', unit: '套' },
  { id: 19, name: '网站转化率优化（CRO）', category: '数字营销技术', status: '可选', summary: '持续分析并优化询盘或购买路径。', deliverables: '行为分析、CTA 优化、A/B 测试、报告', effort: '每周 2–5 小时', cost: '人力 + 分析工具', min: 3000, max: 8000, billing: '每月', unit: '月' },
  { id: 20, name: 'AEO / GEO 品牌诊断与策略', category: 'AEO / GEO', status: '推荐选配', summary: '分析品牌在 AI 检索中的基础信息与竞品表现。', deliverables: '基线报告、竞品分析、目标问题库、优化策略', effort: '1–3 工作日', cost: '人力 + Token + 监测工具', min: 3000, max: 9000, billing: '一次性', unit: '次' },
  { id: 21, name: 'AEO 答案引擎优化', category: 'AEO / GEO', status: '推荐选配', summary: '优化品牌信息，使其更适合回答用户问题。', deliverables: 'FAQ、问答页、产品问题库、语义结构', effort: '2–4 工作日', cost: '人力 + Token', min: 6000, max: 12000, billing: '一次性', unit: '次' },
  { id: 22, name: 'GEO 生成式检索优化', category: 'AEO / GEO', status: '推荐选配', summary: '提升品牌信息完整性、一致性与可引用性。', deliverables: '品牌实体、产品知识结构、行业知识页、引用策略', effort: '3–7 工作日', cost: '人力 + Token + 内容工具', min: 9000, max: 20000, billing: '一次性', unit: '次' },
  { id: 23, name: 'AI 检索技术基础设施优化', category: 'AEO / GEO', status: '按需必选', summary: '排查网站对 AI 与搜索爬虫的技术访问障碍。', deliverables: '抓取性、SSR、语义 HTML、结构化数据', effort: '1–3 工作日', cost: '人力 + Token', min: 3000, max: 9000, billing: '一次性', unit: '次' },
  { id: 24, name: 'AEO / GEO 持续监测与维护', category: 'AEO / GEO', status: '可选', summary: '定期测试不同 AI 平台中的目标问题结果。', deliverables: '提及率、引用率、竞品对比、问题覆盖率、月报', effort: '每周 2–5 小时', cost: '人力 + Token + 监测工具', min: 3000, max: 8000, billing: '每月', unit: '月' },
  { id: 25, name: '海外支付系统集成', category: '电商及接口', status: '按需必选', summary: '为在线收款业务接入可用的当地支付方式。', deliverables: '支付、回调、订单同步、退款和异常处理', effort: '2–5 工作日', cost: '人力 + 支付手续费', min: 6000, max: 15000, billing: '一次性', unit: '渠道' },
  { id: 26, name: '海外物流系统集成', category: '电商及接口', status: '可选', summary: '连接订单与当地物流服务数据。', deliverables: '运单、物流查询、订单同步', effort: '2–5 工作日', cost: '人力 + 物流 API', min: 6000, max: 15000, billing: '一次性', unit: '渠道' },
  { id: 27, name: 'ERP 系统集成', category: '电商及接口', status: '可选', summary: '同步海外销售与企业现有 ERP 数据。', deliverables: '商品、库存、订单、仓储、财务同步', effort: '5–15 工作日', cost: '人力 + API + 数据库', min: 15000, max: 45000, billing: '一次性', unit: '套' },
  { id: 28, name: '第三方电商平台对接', category: '电商及接口', status: '可选', summary: '连接独立站与当地第三方电商平台。', deliverables: '商品、订单、库存同步、平台 API', effort: '5–10 工作日', cost: '人力 + API', min: 15000, max: 30000, billing: '一次性', unit: '平台' },
  { id: 29, name: '电子发票系统集成', category: '电商及接口', status: '可选', summary: '根据经营和财税方案连接电子发票系统。', deliverables: '发票、订单同步、查询、下载', effort: '3–7 工作日', cost: '人力 + 第三方服务', min: 9000, max: 20000, billing: '一次性', unit: '套' },
  { id: 30, name: '电商数据自动化管理', category: '电商及接口', status: '可选', summary: '汇总多渠道商品、库存与订单信息。', deliverables: '库存预警、订单通知、自动报表', effort: '3–10 工作日', cost: '人力 + API + 数据库', min: 9000, max: 30000, billing: '一次性', unit: '套' },
  { id: 31, name: 'AI 业务工作流搭建', category: 'AI 与自动化', status: '可选', summary: '用 AI 与自动任务减少重复人工操作。', deliverables: '工作流、AI 接口、自动任务、日志', effort: '3–7 工作日', cost: '人力 + Token + 算力', min: 9000, max: 20000, billing: '一次性', unit: '套' },
  { id: 32, name: 'AI 智能客服系统', category: 'AI 与自动化', status: '可选', summary: '以多语言知识问答处理常见客户咨询。', deliverables: '聊天组件、产品问答、知识库、人工转接', effort: '5–10 工作日', cost: '人力 + Token + 数据库', min: 15000, max: 30000, billing: '一次性', unit: '套' },
  { id: 33, name: '企业 RAG 知识库', category: 'AI 与自动化', status: '可选', summary: '统一管理产品、文档与业务知识。', deliverables: '文档、向量检索、权限、问答、来源追溯', effort: '7–15 工作日', cost: '人力 + Token + 向量数据库', min: 20000, max: 45000, billing: '一次性', unit: '套' },
  { id: 34, name: 'AI Agent 智能代理开发', category: 'AI 与自动化', status: '可选', summary: '面向具体业务环节开发 AI 代理与工具调用。', deliverables: 'Agent、工具调用、任务、人工审批、日志', effort: '7–20 工作日', cost: '人力 + Token + API', min: 20000, max: 60000, billing: '一次性', unit: '套' },
  { id: 35, name: 'AI 商品本地化工作流', category: 'AI 与自动化', status: '可选', summary: '批量辅助生成并审核多语言商品资料。', deliverables: '商品导入、多语言生成、术语库、审核、导出', effort: '3–7 工作日', cost: '人力 + Token', min: 9000, max: 20000, billing: '一次性', unit: '套' },
  { id: 36, name: '企业业务自动化', category: 'AI 与自动化', status: '可选', summary: '自动处理询价、邮件、订单通知或报表流程。', deliverables: '规则、第三方接口、任务记录、消息通知', effort: '2–5 工作日', cost: '人力 + API', min: 6000, max: 15000, billing: '一次性', unit: '套' },
  { id: 37, name: '基础网站运维', category: '运维与顾问', status: '推荐选配', summary: '保障品牌站及落地页持续运行。', deliverables: '监控、SSL、备份、安全更新', effort: '每月 1–2 小时', cost: '人力 + 服务器', min: 500, max: 800, billing: '每月', unit: '月' },
  { id: 38, name: 'B2B 独立站运维', category: '运维与顾问', status: '推荐选配', summary: '维护官网、询价流程与线索相关功能。', deliverables: '表单、备份、接口、性能优化', effort: '每月 3–5 小时', cost: '人力 + 服务器 + 数据库', min: 1000, max: 2000, billing: '每月', unit: '月' },
  { id: 39, name: 'B2C 电商系统运维', category: '运维与顾问', status: '推荐选配', summary: '持续维护交易、支付与物流运行。', deliverables: '订单、支付、物流异常、安全更新、备份', effort: '每月 5–10 小时', cost: '人力 + 服务器 + API', min: 2000, max: 4000, billing: '每月', unit: '月' },
  { id: 40, name: '企业 IT 技术顾问', category: '运维与顾问', status: '可选', summary: '持续提供技术规划、成本控制与选型建议。', deliverables: '架构评估、技术采购建议、阶段性规划', effort: '每月 8–20 小时', cost: '人力 + Token', min: 3000, max: 8000, billing: '每月', unit: '月' },
  { id: 41, name: '定制开发及技术支持', category: '运维与顾问', status: '可选', summary: '为已交付项目增加原范围外的新功能。', deliverables: '开发、测试、部署', effort: '按实际工时', cost: '人力 + Token', min: 300, max: 500, billing: '每小时', unit: '小时' },
  { id: 42, name: '企业数据清洗与知识治理', category: 'AI 与自动化', status: '可选', summary: '整理产品、官网、文档和业务数据，形成可供知识库检索的统一资料。', deliverables: '数据去重、字段规范、格式转换、知识分段与导入校验', effort: '按数据量与资料质量评估', cost: '人力 + 数据处理 + Token', min: null, max: null, billing: '按需', unit: '项目', rateNote: '按数据量与数据格式评估' },
];
