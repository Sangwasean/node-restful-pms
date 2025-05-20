import { useState, useEffect } from 'react';
import Table from '../../../components/common/organisms/Table';
import Button from '../../../components/common/atoms/Button';
import parkingService from '../../../services/parkingService';

const ParkingSlotListPage = () => {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const data = await parkingService.getAll();
        console.log('API Data:', data); // Verify the exact structure
        
        // Transform data to match our table's expectations
        const formattedSlots = data.map(slot => ({
          id: slot.id,
          name: slot.number || 'Unnamed', // Map 'number' to 'name'
          status: slot.isAvailable !== undefined ? slot.isAvailable : 'unknown'
        }));
        
        setSlots(formattedSlots);
      } catch (err) {
        console.error('Fetch Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, []);

  const columns = [
    {
      header: 'ID',
      accessor: 'id',
      cell: (value) => value || 'N/A',
    },
    {
      header: 'Number', // Changed from 'Name' to match your data
      accessor: 'name', // Now correctly mapped to your 'number' field
      cell: (value) => value || 'N/A',
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (value) => {
        if (value === true) return 'Available';
        if (value === false) return 'Occupied';
        return 'Unknown';
      },
    },
    {
      header: 'Actions',
      cell: (_, row) => (
        <div className="flex space-x-2">
          <Button size="sm">Edit</Button>
          <Button variant="danger" size="sm">Delete</Button>
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