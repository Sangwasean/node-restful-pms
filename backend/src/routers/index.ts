import { Router } from "express";
import { AuthRouter } from "./auth.routes";
import { BookingRouter } from "./booking.route";
import { ParkingRouter } from "./parking.routes";
import { UsersRouter } from "./user.routes";
import { PaymentRouter } from "./payment.routes";
import { VehicleRouter } from "./vehicle.routes";

console.log("AuthRouter:", AuthRouter);
console.log("BookingRouter:", BookingRouter);
console.log("ParkingRouter:", ParkingRouter);
console.log("UsersRouter:", UsersRouter);
console.log("PaymentRouter:", PaymentRouter);
console.log("VehicleRouter:", VehicleRouter);

const router  = Router()

router.use("/auth", AuthRouter)
router.use("/bookings",BookingRouter)
router.use("/parking-slots", ParkingRouter)
router.use('/users', UsersRouter);
router.use('/payments', PaymentRouter);
router.use('/vehicles', VehicleRouter);



export default router