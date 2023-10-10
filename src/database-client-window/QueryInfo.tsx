import React from "react";
import { Card, Stack } from "@mui/joy";
import QueryMetrics from "./QueryMetrics";
import QueryDisplay from "./QueryDisplay";

const QueryInfo: React.FC = () => {
  return (
    <Card>
      <Stack direction="column" spacing={2}>
        <QueryMetrics />
        <QueryDisplay />
      </Stack>
    </Card>
  );
};

export default QueryInfo;
