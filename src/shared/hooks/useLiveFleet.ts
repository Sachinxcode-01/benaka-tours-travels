import { useState, useEffect } from "react";
import { getLiveFleetVehicles } from "@entities/vehicle/model/vehicle.data";
import type { Vehicle } from "@entities/vehicle/model/vehicle.types";
import { FLEET_UPDATED_EVENT } from "@shared/services/fleetSyncService";

export function useLiveFleet(): Vehicle[] {
  const [vehicles, setVehicles] = useState<Vehicle[]>(() => getLiveFleetVehicles());

  useEffect(() => {
    const handleUpdate = () => {
      setVehicles(getLiveFleetVehicles());
    };

    window.addEventListener("storage", handleUpdate);
    window.addEventListener(FLEET_UPDATED_EVENT, handleUpdate);

    return () => {
      window.removeEventListener("storage", handleUpdate);
      window.removeEventListener(FLEET_UPDATED_EVENT, handleUpdate);
    };
  }, []);

  return vehicles;
}
