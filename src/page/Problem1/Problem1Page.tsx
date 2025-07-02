"use client";

import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

export default function ProblemOne() {
  const [inputValue, setInputValue] = useState<string>("5");

  const n = useMemo(() => {
    const parsed = Number.parseInt(inputValue, 10);
    return isNaN(parsed) || parsed < 0 ? 0 : parsed;
  }, [inputValue]);

  // Method 1: Iterative approach using a for loop
  const sum_to_n_a = (num: number): number => {
    let sum = 0;
    for (let i = 1; i <= num; i++) {
      sum += i;
    }
    return sum;
  };

  // Method 2: Recursive approach
  const sum_to_n_b = (num: number): number => {
    if (num <= 0) {
      return 0;
    }
    if (num === 1) {
      return 1;
    }
    return num + sum_to_n_b(num - 1);
  };

  // Method 3: Mathematical formula (Arithmetic Series)
  const sum_to_n_c = (num: number): number => {
    if (num < 0) return 0;
    return (num * (num + 1)) / 2;
  };

  const resultA = useMemo(() => sum_to_n_a(n), [n]);
  const resultB = useMemo(() => sum_to_n_b(n), [n]);
  const resultC = useMemo(() => sum_to_n_c(n), [n]);

  const codeA = `
var sum_to_n_a = function(n) {
let sum = 0;
for (let i = 1; i <= n; i++) {
  sum += i;
}
return sum;
};
`.trim();

  const codeB = `
var sum_to_n_b = function(n) {
if (n <= 1) {
  return n;
}
return n + sum_to_n_b(n - 1);
};
`.trim();

  const codeC = `
var sum_to_n_c = function(n) {
return (n * (n + 1)) / 2;
};
`.trim();

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Problem 1: Three ways to sum to n
            </h1>
          </div>
        </header>

        <main>
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Task</h2>
            <p className="text-gray-700 mb-2">
              Provide 3 unique implementations of the following function in
              JavaScript.
            </p>
            <p className="text-gray-700">
              <strong>Input: </strong>
              <code className="bg-gray-200 text-gray-800 px-1.5 py-0.5 rounded-md text-sm">
                n
              </code>
              - any integer
            </p>
            <p className="text-gray-700 mt-1">
              Assuming this input will always produce a result lesser than
              <code className="bg-gray-200 text-gray-800 px-1.5 py-0.5 rounded-md text-sm">
                Number.MAX_SAFE_INTEGER
              </code>
              .
            </p>
            <p className="text-gray-700 mt-1">
              <strong>Output: </strong>
              <code className="bg-gray-200 text-gray-800 px-1.5 py-0.5 rounded-md text-sm">
                return
              </code>
              - summation to 
              <code className="bg-gray-200 text-gray-800 px-1.5 py-0.5 rounded-md text-sm">
                n
              </code>
              , i.e.
              <code className="bg-gray-200 text-gray-800 px-1.5 py-0.5 rounded-md text-sm">
                sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15
              </code>
              .
            </p>
          </section>

          <div className="mb-8">
            <Label
              htmlFor="number-input"
              className="text-lg font-medium text-gray-800"
            >
              Enter a number (n)
            </Label>
            <Input
              id="number-input"
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter a number"
              className="mt-2 max-w-xs text-base"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>1. Iterative Approach</CardTitle>
                <CardDescription>
                  This method uses a simple `for` loop to iterate from 1 to `n`,
                  adding each number to a running total. It's straightforward
                  and easy to understand.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm mb-4">
                  <code>{codeA}</code>
                </pre>
                <p className="text-lg font-semibold">
                  Result: <span className="text-blue-600">{resultA}</span>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Recursive Approach</CardTitle>
                <CardDescription>
                  This method solves the problem by breaking it down into
                  smaller, identical subproblems. The function calls itself with
                  a smaller number until it reaches the base case of 0 or 1.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Alert variant="destructive" className="mb-4">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Potential Stack Overflow</AlertTitle>
                  <AlertDescription>
                    For large values of 'n', this recursive approach can exceed
                    the maximum call stack size and cause the program to crash.
                  </AlertDescription>
                </Alert>
                <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm mb-4">
                  <code>{codeB}</code>
                </pre>
                <p className="text-lg font-semibold">
                  Result: <span className="text-blue-600">{resultB}</span>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Mathematical Formula</CardTitle>
                <CardDescription>
                  This is the most efficient method. It uses the arithmetic
                  series formula `n * (n + 1) / 2` to calculate the sum
                  directly, without any loops or recursion.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm mb-4">
                  <code>{codeC}</code>
                </pre>
                <p className="text-lg font-semibold">
                  Result: <span className="text-blue-600">{resultC}</span>
                </p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
