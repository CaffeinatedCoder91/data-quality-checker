import type { CSVRow } from '../types';

export async function parseCSV(file: File): Promise<CSVRow[]> {
  let text: string;

  if (typeof file.text === 'function') {
    text = await file.text();
  } else {
    text = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(reader.error);
      reader.readAsText(file);
    });
  }

  const lines = text.trim().split('\n');

  if (lines.length < 2) {
    return [];
  }

  const headers = lines[0].split(',').map(headerValue => headerValue.trim());
  const rows: CSVRow[] = [];

  for (let lineIndex = 1; lineIndex < lines.length; lineIndex++) {
    const values = lines[lineIndex].split(',').map(cellValue => cellValue.trim());
    const row: CSVRow = {};

    headers.forEach((header, columnIndex) => {
      row[header] = values[columnIndex] || '';
    });

    rows.push(row);
  }

  return rows;
}
