import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CodeBlock } from "./components/codeBlock";
import { OriginalCode, RefactoredCode } from "./lib/code";

export default function ProblemThree() {
  return (
    <div className="bg-muted/20 min-h-screen p-4 sm:p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Problem 3: Messy React
            </h1>
          </div>
        </header>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Task</h2>
          <p className="text-gray-700 mb-2">
            List out the computational inefficiencies and anti-patterns found in
            the code block below.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Original Code</CardTitle>
              <CardDescription>
                The initial implementation provided for review.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock code={OriginalCode} />
            </CardContent>
          </Card>
          <Card className="border-primary">
            <CardHeader>
              <CardTitle>Refactored Code</CardTitle>
              <CardDescription>
                An improved version focusing on best practices.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock code={RefactoredCode} />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Refactoring Analysis & Explanation</CardTitle>
            <CardDescription>
              The following changes were made to improve the code's efficiency,
              readability, and maintainability.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">
                    Area of Improvement
                  </TableHead>
                  <TableHead>Explanation</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Type Safety</TableCell>
                  <TableCell>
                    Replaced any for the blockchain field with a specific union
                    type. Also updated the WalletBalance interface for better
                    type consistency.
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Component Composition
                  </TableCell>
                  <TableCell>
                    Filtering, sorting, and formatting logic was extracted into
                    a custom hook (useSortedWalletBalances), making the
                    WalletPage component cleaner and more maintainable.
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Efficiency & Performance
                  </TableCell>
                  <TableCell>
                    Converted the getPriority switch into a constant lookup
                    object and moved it outside the component. Memoization
                    (useMemo) was adjusted to minimize unnecessary
                    recalculations.
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Logic Simplification
                  </TableCell>
                  <TableCell>
                    Refactored complex and error-prone filtering logic by
                    removing undefined variables and chaining the filtering
                    clearly.
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Redundancy Removal
                  </TableCell>
                  <TableCell>
                    Removed the unused formattedBalances map. Consolidated all
                    formatting logic into the main mapping loop.
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    React Best Practices
                  </TableCell>
                  <TableCell>
                    Replaced index with balance.currency as the React key,
                    avoiding potential rendering issues.
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Dependency Optimization
                  </TableCell>
                  <TableCell>
                    Removed prices from useMemo dependencies when unused,
                    reducing unnecessary recalculations.
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Separation of Concerns
                  </TableCell>
                  <TableCell>
                    Abstracted business logic into a reusable hook, promoting
                    clarity and testability.
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Function Reusability
                  </TableCell>
                  <TableCell>
                    Externalized getPriority function for reuse and independent
                    testing.
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
