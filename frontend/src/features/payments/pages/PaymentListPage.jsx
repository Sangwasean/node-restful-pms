import { Link } from "react-router-dom"
import { useAllPayments } from "../hooks/usePayments"
import Card from "../../../components/common/atoms/Card"
import Badge from "../../../components/common/atoms/Badge"
import Table from "../../../components/common/organisms/Table"
import { CreditCardIcon } from "lucide-react"

const PaymentListPage = () => {
  const { data: payments, isLoading } = useAllPayments()

  const getStatusBadge = (status) => {
    const variants = {
      PENDING: "warning",
      COMPLETED: "success",
      FAILED: "danger",
      REFUNDED: "primary",
    }

    return <Badge variant={variants[status] || "default"}>{status}</Badge>
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount)
  }

  const columns = [
    {
      header: "Booking",
      accessor: "booking.id",
      cell: (row) => (
        <Link to={`/bookings/${row.booking.id}`} className="text-blue-600 hover:text-blue-800">
          Slot {row.booking.parkingSlot.number}
        </Link>
      ),
    },
    {
      header: "Amount",
      accessor: "amount",
      cell: (row) => <span className="font-medium">{formatCurrency(row.amount)}</span>,
    },
    {
      header: "Method",
      accessor: "method",
      cell: (row) => <span className="capitalize">{row.method.toLowerCase()}</span>,
    },
    {
      header: "Date",
      accessor: "createdAt",
      cell: (row) => <span>{new Date(row.createdAt).toLocaleString()}</span>,
    },
    {
      header: "Status",
      accessor: "status",
      cell: (row) => getStatusBadge(row.status),
    },
  ]

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Payment History</h1>
      </div>

      <Card>
        <Card.Body className="p-0">
          <Table
            columns={columns}
            data={payments}
            isLoading={isLoading}
            emptyMessage={
              <div className="flex flex-col items-center py-8">
                <CreditCardIcon className="h-12 w-12 text-gray-400 mb-3" />
                <p className="text-gray-500">No payment records found</p>
              </div>
            }
          />
        </Card.Body>
      </Card>
    </div>
  )
}

export default PaymentListPage
