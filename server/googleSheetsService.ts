import { google } from "googleapis";

// Set up the Google Sheets API client
const setupSheetsClient = async () => {
  try {
    // Check for the Google Sheets API key from environment variables
    const apiKey = process.env.GOOGLE_SHEETS_API_KEY || "";
    if (!apiKey) {
      throw new Error("GOOGLE_SHEETS_API_KEY environment variable is missing");
    }

    // Set up the sheets API with the API key
    const sheets = google.sheets({ version: "v4", auth: apiKey });
    return sheets;
  } catch (error) {
    console.error("Error setting up Google Sheets client:", error);
    throw error;
  }
};

// Get the Google Sheets spreadsheet ID from environment variables
const getSpreadsheetId = () => {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID || "";
  if (!spreadsheetId) {
    throw new Error("GOOGLE_SHEETS_SPREADSHEET_ID environment variable is missing");
  }
  return spreadsheetId;
};

// Save certificate data to Google Sheets
export const saveToGoogleSheets = async (data: {
  name: string;
  email: string;
  githubRepo: string;
  vercelDeployment: string;
  projectExplanation: string;
  certificateId: string;
  createdAt: string;
}) => {
  try {
    const sheets = await setupSheetsClient();
    const spreadsheetId = getSpreadsheetId();

    // Format the row data
    const rowData = [
      data.certificateId,
      data.name,
      data.email,
      data.githubRepo,
      data.vercelDeployment,
      data.projectExplanation,
      data.createdAt
    ];

    // Append the data to the sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Sheet1!A:G", // Adjust the sheet name and range as needed
      valueInputOption: "RAW",
      requestBody: {
        values: [rowData]
      }
    });

    console.log(`Certificate data saved to Google Sheets with ID: ${data.certificateId}`);
    return true;
  } catch (error) {
    console.error("Error saving to Google Sheets:", error);
    throw error;
  }
};

// Optional: Function to retrieve certificate data from Google Sheets by certificate ID
export const getCertificateFromGoogleSheets = async (certificateId: string) => {
  try {
    const sheets = await setupSheetsClient();
    const spreadsheetId = getSpreadsheetId();

    // Get all values from the sheet
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Sheet1!A:G", // Adjust the sheet name and range as needed
    });

    const rows = response.data.values || [];
    
    // Find the row with the matching certificate ID (first column)
    const certificateRow = rows.find(row => row[0] === certificateId);
    
    if (!certificateRow) {
      return null;
    }

    // Convert the row data to an object
    return {
      certificateId: certificateRow[0],
      name: certificateRow[1],
      email: certificateRow[2],
      githubRepo: certificateRow[3],
      vercelDeployment: certificateRow[4],
      projectExplanation: certificateRow[5],
      createdAt: certificateRow[6]
    };
  } catch (error) {
    console.error("Error retrieving from Google Sheets:", error);
    throw error;
  }
};
