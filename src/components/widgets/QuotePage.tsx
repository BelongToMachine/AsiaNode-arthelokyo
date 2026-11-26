'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  IconCheck,
  IconDownload,
  IconMinus,
  IconPlus,
  IconRefresh,
  IconX,
} from '@tabler/icons-react';
import type { QuotePackage, QuoteService } from '~/shared/data/quote.data';

type QuoteTab = 'it' | 'operations';

const numberFormat = new Intl.NumberFormat('zh-CN', { maximumFractionDigits: 0 });
const money = (value: number) => '¥' + numberFormat.format(value);

function formatRange(min: number, max: number, startsAt = false) {
  if (min === max) return money(min) + (startsAt ? ' 起' : '');
  return money(min) + '–' + money(max) + (startsAt ? '+' : '');
}

function formatServiceRate(service: QuoteService, quantity = 1) {
  if (service.rateNote) return service.rateNote + (quantity > 1 ? ' × ' + quantity : '');
  if (service.min === null || service.max === null) return '按需确认';
  const suffix = service.billing === '每月'
    ? '/月'
    : service.billing === '每小时'
      ? '/小时'
      : service.unit === '起'
        ? ''
        : '/' + service.unit;
  return formatRange(service.min * quantity, service.max * quantity, service.startingAt || service.unit === '起') + suffix;
}

function statusLabel(status: QuoteService['status']) {
  if (status === '必选') return '所选方案基础服务';
  if (status === '按需必选') return '按业务需要';
  if (status === '推荐选配') return '建议配置';
  return '可选服务';
}

type EffortEstimate = {
  minDays?: number;
  maxDays?: number;
  openEnded?: boolean;
  monthlyHoursMin?: number;
  monthlyHoursMax?: number;
};

function parseEffort(service: QuoteService): EffortEstimate {
  const effort = service.effort;
  const workdayRange = effort.match(/(\d+(?:\.\d+)?)\s*[–-]\s*(\d+(?:\.\d+)?)\s*个?\s*工作日/);
  if (workdayRange) return { minDays: Number(workdayRange[1]), maxDays: Number(workdayRange[2]), openEnded: false };

  const startingWorkdays = effort.match(/(\d+(?:\.\d+)?)\s*个?\s*工作日起/);
  if (startingWorkdays) return { minDays: Number(startingWorkdays[1]), maxDays: 0, openEnded: true };

  const singleWorkdays = effort.match(/(\d+(?:\.\d+)?)\s*个?\s*工作日(?:左右)?/);
  if (singleWorkdays) return { minDays: Number(singleWorkdays[1]), maxDays: Number(singleWorkdays[1]), openEnded: false };

  const hourRange = effort.match(/(\d+(?:\.\d+)?)\s*[–-]\s*(\d+(?:\.\d+)?)\s*小时/);
  if (hourRange) {
    const minHours = Number(hourRange[1]);
    const maxHours = Number(hourRange[2]);
    if (effort.includes('每周')) return { monthlyHoursMin: minHours * 4, monthlyHoursMax: maxHours * 4 };
    if (effort.includes('每月')) return { monthlyHoursMin: minHours, monthlyHoursMax: maxHours };
    return { minDays: minHours / 8, maxDays: maxHours / 8, openEnded: false };
  }

  if (service.billing === '每小时') return { minDays: 1 / 8, maxDays: 1 / 8, openEnded: false };
  return {};
}

function formatDays(min: number, max: number, openEnded: boolean) {
  if (openEnded) return '约 ' + min + ' 个工作日起';
  if (max <= 0.5) {
    const minHours = Math.round(min * 8);
    const maxHours = Math.round(max * 8);
    return minHours === maxHours ? '约 ' + minHours + ' 小时' : '约 ' + minHours + '–' + maxHours + ' 小时';
  }
  return '约 ' + min + (min === max ? '' : '–' + max) + ' 个工作日';
}

function calculateEffort(services: QuoteService[], serviceIds: number[]) {
  let minDays = 0;
  let maxDays = 0;
  let openEnded = false;
  let monthlyHoursMin = 0;
  let monthlyHoursMax = 0;
  let hasWorkEstimate = false;
  let hasMonthlyEstimate = false;
  const recurringHints: string[] = [];

  serviceIds.forEach((id) => {
    const service = services.find((item) => item.id === id);
    if (!service) return;
    const estimate = parseEffort(service);
    if (typeof estimate.minDays === 'number') {
      hasWorkEstimate = true;
      minDays += estimate.minDays;
      if (estimate.openEnded) openEnded = true;
      else maxDays += estimate.maxDays ?? estimate.minDays;
    }
    if (typeof estimate.monthlyHoursMin === 'number') {
      hasMonthlyEstimate = true;
      monthlyHoursMin += estimate.monthlyHoursMin;
      monthlyHoursMax += estimate.monthlyHoursMax ?? estimate.monthlyHoursMin;
    }
    if (service.billing === '按需' && /(常态化|日运营|每日|单日)/.test(service.effort)) {
      recurringHints.push(service.effort.replace(/^常态化运营，?/, '').trim());
    }
  });

  return {
    work: hasWorkEstimate ? formatDays(minDays, maxDays, openEnded) : '按确认后的交付范围估算',
    monthly: hasMonthlyEstimate
      ? '持续支持约 ' + monthlyHoursMin + '–' + monthlyHoursMax + ' 小时 / 月'
      : recurringHints.length
        ? '日常运营投入：' + Array.from(new Set(recurringHints)).slice(0, 3).join('；') + (recurringHints.length > 3 ? ' 等' : '')
        : '',
  };
}

function ServiceRow({
  service,
  quantity,
  included,
  onCardClick,
  onToggle,
  showDetails,
}: {
  service: QuoteService;
  quantity: number;
  included: boolean;
  onCardClick: (id: number) => void;
  onToggle: (id: number) => void;
  showDetails?: boolean;
}) {
  const added = quantity > 0;
  return (
    <li
      className="grid cursor-pointer grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-3 border-b border-slate-100 px-4 py-4 transition-colors duration-200 hover:bg-slate-50 last:border-0 sm:px-6 sm:py-5 dark:border-slate-800 dark:hover:bg-slate-800/45"
      onClick={() => onCardClick(service.id)}
    >
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
          <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-amber-100 text-[11px] font-semibold tabular-nums text-amber-950 dark:bg-amber-300/15 dark:text-amber-200">
            {service.catalogNumber ?? String(service.id).padStart(2, '0')}
          </span>
          <h3 className="text-sm font-semibold leading-5 text-slate-900 sm:text-base dark:text-slate-100">{service.name}</h3>
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-medium leading-4 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {statusLabel(service.status)}
          </span>
        </div>
        <p className="mt-2 pl-10 text-xs leading-5 text-slate-600 sm:text-sm dark:text-slate-300">{service.summary}</p>
        {showDetails ? (
          <div className="mt-2 space-y-1 pl-10 text-[11px] leading-4 text-slate-500 dark:text-slate-400">
            <p><span className="font-medium text-slate-600 dark:text-slate-300">投入：</span>{service.effort}</p>
            {service.deliverables ? <p><span className="font-medium text-slate-600 dark:text-slate-300">交付：</span>{service.deliverables}</p> : null}
            <p><span className="font-medium text-slate-600 dark:text-slate-300">成本构成：</span>{service.cost}</p>
          </div>
        ) : null}
      </div>
      <div className="flex shrink-0 flex-col items-end gap-2">
        <p className="whitespace-nowrap text-sm font-semibold tabular-nums text-slate-900 sm:text-base dark:text-slate-100">{formatServiceRate(service)}</p>
        <button
          aria-pressed={included || added}
          className={'inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50 ' + (
            included
              ? 'cursor-default bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
              : added
                ? 'cursor-pointer bg-amber-300 text-slate-950 hover:bg-amber-200'
                : 'cursor-pointer border border-slate-300 bg-white text-slate-700 hover:border-slate-500 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200'
          )}
          disabled={included}
          onClick={(event) => {
            event.stopPropagation();
            onToggle(service.id);
          }}
          type="button"
        >
          {included ? <IconCheck aria-hidden="true" size={14} /> : null}
          {included ? '套餐已含' : added ? '已添加' : '加入报价'}
        </button>
      </div>
    </li>
  );
}

export default function QuotePage({ quoteCategories, quotePackages, quoteServices, operationsProductionWorkflow, operationsQuoteCategories, operationsQuoteServices }: {
  quoteCategories: Array<{ name: string; count: number }>;
  quotePackages: QuotePackage[];
  quoteServices: QuoteService[];
  operationsProductionWorkflow: string;
  operationsQuoteCategories: Array<{ name: string; count: number }>;
  operationsQuoteServices: QuoteService[];
}) {
  const [activeTab, setActiveTab] = useState<QuoteTab>('it');
  const [activeItCategory, setActiveItCategory] = useState('全部');
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);
  const [selectedServicesByTab, setSelectedServicesByTab] = useState<Record<QuoteTab, Record<number, number>>>({ it: {}, operations: {} });
  const [projectName, setProjectName] = useState('');
  const [pendingCard, setPendingCard] = useState<string | null>(null);
  const [pendingHint, setPendingHint] = useState<string | null>(null);
  const [headerHeight, setHeaderHeight] = useState(76);
  const summaryCardRef = useRef<HTMLElement | null>(null);
  const promptTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const header = document.getElementById('header');
    if (!header) return;
    const update = () => setHeaderHeight(header.getBoundingClientRect().height);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  const dismissPendingCard = () => {
    if (promptTimerRef.current !== null) window.clearTimeout(promptTimerRef.current);
    promptTimerRef.current = null;
    setPendingCard(null);
    setPendingHint(null);
  };

  const armPendingCard = (cardKey: string, hint: string) => {
    if (promptTimerRef.current !== null) window.clearTimeout(promptTimerRef.current);
    setPendingCard(cardKey);
    setPendingHint(hint);
    promptTimerRef.current = window.setTimeout(() => {
      setPendingCard(null);
      setPendingHint(null);
      promptTimerRef.current = null;
    }, 3000);
  };

  useEffect(() => () => {
    if (promptTimerRef.current !== null) window.clearTimeout(promptTimerRef.current);
  }, []);

  const pulseSummary = () => {
    const summaryCard = summaryCardRef.current;
    if (!summaryCard || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    summaryCard.classList.remove('quote-summary-pulse');
    void summaryCard.offsetWidth;
    summaryCard.classList.add('quote-summary-pulse');
  };

  const isOperations = activeTab === 'operations';
  const activeCategories = isOperations ? operationsQuoteCategories : quoteCategories;
  const activeServices = isOperations ? operationsQuoteServices : quoteServices;
  const selectedServices = selectedServicesByTab[activeTab];
  const activePackages = isOperations ? [] : quotePackages;
  const selectedPackage = activePackages.find((item) => item.id === selectedPackageId) ?? null;
  const selectedEntries = useMemo(
    () => Object.entries(selectedServices)
      .map(([id, quantity]) => ({ service: activeServices.find((item) => item.id === Number(id)), quantity }))
      .filter((entry): entry is { service: QuoteService; quantity: number } => Boolean(entry.service)),
    [activeServices, selectedServices],
  );
  const visibleExtras = selectedEntries.filter(({ service }) => !selectedPackage?.serviceIds.includes(service.id));

  const totals = useMemo(() => {
    let setupMin = selectedPackage?.price ?? 0;
    let setupMax = setupMin;
    let monthlyMin = selectedPackage?.monthly ?? 0;
    let monthlyMax = monthlyMin;

    selectedEntries.forEach(({ service, quantity }) => {
      if (selectedPackage?.serviceIds.includes(service.id)) return;
      if (service.min === null || service.max === null) {
        setupMin += (service.oneTimeMin ?? 0) * quantity;
        setupMax += (service.oneTimeMax ?? service.oneTimeMin ?? 0) * quantity;
        return;
      }
      if (service.billing === '每月') {
        monthlyMin += service.min * quantity;
        monthlyMax += service.max * quantity;
        setupMin += (service.oneTimeMin ?? 0) * quantity;
        setupMax += (service.oneTimeMax ?? service.oneTimeMin ?? 0) * quantity;
      } else {
        setupMin += service.min * quantity;
        setupMax += service.max * quantity;
      }
    });

    return {
      setupMin,
      setupMax,
      setupStartsAt: Boolean(selectedPackage || selectedEntries.some(({ service }) => service.startingAt)),
      monthlyMin,
      monthlyMax,
      monthlyStartsAt: Boolean(selectedPackage && selectedPackage.monthly !== null),
      monthlyCustom: Boolean(selectedPackage && selectedPackage.monthly === null),
      unpricedCount: visibleExtras.filter(({ service }) => service.min === null || service.max === null).length,
      hasSelection: Boolean(selectedPackage || visibleExtras.length),
    };
  }, [selectedEntries, selectedPackage, visibleExtras]);

  const estimatedServiceIds = useMemo(() => {
    const ids = [...(selectedPackage?.serviceIds ?? [])];
    selectedEntries.forEach(({ service, quantity }) => {
      if (selectedPackage?.serviceIds.includes(service.id)) return;
      for (let index = 0; index < quantity; index += 1) ids.push(service.id);
    });
    return calculateEffort(activeServices, ids);
  }, [activeServices, selectedEntries, selectedPackage]);

  const conclusion = selectedPackage
    ? selectedPackage.name + '适合' + selectedPackage.summary.replace(/[。.]$/, '') + '；可按实际需要补充其他服务。'
    : selectedEntries.length
      ? isOperations
        ? '当前已选择 ' + selectedEntries.length + ' 项运营服务；目录明确列出的金额按成本参考汇总，其他项目按确认的交付范围核算。'
        : '当前已选择 ' + selectedEntries.length + ' 项服务，适合先解决眼前的建站或获客需求；业务扩大后可再组合套餐。'
      : '添加需要的服务或套餐后，这里会生成报价和投入时间估算。';
  const setupTotalLabel = totals.setupMin
    ? formatRange(totals.setupMin, totals.setupMax, totals.setupStartsAt)
    : totals.hasSelection ? '待确认' : '待选择';
  const monthlyTotalLabel = totals.monthlyMin > 0
    ? formatRange(totals.monthlyMin, totals.monthlyMax, totals.monthlyStartsAt) + ' / 月'
    : totals.monthlyCustom ? '按需求确认' : '未选择';

  const toggleService = (id: number) => {
    pulseSummary();
    setSelectedServicesByTab((all) => {
      const current = all[activeTab];
      const next = { ...current };
      if (next[id]) delete next[id];
      else next[id] = 1;
      return { ...all, [activeTab]: next };
    });
  };

  const toggleServiceFromButton = (id: number) => {
    dismissPendingCard();
    toggleService(id);
  };

  const handleServiceCardClick = (id: number) => {
    if (selectedPackage?.serviceIds.includes(id)) return;
    const cardKey = 'service:' + id;
    if (pendingCard === cardKey) {
      dismissPendingCard();
      toggleService(id);
      return;
    }
    armPendingCard(cardKey, selectedServices[id] ? '再按一次移除报价' : '再按一次加入报价汇总');
  };

  const togglePackage = (id: string) => {
    pulseSummary();
    setSelectedPackageId((current) => current === id ? null : id);
  };

  const handlePackageCardClick = (id: string) => {
    const cardKey = 'package:' + id;
    if (pendingCard === cardKey) {
      dismissPendingCard();
      togglePackage(id);
      return;
    }
    armPendingCard(cardKey, selectedPackageId === id ? '再按一次移除报价' : '再按一次加入报价汇总');
  };

  const changeQuantity = (id: number, delta: number) => {
    dismissPendingCard();
    pulseSummary();
    setSelectedServicesByTab((all) => {
      const current = all[activeTab];
      const quantity = Math.max(0, (current[id] ?? 0) + delta);
      const next = { ...current };
      if (quantity === 0) delete next[id];
      else next[id] = quantity;
      return { ...all, [activeTab]: next };
    });
  };

  const clearQuote = () => {
    if (selectedPackageId || Object.keys(selectedServices).length) pulseSummary();
    if (!isOperations) setSelectedPackageId(null);
    setSelectedServicesByTab((all) => ({ ...all, [activeTab]: {} }));
    setProjectName('');
    dismissPendingCard();
  };

  const clearServices = () => {
    dismissPendingCard();
    if (Object.keys(selectedServices).length) pulseSummary();
    setSelectedServicesByTab((all) => ({ ...all, [activeTab]: {} }));
  };

  return (
    <main className="quote-page min-h-screen bg-[#f6f5f1] px-4 pb-24 pt-8 text-slate-900 dark:bg-slate-950 dark:text-slate-100 sm:px-6 sm:pt-12 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h1 className="sr-only">{isOperations ? '运营服务报价' : '土耳其市场拓展 IT 服务报价'}</h1>
          <div aria-label="报价类型" className="flex flex-wrap items-center gap-2" role="tablist">
            {([
              ['it', 'IT 技术报价'],
              ['operations', '运营服务报价'],
            ] as const).map(([tab, label]) => (
              <button
                aria-selected={activeTab === tab}
                aria-controls="quote-tab-panel"
                className={'cursor-pointer rounded-full px-4 py-2.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50 sm:px-5 ' + (activeTab === tab ? 'bg-slate-900 text-white dark:bg-amber-300 dark:text-slate-950' : 'text-slate-600 hover:bg-slate-200/70 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white')}
                id={'quote-tab-' + tab}
                key={tab}
                onClick={() => {
                  dismissPendingCard();
                  setActiveTab(tab);
                }}
                role="tab"
                type="button"
              >
                {label}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1.5 text-[11px] text-slate-500 dark:border-slate-700 dark:text-slate-400">
            客户 / 项目
            <input className="w-36 bg-transparent text-slate-900 outline-none placeholder:text-slate-400 dark:text-slate-100" onChange={(event) => setProjectName(event.target.value)} placeholder="选填" value={projectName} />
          </label>
        </header>

        <div aria-labelledby={'quote-tab-' + activeTab} className="quote-main-content grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_340px]" id="quote-tab-panel" role="tabpanel" tabIndex={0}>
          <div className="min-w-0">
            <div className="mb-5 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-xs leading-5 text-amber-950 sm:text-sm dark:border-amber-300/20 dark:bg-amber-300/[0.07] dark:text-amber-100">
              <span className="font-semibold">{isOperations ? '成本说明：' : '报价说明：'}</span>
              {isOperations
                ? '可计算的目录金额会汇总为成本参考；未定价项目标记为“按需确认”，广告费、算力和第三方费用另行核算。'
                : '套餐内已包含首年服务器与域名；Token、支付手续费、软件授权及次年续费另计，最终范围以项目确认结果为准。'}
            </div>
            {isOperations ? (
              <p className="mb-5 rounded-2xl border border-slate-200/80 bg-white/80 px-5 py-4 text-xs leading-5 text-slate-600 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300">
                <span className="font-semibold text-slate-800 dark:text-slate-100">内容生产流程：</span>{operationsProductionWorkflow}
              </p>
            ) : null}

            {!isOperations ? (
              <div aria-label="IT 服务模块" className="mb-5 flex gap-2 overflow-x-auto pb-2" role="tablist">
                {['全部', ...quoteCategories.map((category) => category.name)].map((name, index, tabs) => (
                  <button
                    aria-controls="it-category-panel"
                    aria-selected={activeItCategory === name}
                    className={'shrink-0 cursor-pointer rounded-full border px-4 py-2 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50 ' + (activeItCategory === name ? 'border-amber-300 bg-amber-300 text-slate-950' : 'border-slate-200 bg-white text-slate-600 hover:border-amber-300 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-amber-300/50 dark:hover:text-white')}
                    id={'it-category-tab-' + index}
                    key={name}
                    onClick={() => { dismissPendingCard(); setActiveItCategory(name); }}
                    onKeyDown={(event) => {
                      let nextIndex = index;
                      if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
                      else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
                      else if (event.key === 'Home') nextIndex = 0;
                      else if (event.key === 'End') nextIndex = tabs.length - 1;
                      else return;
                      event.preventDefault();
                      dismissPendingCard();
                      setActiveItCategory(tabs[nextIndex]);
                      document.getElementById('it-category-tab-' + nextIndex)?.focus();
                    }}
                    role="tab"
                    tabIndex={activeItCategory === name ? 0 : -1}
                    type="button"
                  >
                    {name}
                  </button>
                ))}
              </div>
            ) : null}

            <section aria-label={isOperations ? '运营服务报价目录' : undefined} aria-labelledby={isOperations ? undefined : 'it-category-tab-' + Math.max(0, quoteCategories.findIndex((category) => category.name === activeItCategory) + 1)} className="space-y-5" id={isOperations ? undefined : 'it-category-panel'} role={isOperations ? 'region' : 'tabpanel'}>
              {activeCategories.map((category, index) => {
                if (!isOperations && activeItCategory !== '全部' && category.name !== activeItCategory) return null;
                const services = activeServices.filter((service) => service.category === category.name);
                return (
                  <section
                    aria-labelledby={'quote-category-' + index}
                    className="scroll-mt-24 overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm shadow-slate-900/[0.025] dark:border-slate-800 dark:bg-slate-900"
                    id={'quote-category-section-' + index}
                    key={category.name}
                  >
                    <header className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-4 sm:px-6 sm:py-5 dark:border-slate-800">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">{isOperations ? '运营服务模块 ' : 'IT 服务模块 '}{String(index + 1).padStart(2, '0')}</p>
                        <h2 className="mt-1 text-lg font-semibold tracking-tight sm:text-xl" id={'quote-category-' + index}>{category.name}</h2>
                      </div>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">{services.length} 个报价项</span>
                    </header>
                    <ul>
                      {services.map((service) => (
                        <ServiceRow
                          included={Boolean(selectedPackage?.serviceIds.includes(service.id))}
                          key={service.id}
                          onCardClick={handleServiceCardClick}
                          onToggle={toggleServiceFromButton}
                          quantity={selectedServices[service.id] ?? 0}
                          service={service}
                          showDetails={isOperations}
                        />
                      ))}
                    </ul>
                  </section>
                );
              })}
            </section>

            {!isOperations ? <section aria-labelledby="quote-packages-title" className="mt-12">
              <div className="mb-5 max-w-2xl">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">IT 服务套餐</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl" id="quote-packages-title">从展示建站到 AI 知识自动化</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">三档方案逐级扩展；选定套餐后，已包含的服务不会重复计价。</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {quotePackages.map((item) => {
                  const selected = selectedPackageId === item.id;
                  return (
                    <article
                      className={'flex min-h-[360px] cursor-pointer flex-col rounded-3xl border bg-white p-5 shadow-sm shadow-slate-900/[0.025] transition duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md hover:shadow-slate-900/[0.07] sm:p-6 dark:bg-slate-900 dark:hover:shadow-black/20 ' + (selected ? 'border-amber-300 dark:border-amber-300/50' : item.recommended ? 'border-amber-300/80 dark:border-amber-300/40' : 'border-slate-200/80 hover:border-amber-300 dark:border-slate-800 dark:hover:border-amber-300/40')}
                      key={item.id}
                      onClick={() => handlePackageCardClick(item.id)}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-amber-800 dark:text-amber-200">{item.stage}</p>
                        {item.recommended ? <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-semibold text-amber-900 dark:bg-amber-300/15 dark:text-amber-200">推荐</span> : null}
                      </div>
                      <h3 className="mt-2 text-lg font-semibold leading-snug">{item.name}</h3>
                      <p className="mt-2 text-xs leading-5 text-slate-600 dark:text-slate-300">{item.summary}</p>
                      <ul className="mt-4 space-y-2 text-xs leading-5 text-slate-600 dark:text-slate-300">
                        {item.features.map((feature) => (
                          <li className="flex gap-2" key={feature}>
                            <IconCheck aria-hidden="true" className="mt-0.5 shrink-0 text-amber-700 dark:text-amber-300" size={14} />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-auto border-t border-slate-100 pt-4 dark:border-slate-800">
                        <div>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">参考建设费用</p>
                          <p className="mt-0.5 text-xl font-semibold tabular-nums">
                            {item.price === null ? '按需求评估' : <>{money(item.price)}<span className="ml-1 text-xs font-normal text-slate-500 dark:text-slate-400">起</span></>}
                          </p>
                          <p className="mt-1 text-[10px] leading-4 text-slate-500 dark:text-slate-400">{item.priceNote}</p>
                        </div>
                        <button
                          aria-pressed={selected}
                          className={'mt-4 inline-flex h-9 w-full cursor-pointer items-center justify-center gap-1.5 rounded-full text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50 ' + (selected ? 'bg-amber-300 text-slate-950 hover:bg-amber-200' : 'border border-slate-300 text-slate-700 hover:border-amber-400 hover:bg-amber-50 dark:border-slate-600 dark:text-slate-200 dark:hover:border-amber-300/50 dark:hover:bg-slate-800')}
                          onClick={(event) => {
                            event.stopPropagation();
                            dismissPendingCard();
                            togglePackage(item.id);
                          }}
                          type="button"
                        >
                          {selected ? <IconCheck aria-hidden="true" size={14} /> : null}
                          {selected ? '已加入报价' : '加入套餐'}
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
              <p className="mt-4 rounded-2xl border border-slate-200/80 bg-white/70 px-5 py-4 text-xs leading-5 text-slate-600 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300">
                基础档内容录入参考原服务标准：页面不超过 10 个、产品 10 个、文章和案例各 2 篇（资料由客户提供）。AEO/GEO 为建站期基础优化；持续监测、内容运营及超出录入范围的工作另行评估。高级档按数据量、资料格式与接口范围报价。
              </p>
            </section> : null}
          </div>

          <aside aria-labelledby="quote-summary-title" className="quote-summary quote-summary-card" id="quote-summary" ref={summaryCardRef} style={{ '--quote-header-height': `${headerHeight}px` } as React.CSSProperties}>
            <div className="quote-summary-panel rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-900/[0.035] sm:p-6 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-start justify-between gap-3">
                <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-amber-800 dark:text-amber-200">{isOperations ? 'COST REFERENCE' : 'YOUR ESTIMATE'}</p>
                  <h2 className="mt-1 text-lg font-semibold" id="quote-summary-title">报价汇总</h2>
                </div>
                <button aria-label="清空报价" className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 dark:hover:bg-slate-800" onClick={clearQuote} type="button">
                  <IconRefresh aria-hidden="true" size={16} />
                </button>
              </div>

              {selectedPackage ? (
                <div className="mt-5 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/70">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">套餐</p>
                      <p className="mt-1 text-sm font-semibold">{selectedPackage.name}</p>
                    </div>
                    <button aria-label="移除套餐" className="rounded-full p-1 text-slate-500 hover:bg-white dark:hover:bg-slate-700" onClick={() => { dismissPendingCard(); togglePackage(selectedPackage.id); }} type="button">
                      <IconX aria-hidden="true" size={15} />
                    </button>
                  </div>
                </div>
              ) : null}

              {visibleExtras.length ? (
                <div className="quote-summary-items mt-5">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-xs font-semibold">已选服务 <span className="font-normal text-slate-500">{visibleExtras.length} 项</span></p>
                    <button className="text-[11px] text-slate-500 underline underline-offset-2 hover:text-slate-900 dark:hover:text-white" onClick={clearServices} type="button">清除</button>
                  </div>
                  <ul aria-label="已选服务列表" className="quote-items-list divide-y divide-slate-100 dark:divide-slate-800" tabIndex={0}>
                    {visibleExtras.map(({ service, quantity }) => (
                      <li className="flex items-start justify-between gap-3 py-3" key={service.id}>
                        <div className="min-w-0">
                          <p className="text-xs font-medium leading-5">{service.name}</p>
                          <p className="mt-0.5 text-[10px] text-slate-500 dark:text-slate-400">{formatServiceRate(service, quantity)}</p>
                          {isOperations && service.min === null ? <p className="mt-1 text-[10px] leading-4 text-slate-500 dark:text-slate-400">成本构成：{service.cost}</p> : null}
                            {service.billing !== '每月' || service.unit !== '月' ? (
                            <div aria-label={service.name + '数量'} className="mt-2 inline-flex items-center rounded-full border border-slate-200 dark:border-slate-700">
                              <button aria-label="减少数量" className="px-2 py-1 text-xs hover:text-amber-700" onClick={() => changeQuantity(service.id, -1)} type="button"><IconMinus aria-hidden="true" size={12} /></button>
                              <span className="min-w-6 text-center text-[10px] tabular-nums">{quantity}{service.billing === '每小时' ? 'h' : ''}</span>
                              <button aria-label="增加数量" className="px-2 py-1 text-xs hover:text-amber-700" onClick={() => changeQuantity(service.id, 1)} type="button"><IconPlus aria-hidden="true" size={12} /></button>
                            </div>
                          ) : null}
                        </div>
                        <button aria-label={'移除 ' + service.name} className="rounded-full p-1 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800" onClick={() => changeQuantity(service.id, -quantity)} type="button"><IconX aria-hidden="true" size={14} /></button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : !selectedPackage ? (
                <p className="mt-5 rounded-2xl border border-dashed border-slate-300 px-4 py-4 text-xs leading-5 text-slate-500 dark:border-slate-700 dark:text-slate-400">
                  点击“加入报价”或选择一个套餐，查看预估金额和投入时间。
                </p>
              ) : null}

              <div className="mt-5 space-y-3 border-t border-slate-200 pt-4 dark:border-slate-800">
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold">{isOperations ? '一次性成本参考' : '一次性费用'}</p>
                    <p className="mt-1 text-[10px] text-slate-500 dark:text-slate-400">不含第三方费用</p>
                  </div>
                  <p className="text-right text-lg font-semibold tabular-nums">{setupTotalLabel}</p>
                </div>
                {totals.monthlyMin > 0 || totals.monthlyCustom ? (
                  <div className="flex items-end justify-between gap-3 border-t border-slate-100 pt-3 dark:border-slate-800">
                    <p className="text-xs font-semibold">{isOperations ? '月度成本参考' : '持续服务'}</p>
                    <p className="text-right text-sm font-semibold tabular-nums">{monthlyTotalLabel}</p>
                  </div>
                ) : null}
              </div>
              {isOperations && totals.unpricedCount > 0 ? (
                <div className="mt-3 flex items-center justify-between gap-3 border-t border-slate-100 pt-3 text-xs dark:border-slate-800">
                  <span className="font-semibold">未定价服务</span>
                  <span className="text-right text-slate-500 dark:text-slate-400">{totals.unpricedCount} 项按需确认</span>
                </div>
              ) : null}

              <div className="mt-5 rounded-2xl bg-amber-50 p-4 dark:bg-amber-300/[0.07]">
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-amber-900 dark:text-amber-200">建议结论</p>
                <p className="mt-1.5 text-xs leading-5 text-slate-700 dark:text-slate-200">{conclusion}</p>
              </div>

              <div className="mt-4 rounded-2xl border border-slate-200/80 px-4 py-4 dark:border-slate-800">
                <p className="text-xs font-semibold">预估投入时间</p>
                <p className="mt-1.5 text-sm font-semibold text-slate-900 dark:text-slate-100">{selectedPackage || selectedEntries.length ? estimatedServiceIds.work : '待选择服务'}</p>
                {estimatedServiceIds.monthly ? <p className="mt-1 text-[11px] text-slate-600 dark:text-slate-300">{estimatedServiceIds.monthly}</p> : null}
                <p className="mt-2 text-[10px] leading-4 text-slate-500 dark:text-slate-400">按熟练人员有效投入估算，不等同于完整项目周期；客户资料准备及第三方审核时间另计。</p>
              </div>

              <button className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-4 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-amber-300 dark:text-slate-950 dark:hover:bg-amber-200" onClick={() => window.print()} type="button">
                <IconDownload aria-hidden="true" size={16} />
                导出 PDF 报价
              </button>
            </div>
          </aside>
        </div>

        <div className="quote-mobile-estimate fixed inset-x-0 bottom-0 z-30 flex items-center justify-between gap-3 border-t border-slate-200 bg-white/95 px-4 py-3 backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/95 xl:hidden">
          <div className="min-w-0">
            <p className="text-[10px] text-slate-500 dark:text-slate-400">当前报价</p>
            <p className="truncate text-base font-semibold tabular-nums">{setupTotalLabel}</p>
            {isOperations && totals.monthlyMin > 0 ? <p className="truncate text-[10px] text-slate-500 dark:text-slate-400">月度参考 {monthlyTotalLabel}</p> : null}
          </div>
          <button className="shrink-0 rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold dark:border-slate-600" onClick={() => document.getElementById('quote-summary')?.scrollIntoView({ block: 'center' })} type="button">查看汇总</button>
        </div>

        {pendingHint ? (
          <div
            aria-live="polite"
            className="fixed bottom-20 left-1/2 z-40 -translate-x-1/2 rounded-full border border-amber-300/80 bg-amber-300 px-5 py-3 text-center text-xs font-semibold text-slate-950 shadow-lg shadow-amber-900/15 sm:whitespace-nowrap xl:bottom-6"
            role="status"
          >
            {pendingHint}
          </div>
        ) : null}

        <section aria-label="PDF 报价摘要" className="quote-print-sheet">
          <p className="text-xs font-semibold uppercase tracking-[0.18em]">ASIANODE · TÜRKİYE</p>
          <h1 className="mt-3 text-3xl font-semibold">{isOperations ? '运营服务报价（成本参考）' : '土耳其市场拓展 IT 服务报价'}</h1>
          {projectName.trim() ? <p className="mt-3 text-sm">客户 / 项目：{projectName.trim()}</p> : null}
          {selectedPackage ? (
            <div className="mt-7 rounded-xl border border-slate-300 p-4">
              <p className="text-xs text-slate-500">所选套餐</p>
              <p className="mt-1 text-lg font-semibold">{selectedPackage.name}</p>
              <p className="mt-1 text-sm">{selectedPackage.includes}</p>
            </div>
          ) : null}
          <h2 className="mt-7 text-base font-semibold">选配服务</h2>
          {visibleExtras.length ? (
            <ul className="mt-2 divide-y divide-slate-200">
              {visibleExtras.map(({ service, quantity }) => (
                          <li className="py-3" key={service.id}>
                            <div className="flex items-start justify-between gap-4">
                              <span>{service.name}{quantity > 1 ? ' × ' + quantity : ''}</span>
                              <span className="shrink-0 text-right font-semibold">{formatServiceRate(service, quantity)}</span>
                            </div>
                            {isOperations ? <p className="mt-1 text-xs leading-5 text-slate-500">投入：{service.effort}{service.deliverables ? '；交付：' + service.deliverables : ''}；成本构成：{service.cost}</p> : null}
                </li>
              ))}
            </ul>
          ) : <p className="mt-2 text-sm text-slate-500">无额外选配服务</p>}
          <div className="mt-6 grid grid-cols-2 gap-4 rounded-xl bg-slate-50 p-4">
            <div><p className="text-xs text-slate-500">{isOperations ? '一次性成本参考' : '一次性费用'}</p><p className="mt-1 text-lg font-semibold">{setupTotalLabel}</p></div>
            <div><p className="text-xs text-slate-500">{isOperations ? '月度成本参考' : '持续服务'}</p><p className="mt-1 text-lg font-semibold">{monthlyTotalLabel}</p></div>
          </div>
          {isOperations && totals.unpricedCount > 0 ? <p className="mt-4 text-sm">另有 {totals.unpricedCount} 项未列明金额，需按确认范围核算。</p> : null}
          <h2 className="mt-7 text-base font-semibold">方案建议</h2>
          <p className="mt-2 text-sm leading-6">{conclusion}</p>
          <p className="mt-5 text-sm"><span className="font-semibold">预估投入时间：</span>{selectedPackage || selectedEntries.length ? estimatedServiceIds.work : '待选择服务'}</p>
          {estimatedServiceIds.monthly ? <p className="mt-2 text-sm">{estimatedServiceIds.monthly}</p> : null}
          <p className="mt-7 border-t border-slate-300 pt-4 text-xs leading-5 text-slate-500">{isOperations
            ? '目录明确金额仅作成本参考，未列明金额的服务按确认范围核算；最终客户报价、广告预算及第三方费用另行确认。投入时间按熟练人员估算，不等同于完整项目周期。'
            : '参考报价，最终金额按确认的服务范围核算。第三方费用另计。预估为熟练人员有效投入，不等同于项目周期；客户资料准备及第三方审核时间另计。'}</p>
        </section>
      </div>
    </main>
  );
}
