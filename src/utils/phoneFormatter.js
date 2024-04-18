export function formatPhoneNumber(phoneNumber) {
  // Remove any non-digit characters from the input
  const cleaned = phoneNumber.replace(/\D/g, "");
  // Apply the desired format
  const formatted = `+998 (${cleaned.slice(0, 2)}) ${cleaned.slice(
    2,
    5
  )}-${cleaned.slice(5, 7)}-${cleaned.slice(7)}`;

  return formatted;
}