import React from "react";
import {
  AspectRatio,
  Button,
  Card,
  CardContent,
  Sheet,
  Typography,
} from "@mui/joy";

const MainWindow: React.FC = () => {
  return (
    <Sheet>
      <Card>
        <Typography level="title-lg">Cockroach Mutli Region demo!</Typography>
        <AspectRatio minHeight="120px" maxHeight="200px">
          {/* Add cockroach image */}
          <img
            src="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286"
            srcSet="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286&dpr=2 2x"
            loading="lazy"
            alt=""
          />
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
          >
            Click Me!
          </Button>
        </CardContent>
      </Card>
    </Sheet>
  );
};

export default MainWindow;
