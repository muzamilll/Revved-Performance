// Real remap results from Revved jobs (Top Gear Tuning files for those cars; the same figures
// as the job-done posts). Add new jobs at the top. Power in bhp, torque in Nm.
export type RemapResult = { car: string; detail: string; stage: string; bhp: [number, number]; nm: [number, number] };

export const remapResults: RemapResult[] = [
  { car: "Mercedes C63 AMG", detail: "V8 petrol", stage: "Stage 1", bhp: [450, 510], nm: [600, 650] },
  { car: "BMW 530d", detail: "3.0 diesel", stage: "Stage 1", bhp: [255, 310], nm: [560, 650] },
  { car: "Peugeot Partner", detail: "Van, 2019", stage: "Stage 1", bhp: [75, 115], nm: [230, 300] },
];
