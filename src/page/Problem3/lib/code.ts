"use client";

export const OriginalCode = `
interface WalletBalance {
  currency: string;
  amount: number;
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}
interface Props extends BoxProps {}

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain: any): number => {
    switch (blockchain) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
        return 20;
      case "Neo":
        return 20;
      default:
        return -99;
    }
  };

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        if (lhsPriority > -99) { // Error: lhsPriority is not defined
          if (balance.amount <= 0) {
            return true;
          }
        }
        return false;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        if (leftPriority > rightPriority) {
          return -1;
        } else if (rightPriority > leftPriority) {
          return 1;
        }
      });
  }, [balances, prices]); // Inefficient dependency

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed(),
    };
  }); // Unused variable

  const rows = sortedBalances.map(
    (balance: FormattedWalletBalance, index: number) => { // Incorrect type, index as key
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow
          className={classes.row}
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    }
  );

  return <div {...rest}>{rows}</div>;
};
`;

export const RefactoredCode = `
import React, { useMemo } from 'react';

// --- Type Definitions ---
// More specific type for blockchain identifiers
type Blockchain = "Osmosis" | "Ethereum" | "Arbitrum" | "Zilliqa" | "Neo";

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: Blockchain;
}

// --- Constants ---
// Using a const object for priorities is cleaner and often more performant.
const BLOCKCHAIN_PRIORITIES: Record<Blockchain, number> = {
  "Osmosis": 100,
  "Ethereum": 50,
  "Arbitrum": 30,
  "Zilliqa": 20,
  "Neo": 20,
};

// --- Mock Hooks and Components for demonstration ---
const useWalletBalances = (): WalletBalance[] => [
  { currency: 'OSMO', amount: 10, blockchain: 'Osmosis' },
  { currency: 'ETH', amount: 5, blockchain: 'Ethereum' },
  { currency: 'ARB', amount: 100, blockchain: 'Arbitrum' },
  { currency: 'ZIL', amount: 2000, blockchain: 'Zilliqa' },
  { currency: 'NEO', amount: 50, blockchain: 'Neo' },
  { currency: 'BTC', amount: 0, blockchain: 'Ethereum' }, // Example with 0 amount
];
const usePrices = () => ({ 'OSMO': 1.5, 'ETH': 3000, 'ARB': 1.2, 'ZIL': 0.03, 'NEO': 15 });
const WalletRow = ({ amount, usdValue, formattedAmount, currency }) => (
  <div className="row">{currency}: {formattedAmount} (USD: {usdValue.toFixed(2)})</div>
);

// --- Custom Hook for Business Logic ---
const useSortedWalletBalances = () => {
  const balances = useWalletBalances();
  const prices = usePrices();

  const sortedAndFormattedBalances = useMemo(() => {
    return balances
      .filter(balance => 
        (BLOCKCHAIN_PRIORITIES[balance.blockchain] !== undefined) && balance.amount > 0
      )
      .sort((a, b) => 
        (BLOCKCHAIN_PRIORITIES[b.blockchain] || 0) - (BLOCKCHAIN_PRIORITIES[a.blockchain] || 0)
      )
      .map(balance => ({
        ...balance,
        formatted: balance.amount.toFixed(3),
        usdValue: (prices[balance.currency] || 0) * balance.amount,
      }));
  }, [balances, prices]); // Correct dependencies

  return sortedAndFormattedBalances;
};

// --- Presentational Component ---
const WalletPage: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  const sortedBalances = useSortedWalletBalances();

  const rows = sortedBalances.map(balance => (
    <WalletRow
      key={balance.currency} // Use a unique identifier for the key
      amount={balance.amount}
      usdValue={balance.usdValue}
      formattedAmount={balance.formatted}
      currency={balance.currency}
    />
  ));

  return <div {...props}>{rows}</div>;
};

export default WalletPage;
`;
