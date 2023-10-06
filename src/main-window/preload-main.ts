// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";
import { WindowType } from "../Types";
import IpcChannels from "../IpcChannels";
import MainWindowDatabaseManager from "./MainWindowDatabaseManager";
import { dispatchEvent } from "../events/EventApi";
import { DatabaseInitializedEvent } from "../events/CustomEvents";

contextBridge.exposeInMainWorld("windowType", WindowType.Main);

contextBridge.exposeInMainWorld("openNewWindow", {
  databaseClient: () => {
    ipcRenderer.send(IpcChannels.newDatabaseClientWindow);
  },
});

async function setup() {
  dispatchEvent(new DatabaseInitializedEvent(false));
  await MainWindowDatabaseManager.setupDatabase();
  dispatchEvent(new DatabaseInitializedEvent(true));
}
setup();
