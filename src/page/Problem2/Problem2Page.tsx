"use client";

import type React from "react";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowRightLeft, ChevronDown, Loader2 } from "lucide-react";
import { type Token, getTokens } from "@/lib/token";
import { useDebounce } from "use-debounce";
import { toast } from "sonner";

export function ProblemTwo() {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [fromToken, setFromToken] = useState<Token | undefined>();
  const [toToken, setToToken] = useState<Token | undefined>();
  const [fromAmount, setFromAmount] = useState("");
  const [debouncedFromAmount] = useDebounce(fromAmount, 500);
  const [toAmount, setToAmount] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSwapping, setIsSwapping] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTokens() {
      setIsLoading(true);
      const fetchedTokens = await getTokens();
      setTokens(fetchedTokens);
      setFromToken(fetchedTokens.find((t) => t.symbol === "ETH"));
      setToToken(fetchedTokens.find((t) => t.symbol === "USDC"));
      setIsLoading(false);
    }
    fetchTokens();
  }, []);

  useEffect(() => {
    if (
      !fromToken ||
      !toToken ||
      !debouncedFromAmount ||
      isNaN(Number.parseFloat(debouncedFromAmount))
    ) {
      setToAmount("");
      setError(null);
      return;
    }

    const amount = Number.parseFloat(debouncedFromAmount);
    if (amount <= 0) {
      setToAmount("");
      setError("Please enter an amount greater than 0.");
      return;
    }

    const fromPrice = fromToken.price;
    const toPrice = toToken.price;
    if (fromPrice && toPrice) {
      const result = (amount * fromPrice) / toPrice;
      setToAmount(result.toFixed(6));
    } else {
      setToAmount("N/A");
    }
  }, [debouncedFromAmount, fromToken, toToken]);

  const handleSwapTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
  };

  const handleFromAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setFromAmount(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (error || !fromAmount || Number.parseFloat(fromAmount) <= 0) {
      toast.error("Invalid Swap", {
        description: error || "Please enter a valid amount to swap.",
      });
      return;
    }

    setIsSwapping(true);
    setTimeout(() => {
      setIsSwapping(false);
      toast.success("Swap Successful!", {
        description: `You have successfully swapped ${fromAmount} ${fromToken?.symbol} for ${toAmount} ${toToken?.symbol}.`,
      });
      setFromAmount("");
      setToAmount("");
      setError(null);
    }, 2000);
  };

  const TokenSelector = ({
    selectedToken,
    onSelectToken,
  }: {
    selectedToken: Token | undefined;
    onSelectToken: (token: Token) => void;
  }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 min-w-[150px] justify-between bg-transparent"
          disabled={isLoading}
        >
          {selectedToken ? (
            <>
              <img
                src={selectedToken.logoURI || "/placeholder.svg"}
                alt={selectedToken.name}
                width={24}
                height={24}
                className="rounded-full"
              />
              <span className="font-semibold">{selectedToken.symbol}</span>
            </>
          ) : (
            <Loader2 className="h-5 w-5 animate-spin" />
          )}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px]">
        {tokens.map((token) => (
          <DropdownMenuItem
            key={token.symbol}
            onSelect={() => onSelectToken(token)}
          >
            <img
              src={token.logoURI || "/placeholder.svg"}
              alt={token.name}
              width={24}
              height={24}
              className="mr-2 rounded-full"
            />
            <span>
              {token.name} ({token.symbol})
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Problem 2: Fancy Form
            </h1>
          </div>
        </header>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Task</h2>
          <p className="text-gray-700 mb-2">
            Create a currency swap form based on the template provided in the
            folder. A user would use this form to swap assets from one currency
            to another.
          </p>
        </section>

        <Card className="w-full max-w-md mx-auto shadow-2xl shadow-gray-500/10 dark:shadow-black/20">
          <CardHeader>
            <CardTitle>Currency Swap</CardTitle>
            <CardDescription>
              Fast, secure, and decentralized asset exchange.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    You pay
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    type="text"
                    placeholder="0.0"
                    className="text-2xl font-bold border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-auto"
                    value={fromAmount}
                    onChange={handleFromAmountChange}
                    disabled={isSwapping || isLoading}
                  />
                  <TokenSelector
                    selectedToken={fromToken}
                    onSelectToken={setFromToken}
                  />
                </div>
              </div>

              <div className="flex justify-center -my-2 z-10">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-white dark:bg-gray-950 border-4 border-gray-50 dark:border-gray-900 hover:rotate-180 transition-transform"
                  onClick={handleSwapTokens}
                  disabled={isSwapping || isLoading}
                >
                  <ArrowRightLeft className="h-4 w-4" />
                </Button>
              </div>

              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg space-y-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  You receive
                </span>
                <div className="flex items-center gap-2">
                  <Input
                    type="text"
                    placeholder="0.0"
                    className="text-2xl font-bold border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-auto"
                    value={toAmount}
                    readOnly
                    disabled
                  />
                  <TokenSelector
                    selectedToken={toToken}
                    onSelectToken={setToToken}
                  />
                </div>
              </div>

              {error && (
                <p className="text-sm text-red-500 dark:text-red-400">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                className="w-full text-lg font-semibold py-6"
                disabled={
                  isSwapping ||
                  !!error ||
                  !fromAmount ||
                  Number.parseFloat(fromAmount) <= 0 ||
                  isLoading
                }
              >
                {isSwapping ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  "Swap"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
