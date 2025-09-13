export const convertNumbersToPersian = (input: string | number): string => {
  const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

  const stringInput = String(input);

  let result = "";
  for (let i = 0; i < stringInput.length; i++) {
    const char = stringInput[i];
    if (char >= "0" && char <= "9") {
      result += persianNumbers[parseInt(char)];
    } else {
      result += char;
    }
  }

  return result;
};
