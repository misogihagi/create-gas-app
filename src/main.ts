export type DoGet<T> = (req: GoogleAppsScript.Events.DoGet) => T;
export type DoPost = (req: GoogleAppsScript.Events.DoPost) => void;

export const doGet: DoGet<GoogleAppsScript.Content.TextOutput> = () => {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("sheet");

  return ContentService.createTextOutput(
    JSON.stringify(sheet?.getRange(1, 1, 1, 1).getValue())
  );
};

export const doPost: DoPost = (req: GoogleAppsScript.Events.DoPost) => {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("sheet");
  if (!sheet) return;

  sheet.getRange(1, 1, 1, 1).setValue(req.postData.contents);
};
