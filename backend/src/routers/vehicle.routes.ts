// routes/vehicle.routes.ts
import { Router } from 'express';
import vehicleController from '../controllers/vehicle.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

// Protected routes (relative to /vehicles)
router.post('/', authMiddleware, vehicleController.createVehicle); 
router.get('/', authMiddleware, vehicleController.getMyVehicles); 
router.get('/:id', authMiddleware, vehicleController.getVehicleById); 
router.put('/:id', authMiddleware, vehicleController.updateVehicle); 
router.delete('/:id', authMiddleware, vehicleController.deleteVehicle); 

export { router as VehicleRouter };