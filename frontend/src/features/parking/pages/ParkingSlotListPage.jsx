"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { useAllParkingSlots, useAvailableParkingSlots } from "../hooks/useParkingSlots"
import Card from "../../../components/common/atoms/Card"
import Button from "../../../components/common/atoms/Button"
import Badge from "../../../components/common/atoms/Badge"
import Table from "../../../components/common/organisms/Table"
import { ParkingCircleIcon, PlusIcon } from "lucide-react"
import { useAuth } from "../../../contexts/AuthContext"

const ParkingSlotListPage = () => {
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false)
  const { data: allSlots, isLoading: allSlotsLoading } = useAllParkingSlots()
  const { data: availableSlots, isLoading: availableSlotsLoading } = useAvailableParkingSlots()
  const { user } = useAuth()

  const isLoading = showOnlyAvailable ? availableSlotsLoading : allSlotsLoading
  const parkingSlots = showOnlyAvailable ? availableSlots : allSlots

  const columns = [
    {
      header: "Slot Number",
      accessor: "number",
      cell: (row) => (
        <Link to={`/parking-slots/${row.id}`} className="text-blue-600 hover:text-blue-800 font-medium">
          {row.number}
        </Link>
      ),
    },
    {
      header: "Floor",
      accessor: "floor",
    },
    {
      header: "Type",
      accessor: "type",
      cell: (row) => <span className="capitalize">{row.type.toLowerCase()}</span>,
    },
    {
      header: "Status",
      accessor: "isAvailable",
      cell: (row) => (
        <Badge variant={row.isAvailable ? "success" : "danger"}>{row.isAvailable ? "Available" : "Occupied"}</Badge>
      ),
    },
    {
      header: "Actions",
      cell: (row) => (
        <div className="flex space-x-2">
          <Link to={`/parking-slots/${row.id}`}>
            <Button size="sm" variant="secondary">
              View
            </Button>
          </Link>
          {row.isAvailable && (
            <Link to="/bookings/new" state={{ parkingSlotId: row.id }}>
              <Button size="sm">Book</Button>
            </Link>
          )}
        </div>
      ),
    },
  ]

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Parking Slots</h1>
        <div className="flex space-x-3">
          <Button
            variant={showOnlyAvailable ? "primary" : "outline"}
            onClick={() => setShowOnlyAvailable(!showOnlyAvailable)}
          >
            {showOnlyAvailable ? "Showing Available" : "Show Available Only"}
          </Button>

          {user && user.role === "ADMIN" && (
            <Button>
              <PlusIcon className="h-5 w-5 mr-1" />
              Add Parking Slot
            </Button>
          )}
        </div>
      </div>

      <Card>
        <Card.Body className="p-0">
          <Table
            columns={columns}
            data={parkingSlots}
            isLoading={isLoading}
            emptyMessage={
              <div className="flex flex-col items-center py-8">
                <ParkingCircleIcon className="h-12 w-12 text-gray-400 mb-3" />
                <p className="text-gray-500">No parking slots found</p>
              </div>
            }
          />
        </Card.Body>
      </Card>
    </div>
  )
}

export default ParkingSlotListPage
