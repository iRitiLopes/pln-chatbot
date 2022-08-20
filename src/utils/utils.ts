export const normalizeArray = (array: any[]): any[] => {
  return array.filter((val) => val !== undefined);
};

export const toProperCase = (string: string): string => {
  return (
    string.charAt(0).toLocaleUpperCase() + string.slice(1).toLocaleLowerCase()
  );
};

export const getRandomIndex = (arr: any[]): number => {
  return Math.floor(Math.random() * arr.length);
};

export const getRandomChoice = (arr: any[]): any => {
  return arr[getRandomIndex(arr)];
};
