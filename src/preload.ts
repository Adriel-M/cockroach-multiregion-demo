// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";
import { PreloadArguments } from "./Arguments";
import IpcEvents from "./IpcEvents";

interface PreloadArgs {
  receiveData: (func: (arg: PreloadArguments) => void) => void;
}

interface OpenNewWindow {
  databaseClient: () => void;
}

declare global {
  interface Window {
    preloadArgs: PreloadArgs;
    openNewWindow: OpenNewWindow;
  }
}

contextBridge.exposeInMainWorld("preloadArgs", {
  receiveData: (func: (arg: PreloadArguments) => void) => {
    ipcRenderer.on("preload-args", (event, arg) => func(arg));
  },
});

contextBridge.exposeInMainWorld("openNewWindow", {
  databaseClient: () => {
    ipcRenderer.send(IpcEvents.newDatabaseClientWindow);
  },
});
