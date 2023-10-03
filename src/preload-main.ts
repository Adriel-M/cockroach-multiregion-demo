// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";
import { WindowType } from "./Arguments";
import IpcEvents from "./IpcEvents";

contextBridge.exposeInMainWorld("appInfo", {
  windowType: WindowType.Main,
});

contextBridge.exposeInMainWorld("openNewWindow", {
  databaseClient: () => {
    ipcRenderer.send(IpcEvents.newDatabaseClientWindow);
  },
});