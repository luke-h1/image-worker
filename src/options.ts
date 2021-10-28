import chrome from "chrome-aws-lambda";

interface Options {
  args: string[];
  executablePath: string;
  headless: boolean;
}

export async function getLaunchOptions(isDev: boolean) {
  let options: Options;

  if (isDev) {
    options = {
      args: [],
      executablePath: await chrome.executablePath,
      headless: true,
    };
  } else {
    options = {
      args: chrome.args,
      executablePath: await chrome.executablePath,
      headless: chrome.headless,
    };
  }
  return options;
}
