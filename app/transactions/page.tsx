import { Suspense } from "react";
import { getTransactions } from "@/lib/actions/transaction";
import { TransactionsList } from "@/components/transactions/TransactionsList";
import Loading from "./loading";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function TransactionsPage({
  searchParams,
}: {
  searchParams: { page?: string; status?: string };
}) {
  const page = Number(searchParams.page) || 1;
  const status = searchParams.status;

  const { transactions, pagination } = await getTransactions({ 
    page, 
    status,
    limit: 10 
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Transactions</h1>
      <Suspense fallback={<Loading />}>
        <TransactionsList 
          initialTransactions={transactions} 
          pagination={pagination} 
        />
      </Suspense>
    </div>
  );
}