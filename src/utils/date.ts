export function convertDdMmYyyyToDate(dateString: String) {
  // Split the string by '/' to get day, month, and year parts
  const parts = dateString.split('/');
  const day = parts[0];
  const month = parts[1];
  const year = parts[2];

  // Reconstruct the string in YYYY-MM-DD format
  const isoFormattedString = `${year}-${month}-${day}`;

  // Create a new Date object from the ISO formatted string
  return new Date(isoFormattedString);
}

export function formatDateToDDMMYYYY(date: Date): string {
  const d = date.getDate() + 1; //ajustar, por algum motivo getdate subtrai um
  const day = d.toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}
