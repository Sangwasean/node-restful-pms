// types/custom.types.ts
import { IsInt, IsNotEmpty, IsDateString, IsString, IsEnum, IsOptional } from "class-validator";

import { UserRole } from "./enums";
import { VehicleType } from "@prisma/client";

export class CreateBookingDto {
   @IsString()
   @IsNotEmpty()
   parkingSlotId: string;

   @IsString()
   @IsNotEmpty()
   vehicleId: string;

   @IsDateString()
   @IsNotEmpty()
   startTime: string;
}

export class ExtendBookingDto {
   @IsString()
   @IsNotEmpty()
   bookingId: string;

   @IsInt()
   @IsNotEmpty()
   additionalHours: number;
}


export type CreateParkingSlotDto = {
   floor: number;
   number: string;
   vehicleType: VehicleType;
   isAvailable?: boolean;
};

export class CreateUserDto {
   @IsNotEmpty()
   email: string;

   @IsNotEmpty()
   password: string;

   @IsNotEmpty()
   firstName: string;

   @IsNotEmpty()
   lastName: string;

   @IsOptional()
   @IsEnum(UserRole)
   role?: UserRole;
}

export class LoginDto {
   @IsNotEmpty()
   email: string;

   @IsNotEmpty()
   password: string;
}

export interface AuthRequest extends Request {
   user?: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      role: string;
   };
}
