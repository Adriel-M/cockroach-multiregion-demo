// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge } from "electron";
import { ConnectionInfo, WindowType } from "../Types";
import DatabaseClientDatabaseManager from "./DatabaseClientDatabaseManager";

interface DatabaseApi {
  connectAndStartPolling: (connectionUrl: ConnectionInfo | null) => void;
  updateColor: (color: string) => void;
  subscribeToColor: (callback: (color: string) => void) => void;
  toggleFollowerReads: () => void;
}

declare global {
  interface Window {
    databaseApi: DatabaseApi;
  }
}

contextBridge.exposeInMainWorld("windowType", WindowType.DatabaseClient);

contextBridge.exposeInMainWorld("databaseApi", {
  connectAndStartPolling: async (connectionInfo: ConnectionInfo | null) => {
    if (connectionInfo) {
      await DatabaseClientDatabaseManager.setupAndStartDatabaseConnection(
        connectionInfo,
      );
      DatabaseClientDatabaseManager.startColorPolling();
    }
  },
  updateColor: async (color: string) => {
    await DatabaseClientDatabaseManager.updateColor(color);
  },

  toggleFollowerReads: () => {
    DatabaseClientDatabaseManager.toggleFollowerReads();
  },
});
