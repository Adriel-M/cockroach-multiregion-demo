import React, { useCallback, useEffect, useState } from "react";
import {
  AspectRatio,
  Button,
  Card,
  CardContent,
  LinearProgress,
  Sheet,
  Typography,
} from "@mui/joy";

import map from "../../assets/map.png";
import { addEventListener, removeEventListener } from "../events/EventApi";
import { DatabaseInitializedEvent } from "../events/CustomEvents";
import LocalitySelector from "./LocalitySelector";

const MainWindow: React.FC = () => {
  // Default true, so on hmr it doesn't get stuck
  const [isDatabaseSetup, setIsDatabaseSetup] = useState(false);

  const databaseInitializedEventHandler = useCallback(
    (event: DatabaseInitializedEvent) => {
      setIsDatabaseSetup(event.detail);
    },
    [setIsDatabaseSetup],
  );

  useEffect(() => {
    addEventListener(DatabaseInitializedEvent, databaseInitializedEventHandler);

    return () => {
      removeEventListener(
        DatabaseInitializedEvent,
        databaseInitializedEventHandler,
      );
    };
  }, [databaseInitializedEventHandler]);
  return (
    <Sheet>
      {isDatabaseSetup ? (
        <Sheet>
          <Card>
            <Typography level="title-lg">
              Cockroach Multi Region demo!
            </Typography>
            <AspectRatio minHeight="120px" maxHeight="200px">
              <img src={map} loading="lazy" alt="" />
            </AspectRatio>
            <CardContent orientation="horizontal">
              <Typography level="body-xs">
                Open a new Database Client:
              </Typography>
              <Button
                variant="solid"
                size="md"
                color="primary"
                aria-label="New Client"
                sx={{ ml: "auto", alignSelf: "center", fontWeight: 600 }}
                onClick={openNewDatabaseClientWindow}
              >
                Click Me!
              </Button>
            </CardContent>
          </Card>
          <LocalitySelector />
        </Sheet>
      ) : (
        <Card>
          <Typography level="h1">Loading</Typography>
          <LinearProgress determinate={false} size="lg" variant="soft" />
        </Card>
      )}
    </Sheet>
  );
};

interface OpenNewWindow {
  databaseClient: () => void;
}

declare global {
  interface Window {
    openNewWindow: OpenNewWindow;
  }
}

const openNewDatabaseClientWindow = () => {
  window.openNewWindow.databaseClient();
};

export default MainWindow;
