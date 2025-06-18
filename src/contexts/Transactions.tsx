"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Transaction interface
interface Transaction {
  hash: string;
  description: string;
  timestamp: number;
  status?: "pending" | "success" | "failed";
  receipt?: any;
}

interface TransactionContextType {
  transactions: { [hash: string]: Transaction };
  addTransaction: (tx: { hash: string; description: string }) => void;
  updateTransaction: (hash: string, updates: Partial<Transaction>) => void;
  loaded: boolean;
}

const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined
);

interface TransactionProviderProps {
  children: ReactNode;
}

export const TransactionProvider: React.FC<TransactionProviderProps> = ({
  children,
}) => {
  const [transactions, setTransactions] = useState<{
    [hash: string]: Transaction;
  }>({});
  const [loaded, setLoaded] = useState(false);

  // Load transactions from localStorage on mount
  useEffect(() => {
    try {
      const savedTx = localStorage.getItem("zhenglong_transactions");
      if (savedTx) {
        const parsed = JSON.parse(savedTx);
        setTransactions(parsed);
      }
    } catch (error) {
      console.error("Error loading transactions:", error);
    }
    setLoaded(true);
  }, []);

  // Save transactions to localStorage whenever they change
  useEffect(() => {
    if (loaded) {
      localStorage.setItem(
        "zhenglong_transactions",
        JSON.stringify(transactions)
      );
    }
  }, [transactions, loaded]);

  // Poll for transaction receipts
  useEffect(() => {
    const pollReceipts = async () => {
      if (!loaded || typeof window === "undefined" || !window.ethereum) return;

      const pendingTxs = Object.values(transactions).filter(
        (tx) => tx.status === "pending" && !tx.receipt
      );

      for (const tx of pendingTxs) {
        try {
          const receipt = await window.ethereum.request({
            method: "eth_getTransactionReceipt",
            params: [tx.hash],
          });

          if (receipt) {
            const status = receipt.status === "0x1" ? "success" : "failed";
            updateTransaction(tx.hash, {
              receipt,
              status,
            });
          }
        } catch (error) {
          console.error(`Error fetching receipt for ${tx.hash}:`, error);
        }
      }
    };

    const interval = setInterval(pollReceipts, 3000); // Poll every 3 seconds
    return () => clearInterval(interval);
  }, [transactions, loaded]);

  const addTransaction = (tx: { hash: string; description: string }) => {
    const transaction: Transaction = {
      hash: tx.hash,
      description: tx.description,
      timestamp: Date.now(),
      status: "pending",
    };

    setTransactions((prev) => ({
      ...prev,
      [tx.hash]: transaction,
    }));
  };

  const updateTransaction = (hash: string, updates: Partial<Transaction>) => {
    setTransactions((prev) => ({
      ...prev,
      [hash]: {
        ...prev[hash],
        ...updates,
      },
    }));
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        updateTransaction,
        loaded,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactionProvider = () => {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error(
      "useTransactionProvider must be used within a TransactionProvider"
    );
  }
  return context;
};

// Hook for components that need to refresh after transactions complete
export const useTxReceiptUpdater = (
  callback: (() => void) | (() => Promise<void>)
) => {
  const [firstRender, setFirstRender] = useState<boolean>(true);
  const { transactions, loaded } = useTransactionProvider();
  const [lastTxCount, setLastTxCount] = useState<number>(0);

  useEffect(() => {
    if (loaded) {
      setFirstRender(false);
    }
  }, [loaded]);

  useEffect(() => {
    const completedTxs = Object.values(transactions).filter((tx) => tx.receipt);

    if (completedTxs.length !== lastTxCount) {
      setLastTxCount(completedTxs.length);

      if (loaded && !firstRender && completedTxs.length > 0) {
        callback();
      }
    }
  }, [transactions, loaded, firstRender, lastTxCount, callback]);
};
