export const isCuid = (value?: string) => {
  if (!value) return false;

  // regex cuid simple
  return /^c[a-z0-9]{20,}$/i.test(value);
};
