export interface ChargeDataRecord {
    chargingSessionId: string;
    vehicleId: string;
    startTime: Date;
    endTime: Date;
    totalCost: number;
}
  