export const detectType = (value: string) => {
  if (value === "true" || value === "false") {
    return "boolean";
  }

  if (/^\d+$/.test(value)) {
    return "integer";
  }

  if (/^\d+\.\d+$/.test(value)) {
    return "float";
  }

  return "string";
};