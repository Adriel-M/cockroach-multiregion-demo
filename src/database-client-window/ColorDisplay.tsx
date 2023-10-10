import { Card, Grid, Typography } from "@mui/joy";
import React, { useCallback, useEffect, useState } from "react";
import { addEventListener, removeEventListener } from "../events/EventApi";
import { ColorChangedEvent } from "../events/CustomEvents";
import ColorSelector from "./ColorSelector";

const ColorDisplay: React.FC = () => {
  const [currentColor, setCurrentColor] = useState<string | null>(null);
  const colorChangedEventHandler = useCallback(
    (event: ColorChangedEvent) => {
      setCurrentColor(event.detail);
    },
    [setCurrentColor],
  );
  useEffect(() => {
    addEventListener(ColorChangedEvent, colorChangedEventHandler);
    return () => {
      removeEventListener(ColorChangedEvent, colorChangedEventHandler);
    };
  }, [colorChangedEventHandler]);
  return (
    <Card>
      <Card color={currentColor} invertedColors={false} variant="solid">
        <Grid display="flex" justifyContent="center" alignItems="Center">
          <Typography level="h1" textColor="white">
            Current Color
          </Typography>
        </Grid>
      </Card>
      <ColorSelector />
    </Card>
  );
};

export default ColorDisplay;
