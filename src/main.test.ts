let data = [["dummy"]];

const range = jest.fn(() => ({
  getRange: jest.fn(() => ({
    getValue: jest.fn(() => {
      return data[0][0];
    }),
    setValue: jest.fn((val) => {
      data[0][0] = val;
    }),
    getValues: jest.fn(() => data),
    setValues: jest.fn((val) => {
      data = val;
    }),
  })),
}));

const sheet = jest.fn(() => ({ getSheetByName: range, getActiveSheet: range }));

SpreadsheetApp = { getActiveSpreadsheet: sheet, openByUrl: sheet } as any;

ContentService = {
  createTextOutput: jest.fn(() => textOutput),
} as any;

const textOutput: GoogleAppsScript.Content.TextOutput = {
  append: () => textOutput,
  clear: () => textOutput,
  downloadAsFile: () => textOutput,
  getContent: () => "",
  getFileName: () => "",
  getMimeType: () => ({} as GoogleAppsScript.Content.MimeType),
  setContent: () => textOutput,
  setMimeType: () => textOutput,
};

PropertiesService = {
  getScriptProperties: jest.fn(() => ({ getProperty: jest.fn(() => "") })),
} as any;

function makeGetTestData(data: object | string): GoogleAppsScript.Events.DoGet {
  const contents = typeof data === "string" ? data : JSON.stringify(data);
  return {
    parameter: {},
    pathInfo: "",
    contextPath: "",
    contentLength: contents.length,
    queryString: "",
    parameters: {},
  };
}

function makePostTestData(
  data: object | string
): GoogleAppsScript.Events.DoPost {
  const contents = typeof data === "string" ? data : JSON.stringify(data);
  const res = makeGetTestData(data);
  return {
    ...res,
    postData: {
      length: contents.length,
      type: "FileUpload",
      contents: contents,
      name: "postData",
    },
  };
}

import { doGet, doPost } from "./main";

it("doGet", () => {
  doGet(makeGetTestData(""));
  expect(
    (
      ContentService.createTextOutput as unknown as jest.Mock<
        GoogleAppsScript.Content.TextOutput,
        []
      >
    ).mock.calls[0].at(0)
  ).toBe(JSON.stringify("dummy"));
});

it("doPost", () => {
  doPost(makePostTestData("data"));
  expect(data[0][0]).toBe("data");
});
