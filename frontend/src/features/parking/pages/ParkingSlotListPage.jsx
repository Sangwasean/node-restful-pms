import { useState, useEffect } from 'react';
import  Table  from '../../../components/common/organisms/Table';
import  Button  from '../../../components/common/atoms/Button';
import { parkingService } from '../../../services/parkingService';

const ParkingSlotListPage = () => {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const data = await parkingService.getAll();
        setSlots(data || []); // Ensure we always have an array
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchSlots();
  }, []);

  const columns = [
    {
      header: 'ID',
      accessor: 'id',
      cell: (value) => value || 'N/A', // Safe handling of undefined
    },
    {
      header: 'Name',
      accessor: 'name',
      cell: (value) => (value ? value.toLowerCase() : 'N/A'), // Safe .toLowerCase()
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (value) => (value || 'unknown').toLowerCase(), // Safe default
    },
    {
      header: 'Actions',
      cell: (_, rowData) => (
        <div className="flex space-x-2">
          <Button size="sm">Edit</Button>
          <Button variant="danger" size="sm">
            Delete
          </Button>
        </div>
      ),
    },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Parking Slots</h1>
        <Button>Add New Slot</Button>
      </div>
      <Table
        columns={columns}
        data={slots}
        emptyMessage="No parking slots available"
      />
    </div>
  );
};

export default ParkingSlotListPage;