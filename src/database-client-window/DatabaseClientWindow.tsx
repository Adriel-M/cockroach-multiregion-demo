import React, { useCallback, useEffect, useState } from "react";
import { Sheet, Stack } from "@mui/joy";
import { ConnectionInfo } from "../Types";
import ConnectionSelector from "./ConnectionSelector";
import ColorSelector from "./ColorSelector";
import ColorDisplay from "./ColorDisplay";
import QueryMetrics from "./QueryMetrics";
import { addEventListener, removeEventListener } from "../events/EventApi";
import { FollowerReadChangedEvent } from "../events/CustomEvents";

const DatabaseClientWindow: React.FC = () => {
  const [connectionInfo, setConnectionInfo] = useState<ConnectionInfo | null>(
    null,
  );

  const [isFollowerReadsEnabled, setIsFollowerReadsEnabled] = useState<
    boolean | null
  >(null);

  useEffect(() => {
    window.databaseApi.connectAndStartPolling(connectionInfo);
  }, [connectionInfo]);

  const followerReadChangedEventHandler = useCallback(
    (event: FollowerReadChangedEvent) => {
      setIsFollowerReadsEnabled(event.detail);
    },
    [setIsFollowerReadsEnabled],
  );

  useEffect(() => {
    addEventListener(FollowerReadChangedEvent, followerReadChangedEventHandler);

    return () => {
      removeEventListener(
        FollowerReadChangedEvent,
        followerReadChangedEventHandler,
      );
    };
  }, [followerReadChangedEventHandler]);

  return (
    <Sheet>
      <Stack>
        <ConnectionSelector
          onConnectionInfoSelect={setConnectionInfo}
          isFollowerReadsEnabled={isFollowerReadsEnabled}
        />
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
