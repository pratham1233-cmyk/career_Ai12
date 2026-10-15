import { getAccessToken } from './firebase';

export interface DriveUploadResult {
  id: string;
  name: string;
  webViewLink?: string;
}

export interface SheetCreateResult {
  spreadsheetId: string;
  spreadsheetUrl: string;
}

/**
 * Creates a file in Google Drive under user's authorization.
 */
export async function uploadToGoogleDrive(
  fileName: string,
  content: string,
  mimeType: string = 'text/plain'
): Promise<DriveUploadResult> {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('Please sign in with Google to enable Drive uploads.');
  }

  const metadata = {
    name: fileName,
    mimeType: mimeType,
  };

  const boundary = '-------314159265358979323846';
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelimiter = `\r\n--${boundary}--`;

  const multipartRequestBody =
    delimiter +
    'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
    JSON.stringify(metadata) +
    delimiter +
    `Content-Type: ${mimeType}\r\n\r\n` +
    content +
    closeDelimiter;

  const response = await fetch(
    'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,webViewLink',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': `multipart/related; boundary=${boundary}`,
      },
      body: multipartRequestBody,
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || 'Failed to upload document to Google Drive');
  }

  return response.json();
}

/**
 * Creates a Google Spreadsheet and populates it with headers and row data.
 */
export async function createGoogleSheet(
  title: string,
  headers: string[],
  rows: (string | number)[][]
): Promise<SheetCreateResult> {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('Please sign in with Google to create a Google Sheet.');
  }

  // 1. Create Spreadsheet
  const createRes = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: {
        title,
      },
    }),
  });

  if (!createRes.ok) {
    const errorData = await createRes.json().catch(() => ({}));
    throw new Error(errorData.error?.message || 'Failed to create Google Spreadsheet');
  }

  const sheetData = await createRes.json();
  const spreadsheetId = sheetData.spreadsheetId;
  const spreadsheetUrl = sheetData.spreadsheetUrl;

  // 2. Populate values
  const values = [headers, ...rows];
  const appendRes = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1!A1:append?valueInputOption=USER_ENTERED`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values,
      }),
    }
  );

  if (!appendRes.ok) {
    console.warn('Could not populate rows into spreadsheet:', await appendRes.text());
  }

  return {
    spreadsheetId,
    spreadsheetUrl,
  };
}
