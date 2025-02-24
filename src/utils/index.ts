export const isNumber = (value: string): boolean => {
  return value === "" || /^\d+(\.\d{0,2})?$/.test(value);
};


export const getNumber = (val: string): number => {
  return val === "" ? 0 : parseFloat(parseFloat(val).toFixed(2));
};

