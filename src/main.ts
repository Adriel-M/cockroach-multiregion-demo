import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import IpcEvents from "./IpcEvents";
import * as fs from "fs";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

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
  appWindow.on("close", () => {
    preloadFileWatcher.close();
  });

  // Open the DevTools.
  appWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
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

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow(AppWindowType.Main);
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

ipcMain.on(IpcEvents.newDatabaseClientWindow, () => {
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
