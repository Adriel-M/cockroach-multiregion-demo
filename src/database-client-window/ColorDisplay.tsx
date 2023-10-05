import { Card, Grid, Typography } from "@mui/joy";
import React, { useEffect, useState } from "react";
import { addEventListener, removeEventListener } from "../events/EventApi";
import { ColorChangedEvent } from "../events/CustomEvents";

const joyColorToLabel: Record<string, string> = {
  primary: "Blue",
  success: "Green",
  danger: "Red",
};

const ColorDisplay: React.FC = () => {
  const [currentColor, setCurrentColor] = useState<string | null>(null);
  const handler = (event: ColorChangedEvent) => {
    setCurrentColor(event.detail);
  };
  useEffect(() => {
    addEventListener(ColorChangedEvent, handler);
    return () => {
      removeEventListener(ColorChangedEvent, handler);
    };
  }, []);
  return (
    <Card>
      <Typography level="h1">The Current Color is</Typography>
      <Card color={currentColor} invertedColors={false} variant="solid">
        <Grid display="flex" justifyContent="center">
          <Typography level="h1">{joyColorToLabel[currentColor]}</Typography>
        </Grid>
      </Card>
    </Card>
  );
};

export default ColorDisplay;
