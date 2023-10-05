import React, { useEffect, useState } from "react";
import { Sheet, Stack } from "@mui/joy";
import { ConnectionInfo } from "../Types";
import ConnectionSelector from "./ConnectionSelector";
import ColorSelector from "./ColorSelector";
import ColorDisplay from "./ColorDisplay";
import QueryMetrics from "./QueryMetrics";

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
        {connectionInfo ? (
          <>
            <ColorDisplay />
            <ColorSelector />
            <QueryMetrics />
          </>
        ) : null}
        <div>Current Connection Url: {connectionInfo?.port}</div>
      </Stack>
    </Sheet>
  );
};

export default DatabaseClientWindow;
