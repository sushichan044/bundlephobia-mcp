export const isEmptyObject = (obj: object): obj is Record<string, never> =>
  Object.keys(obj).length === 0 && obj.constructor === Object;
