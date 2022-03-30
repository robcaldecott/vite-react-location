import { MakeGenerics } from "@tanstack/react-location";
import type { Vehicle } from "./vehicle";

export type LocationGenerics = MakeGenerics<{
  LoaderData: {
    vehicles: Vehicle[];
    vehicle: Vehicle;
  };
  Params: {
    vehicleId: string;
  };
}>;
