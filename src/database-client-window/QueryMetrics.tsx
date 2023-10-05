import React, { useEffect, useState } from "react";
import { AspectRatio, Card, Grid, Typography } from "@mui/joy";
import { SelectLatencyEvent } from "../events/CustomEvents";
import { addEventListener, removeEventListener } from "../events/EventApi";

const QueryMetrics: React.FC = () => {
  const [pollLatency, setPollLatency] = useState<number | null>(null);
  const handler = (event: SelectLatencyEvent) => {
    setPollLatency(event.detail);
  };
  useEffect(() => {
    addEventListener(SelectLatencyEvent, handler);
    return () => {
      removeEventListener(SelectLatencyEvent, handler);
    };
  }, []);
  return (
    <Card>
      <Typography>Query Metrics</Typography>
      <Grid container spacing={2} sx={{ width: "100%" }}>
        <Grid xs={6} md>
          <AspectRatio>
            <Typography level="body-sm">{~~pollLatency}ms</Typography>
            <Typography level="h1">Latency</Typography>
          </AspectRatio>
        </Grid>
      </Grid>
    </Card>
  );
};

export default QueryMetrics;
