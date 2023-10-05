import React from "react";
import { Button, Card, Typography } from "@mui/joy";

interface ColorOption {
  label: string;
  joyColor: string;
}

const colorOptions: ColorOption[] = [
  { label: "Red", joyColor: "danger" },
  { label: "Green", joyColor: "success" },
  { label: "Blue", joyColor: "primary" },
];

const ColorSelector: React.FC = () => {
  return (
    <Card>
      <Typography variant="h3">Color Selector</Typography>
      {colorOptions.map((colorOption: ColorOption) => (
        <Button
          key={colorOption.label}
          color={colorOption.joyColor}
          onClick={() => updateColor(colorOption.joyColor)}
        >
          {colorOption.label}
        </Button>
      ))}
    </Card>
  );
};

const updateColor = (color: string) => {
  window.databaseApi.updateColor(color);
};

export default ColorSelector;
