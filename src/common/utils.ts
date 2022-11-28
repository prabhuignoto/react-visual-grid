export const isStringPercent: (val: string | number) => boolean = (val) => {
  return typeof val === "string" && val.includes("%");
};

export const stringToNumber: (val: string) => number = (val) => {
  return Number(val.replace("%", ""));
};
