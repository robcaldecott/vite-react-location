import { http } from "@/utils";
import type { VehiclePayload } from "@/types";

export const fetchVehicles = () => http.get("/api/vehicles");

export const fetchVehicle = (id: string) => http.get(`/api/vehicles/${id}`);

export const deleteVehicle = (id: string) => http.delete(`/api/vehicles/${id}`);

export const createVehicle = (payload: VehiclePayload) =>
  http.post("/api/vehicles", { json: payload });
