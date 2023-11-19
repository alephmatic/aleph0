import useSWR from 'swr'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type Invoice = {
  id: string;
  invoice: string;
  status: string;
  method: string;
  amount: string;
}

const fetcher = (...args) => fetch(...args).then(res => res.json())

function ExpensesTable() {
  const { data, error, isLoading } = useSWR(`/api/user/invoices`, fetcher)

  if (error) return <div>Failed to load</div>
  if (isLoading) return <div>Loading...</div>

  return <Table>
    <TableCaption>A list of your recent invoices.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead className="w-[100px]">Invoice</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Method</TableHead>
        <TableHead className="text-right">Amount</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {data?.invoices.map((invoice: Invoice) => {
        return <TableRow key={invoice.id}>
          <TableCell className="font-medium">{invoice.invoice}</TableCell>
          <TableCell>{invoice.status}</TableCell>
          <TableCell>{invoice.method}</TableCell>
          <TableCell className="text-right">{invoice.amount}</TableCell>
        </TableRow>
      })}
    </TableBody>
  </Table>
}
