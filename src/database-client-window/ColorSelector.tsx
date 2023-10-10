import React from "react";
import { Button, Card, Stack, Typography } from "@mui/joy";

const colors: string[] = ["danger", "success", "primary"];

const ColorSelector: React.FC = () => {
  return (
    <Card variant="plain">
      <Typography level="title-lg">Update Color</Typography>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        {colors.map((color: string) => (
          <Button key={color} color={color} onClick={() => updateColor(color)}>
            Click Me!
          </Button>
        ))}
      </Stack>
    </Card>
  );
};

const updateColor = (color: string) => {
  window.databaseApi.updateColor(color);
};

export default ColorSelector;
