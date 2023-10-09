// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";
import { WindowType } from "../Types";
import IpcChannels from "../IpcChannels";
import MainWindowDatabaseManager from "./MainWindowDatabaseManager";
import { dispatchEvent } from "../events/EventApi";
import { DatabaseInitializedEvent } from "../events/CustomEvents";
import { DemoTable } from "../database/DemoTable";

contextBridge.exposeInMainWorld("windowType", WindowType.Main);

contextBridge.exposeInMainWorld("openNewWindow", {
  databaseClient: () => {
    ipcRenderer.send(IpcChannels.newDatabaseClientWindow);
  },
});

interface DemoTableApi {
  setDemoTable: (demoTable: DemoTable) => void;
  subscribeDemoTableUpdate: (callback: (demoTable: DemoTable) => void) => void;
  unsubscribeDemoTableUpdate: (
    callback: (demoTable: DemoTable) => void,
  ) => void;
}

contextBridge.exposeInMainWorld("demoTableApi", {
  setDemoTable: (demoTable: DemoTable) => {
    ipcRenderer.send(IpcChannels.demoTableChanged, demoTable);
  },
  subscribeDemoTableUpdate: (callback: (demoTable: DemoTable) => void) => {
    ipcRenderer.on(
      IpcChannels.demoTableBeingQueried,
      (_, demoTable: DemoTable) => {
        callback(demoTable);
      },
    );
  },
  unsubscribeDemoTableUpdate: (callback: (demoTable: DemoTable) => void) => {
    ipcRenderer.removeListener(IpcChannels.demoTableBeingQueried, callback);
  },
});

declare global {
  interface Window {
    demoTableApi: DemoTableApi;
  }
}

async function setup() {
  dispatchEvent(new DatabaseInitializedEvent(false));
  await MainWindowDatabaseManager.setupDatabase();
  dispatchEvent(new DatabaseInitializedEvent(true));
}
setup();
