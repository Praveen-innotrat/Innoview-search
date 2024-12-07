export function formatPhoneNumber(phoneNumber) {
  // Convert the number to a string in case it's provided as a number
  const phoneStr = phoneNumber.toString();

  // Ensure the phone number starts with "91" (Indian country code)
  if (phoneStr.length === 12 && phoneStr.startsWith("91")) {
    // Split into country code and the rest of the phone number
    const countryCode = "+91";
    const localNumber = phoneStr.slice(2); // Remove first two digits (91)

    // Format the local number by inserting a space after the country code
    return `${countryCode} ${localNumber}`;
  } else {
    return "Invalid phone number";
  }
}

export function formatDate(date) {
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  };

  return new Date(date).toLocaleString("en-IN", options);
}

export function formatRupees(amount) {
  return amount.toLocaleString("en-IN");
}
