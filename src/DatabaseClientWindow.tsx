import React, { useEffect, useState } from "react";
import { Sheet, Stack } from "@mui/joy";
import { ConnectionInfo } from "./Types";
import ConnectionSelector from "./ConnectionSelector";

interface DatabaseApi {
  connectAndStartPolling: (connectionUrl: ConnectionInfo | null) => void;
}

declare global {
  interface Window {
    databaseApi: DatabaseApi;
  }
}

const DatabaseClientWindow: React.FC = () => {
  const [connectionInfo, setConnectionInfo] = useState<ConnectionInfo | null>(
    null,
  );

  useEffect(() => {
    window.databaseApi.connectAndStartPolling(connectionInfo);
  }, [connectionInfo]);

  return (
    <Sheet>
      <Stack>
        <ConnectionSelector onConnectionInfoSelect={setConnectionInfo} />
        <div>Current Connection Url: {connectionInfo?.port}</div>
      </Stack>
    </Sheet>
  );
};

export default DatabaseClientWindow;
