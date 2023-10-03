import React, { useState } from "react";
import { Sheet, Stack } from "@mui/joy";
import { ConnectionInfo } from "./Types";
import ConnectionSelector from "./ConnectionSelector";
const DatabaseClientWindow: React.FC = () => {
  const [connectionInfo, setConnectionInfo] = useState<ConnectionInfo | null>(
    null,
  );
  return (
    <Sheet>
      <Stack>
        <ConnectionSelector onConnectionInfoSelect={setConnectionInfo} />
        <div>
          Current Connection Url: {connectionInfo && connectionInfo.url}
        </div>
      </Stack>
    </Sheet>
  );
};

export default DatabaseClientWindow;
