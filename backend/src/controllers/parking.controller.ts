
import { Request, Response } from "express";
import parkingService from "../services/parking.service";
import { CreateBookingDto, CreateParkingSlotDto, ExtendBookingDto } from "../types/custom.types";
import asyncHandler from 'express-async-handler';
class ParkingController {
   async getParkingSlots(_req: Request, res: Response) {
      try {
         const slots = await parkingService.getAllParkingSlots();
         res.json(slots);
      } catch (error) {
         res.status(500).json({ message: error.message });
      }
   }

   async getAvailableSlots(req: Request, res: Response) {
      try {
         const { vehicleType } = req.query;
         const slots = await parkingService.getAvailableSlots(
            vehicleType as any
         );
         res.json(slots);
      } catch (error) {
         res.status(500).json({ message: error.message });
      }
   }

   async createParkingSlot(req: Request, res: Response) {
      try {
         const slotData: CreateParkingSlotDto = req.body;
         const newSlot = await parkingService.createParkingSlot(slotData);
         res.status(201).json(newSlot);
      } catch (error) {
         res.status(500).json({ message: error.message });
      }
   };
   public getParkingSlotById = asyncHandler(async (req: Request<{ id: string }>, res: Response) => {
      const { id } = req.params;
      const slot = await parkingService.getParkingSlotById(id);
      if (!slot) {
         res.status(404).json({ message: "Parking slot not found" });
         return;
      }
      res.json(slot);
   });




   async bookSlot(req: Request, res: Response) {
      try {
         const bookingData: CreateBookingDto = req.body;
         const booking = await parkingService.bookSlot(bookingData);
         res.status(201).json(booking);
      } catch (error) {
         res.status(400).json({ message: error.message });
      }
   }

   async extendBooking(req: Request, res: Response) {
      try {
         const extendData: ExtendBookingDto = req.body;
         const booking = await parkingService.extendBooking(extendData);
         res.json(booking);
      } catch (error) {
         res.status(400).json({ message: error.message });
      }
   }

   async releaseSlot(req: Request, res: Response) {
      try {
         const { bookingId } = req.params;
         const booking = await parkingService.releaseSlot(bookingId);
         res.json(booking);
      } catch (error) {
         res.status(400).json({ message: error.message });
      }
   }
}

export default new ParkingController();
