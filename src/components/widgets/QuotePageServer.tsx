import 'server-only';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import QuotePage from './QuotePage';
import { quoteCategories, quotePackages, quoteServices } from '~/shared/data/quote.data';
import { operationsProductionWorkflow, operationsQuoteCategories, operationsQuoteServices } from '~/shared/data/operationsQuote.data';
import { quoteCookieName, validQuoteSession } from '~/shared/utils/quote-access';

export default async function QuotePageServer() {
  if (!await validQuoteSession(cookies().get(quoteCookieName)?.value, process.env.QUOTE_SESSION_SECRET)) redirect('/quote-access');
  return <QuotePage {...{ quoteCategories, quotePackages, quoteServices, operationsProductionWorkflow, operationsQuoteCategories, operationsQuoteServices }} />;
}
