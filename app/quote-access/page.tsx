import type { Metadata } from 'next';
import { safeQuotePath } from '~/shared/utils/quote-access';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: '访问报价', robots: { index: false, follow: false } };

export default function QuoteAccess({ searchParams }: { searchParams: { next?: string; error?: string } }) {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#f6f5f1] px-4 py-12 dark:bg-slate-950">
      <section className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-9">
        <p className="text-xs font-semibold tracking-[0.18em] text-amber-700 dark:text-amber-300">ASIANODE</p>
        <h1 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">访问服务报价</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">请输入访问口令，查看报价内容。</p>
        <form action="/api/quote-access" method="post" className="mt-6 space-y-4">
          <input type="hidden" name="next" value={safeQuotePath(searchParams.next ?? null)} />
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200" htmlFor="quote-password">访问口令</label>
          <input autoComplete="current-password" autoFocus className="w-full rounded-xl border border-slate-300 bg-transparent px-4 py-3 text-slate-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30 dark:border-slate-600 dark:text-white" id="quote-password" name="password" required type="password" />
          {searchParams.error ? <p className="text-sm text-red-600 dark:text-red-400" role="alert">口令不正确，请重试。</p> : null}
          <button className="w-full cursor-pointer rounded-full bg-amber-300 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-200" type="submit">进入报价</button>
        </form>
      </section>
    </main>
  );
}
