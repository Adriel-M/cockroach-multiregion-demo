// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge } from "electron";
import { WindowType } from "./Arguments";
import Database from "./database/Database";
import { ConnectionInfo } from "./Types";

interface DatabaseApi {
  connectAndStartPolling: (connectionUrl: ConnectionInfo | null) => void;
  updateColor: (color: string) => void;
  subscribeToColor: (callback: (color: string) => void) => void;
}

declare global {
  interface Window {
    databaseApi: DatabaseApi;
  }
}

contextBridge.exposeInMainWorld("appInfo", {
  windowType: WindowType.DatabaseClient,
});

let database: Database | null = null;

contextBridge.exposeInMainWorld("databaseApi", {
  connectAndStartPolling: async (connectionInfo: ConnectionInfo | null) => {
    if (database && database.connectionInfo !== connectionInfo) {
      await database.stop();
    }
    if (connectionInfo) {
      database = new Database(connectionInfo);
      await database.start();
    }
  },
  updateColor: async (color: string) => {
    if (database) {
      await database.updateColor(color);
    }
  },
});
