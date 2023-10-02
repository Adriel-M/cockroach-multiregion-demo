import React from "react";
import {
  AspectRatio,
  Button,
  Card,
  CardContent,
  Sheet,
  Typography,
} from "@mui/joy";

import map from "../assets/map.png";

const openNewDatabaseClientWindow = () => {
  window.openNewWindow.databaseClient();
};

const MainWindow: React.FC = () => {
  return (
    <Sheet>
      <Card>
        <Typography level="title-lg">Cockroach Mutli Region demo!</Typography>
        <AspectRatio minHeight="120px" maxHeight="200px">
          {/* Add cockroach image */}
          <img src={map} loading="lazy" alt="" />
        </AspectRatio>
        <CardContent orientation="horizontal">
          <div>
            <Typography level="body-xs">Open a new Database Client:</Typography>
          </div>
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
    </Sheet>
  );
};

export default MainWindow;
