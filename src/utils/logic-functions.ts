export const checkUsernameValidation = (username: string) => {
  const value = username.trim().length;
  return value >= 3 && value <= 15
    ? undefined
    : "Name has length min 3 characters. Spaces at the beginning and end are not counted.";
};

export const checkStringIsEmpty = (string: string) => {
  return string.trim().length ? undefined : "Field can't be empty";
};
