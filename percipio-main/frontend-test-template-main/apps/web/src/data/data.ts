// data.ts
import { Discovery } from "./types";

export const generateDiscoveries = (): Discovery[] => {
  const discoveries: Discovery[] = [];
  const types: Discovery["type"][] = ["physiology", "brain", "medication"];
  const severities: Discovery["severity"][] = ["low", "medium", "high"];
  const now = Date.now();

  for (let i = 1; i <= 100; i++) {
    const type = types[i % 3];
    const severity = severities[i % 3];
    let title = "";
    let description = "";

    if (type === "physiology") {
      title = "Resting Heart Rate Increase";
      description = `Patient's resting heart rate increased from ${60 + (i % 5)} bpm to ${65 + (i % 5)} bpm.`;
    } else if (type === "brain") {
      title = "Cognitive Function Alert";
      description = `Patient's cognitive performance is showing deviations; further analysis is recommended.`;
    } else if (type === "medication") {
      title = "Medication Dosage Adjustment";
      description = `Patient's medication dosage was adjusted from ${i % 3 + 1} mg to ${i % 3 + 2} mg.`;
    }
    
    discoveries.push({
      id: i,
      timestamp: now - i * 60000, // i minutes ago
      type,
      severity,
      title,
      description,
    });
  }
  return discoveries;
};
