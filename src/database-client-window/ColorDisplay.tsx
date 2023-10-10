import { Card, Typography } from "@mui/joy";
import React, { useCallback, useEffect, useState } from "react";
import { addEventListener, removeEventListener } from "../events/EventApi";
import { ColorChangedEvent } from "../events/CustomEvents";

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
      <Typography level="h1">The Current Color is</Typography>
      <Card
        color={currentColor}
        invertedColors={false}
        variant="solid"
        sx={{ minHeight: 100 }}
      />
    </Card>
  );
};

export default ColorDisplay;
