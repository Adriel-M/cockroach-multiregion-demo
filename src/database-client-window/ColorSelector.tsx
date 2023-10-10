import React from "react";
import { Button, Card, Typography } from "@mui/joy";

const colors: string[] = ["danger", "success", "primary"];

const ColorSelector: React.FC = () => {
  return (
    <Card>
      <Typography variant="h3">Color Selector</Typography>
      {colors.map((color: string) => (
        <Button key={color} color={color} onClick={() => updateColor(color)}>
          {color}
        </Button>
      ))}
    </Card>
  );
};

const updateColor = (color: string) => {
  window.databaseApi.updateColor(color);
};

export default ColorSelector;
