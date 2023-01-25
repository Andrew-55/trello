export const checkInputName = (name: string) => {
  const value = name.trim();
  return value.length >= 3 && value.length <= 15 ? true : false;
};
