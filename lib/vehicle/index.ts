export function normaliseReg(reg: string): string {
  return reg.toUpperCase().replace(/\s/g, "");
}

export function isPlausibleReg(reg: string): boolean {
  const norm = normaliseReg(reg);
  return /^[A-Z0-9]{2,8}$/.test(norm);
}
