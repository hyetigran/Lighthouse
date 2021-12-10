export const marketCapFormatter = (mCap: number) => {
  let result = mCap.toString();
  let suffix = "";
  if (mCap >= 1000000 && mCap < 1000000000) {
    result = (mCap / 1000000).toFixed(3);
    suffix = "M";
  } else if (mCap >= 1000000000 && mCap < 1000000000000) {
    result = (mCap / 1000000000).toFixed(3);
    suffix = "B";
  } else if (mCap >= 1000000000000 && mCap < 1000000000000000) {
    result = (mCap / 1000000000000).toFixed(3);
    suffix = "T";
  }
  return `$${result} ${suffix}`;
};

export const roundNumber = (value: string, digits = 0) => {
  const [, right] = String(value).split(".");
  if (right && right.length <= digits) {
    return value;
  }

  const decimals = Math.pow(10, digits);
  return (
    Math.round((Number(value) + Number.EPSILON) * decimals) / decimals
  ).toString();
};

export const estimateTransactionBytes = (
  inputCount: number,
  outputCount: number
) => {
  return inputCount * 149 + outputCount * 34 + 10;
};

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
