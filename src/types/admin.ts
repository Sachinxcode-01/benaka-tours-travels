export type InquiryStatus =
  "New" | "Contacted" | "Quote Sent" | "Confirmed" | "Completed" | "Cancelled";

export interface InquiryRecord {
  id: string;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  pickupLocation: string;
  destination: string;
  pickupDate: string;
  vehicleName: string;
  passengers: number;
  status: InquiryStatus;
  notes?: string;
}

export interface AdminUser {
  id: string;
  email: string;
  role: "super_admin" | "fleet_manager";
}
