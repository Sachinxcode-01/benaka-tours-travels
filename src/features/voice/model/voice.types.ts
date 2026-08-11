// Voice assistant state machine types
export type VoiceState =
  | "idle"
  | "listening"
  | "processing"
  | "success"
  | "denied"
  | "unsupported";

export interface VoiceEntities {
  pickup?: string;
  destination?: string;
  date?: string;
  passengers?: number;
  vehicle?: string;
  tripType?: string;
}
