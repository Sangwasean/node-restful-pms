import api from "./api"

export const parkingService = {
  getAllParkingSlots: async () => {
    const response = await api.get("/parking-slots")
    return response.data
  },

  getAvailableParkingSlots: async () => {
    const response = await api.get("/parking-slots/available")
    return response.data
  },

  getParkingSlotById: async (id) => {
    const response = await api.get(`/parking-slots/${id}`)
    return response.data
  },

  createParkingSlot: async (parkingSlotData) => {
    const response = await api.post("/parking-slots", parkingSlotData)
    return response.data
  },

  updateParkingSlot: async (id, parkingSlotData) => {
    const response = await api.patch(`/parking-slots/${id}`, parkingSlotData)
    return response.data
  },
}
