// types.ts
export type DiscoveryType = "physiology" | "brain" | "medication";
export type Severity = "low" | "medium" | "high";

export interface Discovery {
  id: number;
  timestamp: number; // UNIX timestamp (milliseconds)
  type: DiscoveryType;
  severity: Severity;
  title: string;      // A descriptive title for the discovery
  description: string; // Detailed description of the discovery
}
