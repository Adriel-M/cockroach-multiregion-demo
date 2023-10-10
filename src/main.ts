import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import * as fs from "fs";
import IpcChannels from "./IpcChannels";
import { DemoTable } from "./database/DemoTable";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

let demoTableBeingQueried = DemoTable.ColorRegionalUsEast1;
const windows: BrowserWindow[] = [];

const createWindow = (windowType: AppWindowType) => {
  // Create the browser window.
  const preloadFilePath = path.join(__dirname, windowType.preloadFileName);
  const appWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: preloadFilePath,
      contextIsolation: true,
      nodeIntegration: true,
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    appWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    appWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
    );
  }

  // Full reload if preload file changes
  const preloadFileWatcher = fs.watch(preloadFilePath, (_, fileName) => {
    if (fileName) {
      appWindow.reload();
    }
  });

  // stop the watch when the window is closed
  appWindow.on("closed", () => {
    preloadFileWatcher.close();
  });

  if (windowType === AppWindowType.Main) {
    appWindow.on("close", () => {
      app.quit();
    });
  }

  appWindow.webContents.on("did-finish-load", () => {
    appWindow.webContents.send(
      IpcChannels.demoTableBeingQueried,
      demoTableBeingQueried,
    );
  });

  // Track window instances so we can broadcast an event when the demo table changes
  windows.push(appWindow);
  appWindow.on("closed", () => {
    const i = windows.indexOf(appWindow);
    if (i > -1) {
      windows.splice(i, 1);
    }
  });

  // Uncomment during development
  // Open the DevTools.
  // appWindow.webContents.openDevTools();
};

ipcMain.on(IpcChannels.demoTableChanged, (_, demoTable: DemoTable) => {
  demoTableBeingQueried = demoTable;
  windows.forEach((window) => {
    window.webContents.send(IpcChannels.demoTableBeingQueried, demoTable);
  });
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  createWindow(AppWindowType.Main);
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

ipcMain.on(IpcChannels.newDatabaseClientWindow, () => {
  createWindow(AppWindowType.DatabaseClient);
});

class AppWindowType {
  preloadFileName: string;

  constructor(preloadFileName: string) {
    this.preloadFileName = preloadFileName;
  }

  static Main = new AppWindowType("preload-main.js");
  static DatabaseClient = new AppWindowType("preload-database-client.js");
}
