export const multiplyAndFormat = (a: number | string, b: number | string): number => {
  // Convert inputs to numbers if they are strings
  const numA = parseFloat(a.toString());
  const numB = parseFloat(b.toString());

  // Perform multiplication
  const result = numA * numB;

  // Format the result to 2 decimal places
  return parseFloat(result.toFixed(2));
};
