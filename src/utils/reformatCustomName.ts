export const reformatCustomName = (value: string) => {
  return value.trim().toLowerCase().replace(/\s+/g, "-");
};
