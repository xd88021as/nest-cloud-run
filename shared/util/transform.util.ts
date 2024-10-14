export const combineInternationalPhoneNumber = (
  countryCode: string,
  phoneNumber: string,
  withPrefix?: boolean,
) => {
  if (withPrefix) return `+${countryCode}-${phoneNumber}`;
  return `${countryCode}-${phoneNumber}`;
};

export const convertLocalPhoneNumberToInternationalNumber = ({
  value,
}: {
  value: string;
}): string => {
  if (!value) {
    return value;
  }
  const [plusCountryCode, plusAreaCode, number] = value.split('-');
  return `${plusCountryCode}-${+plusAreaCode}-${number}`;
};

export const removeLeadingZeroFromPhoneNumber = ({
  value,
}: {
  value: string;
}): string => {
  if (!value) {
    return value;
  }
  const splitPhoneNumber = (phoneNumber: string) => {
    const splitIndex = phoneNumber.length - 9;
    const firstPart = phoneNumber.substring(0, splitIndex);
    const secondPart = phoneNumber.substring(splitIndex);
    return [firstPart, secondPart]
  }
  const [plusCountryCode, number] = value.includes('-') ? value.split('-') : splitPhoneNumber(value)
  return `${plusCountryCode}-${+number}`;
};
