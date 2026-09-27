// slotsTotal/slotsRemaining is a PLACEHOLDER — update by hand as real bookings come in.
// Do not wire this to anything that changes it automatically.
export const launchOffer: {
  active: boolean;
  label: string;
  slotsTotal: number;
  slotsRemaining: number;
} = { active: true, label: "Launch Offer", slotsTotal: 5, slotsRemaining: 5 };
