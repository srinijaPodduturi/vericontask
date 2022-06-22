export const objToArray = (obj: any) => {
  return Object.keys(obj).map((key) => ({ name: key, value: obj[key] }));
};
