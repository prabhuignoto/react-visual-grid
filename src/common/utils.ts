export const isStringPercent: (val: string | number) => boolean = (val) => {
  return typeof val === "string" && val.includes("%");
};

export const stringToNumber: (val: string) => number = (val) => {
  return Number(val.replace("%", ""));
};

export const generateUniqueId: () => string = () => {
  const randomNum = Math.random() * 1000000000;
  const base36Str = randomNum.toString(36);
  const uniqueId = base36Str.padStart(9, '0').slice(-9);
  return uniqueId;
}
