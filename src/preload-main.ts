// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";
import { WindowType } from "./Arguments";
import Events from "./Events";

contextBridge.exposeInMainWorld("appInfo", {
  windowType: WindowType.Main,
});

contextBridge.exposeInMainWorld("openNewWindow", {
  databaseClient: () => {
    ipcRenderer.send(Events.newDatabaseClientWindow);
  },
});
