import React, { useCallback, useEffect, useState } from "react";
import { Card, CardContent, Grid, Typography } from "@mui/joy";
import { SelectLatencyEvent, UpdateLatencyEvent } from "../events/CustomEvents";
import { addEventListener, removeEventListener } from "../events/EventApi";

const QueryMetrics: React.FC = () => {
  const [selectLatency, setSelectLatency] = useState<number | null>(null);
  const searchLatencyEventHandler = useCallback(
    (event: SelectLatencyEvent) => {
      setSelectLatency(event.detail);
    },
    [setSelectLatency],
  );
  useEffect(() => {
    addEventListener(SelectLatencyEvent, searchLatencyEventHandler);
    return () => {
      removeEventListener(SelectLatencyEvent, searchLatencyEventHandler);
    };
  }, [searchLatencyEventHandler]);

  const [updateLatency, setUpdateLatency] = useState<number | null>(null);
  const updateLatencyEventHandler = useCallback(
    (event: UpdateLatencyEvent) => {
      setUpdateLatency(event.detail);
    },
    [setUpdateLatency],
  );
  useEffect(() => {
    addEventListener(UpdateLatencyEvent, updateLatencyEventHandler);
    return () => {
      removeEventListener(UpdateLatencyEvent, updateLatencyEventHandler);
    };
  }, [updateLatencyEventHandler]);
  return (
    <Card>
      <Typography>Query Metrics</Typography>
      <Grid container spacing={2} sx={{ width: "100%" }}>
        <Grid xs={6} md>
          <MetricDisplay title="Select Latency" value={`${selectLatency}ms`} />
          <MetricDisplay
            title="Update Latency"
            value={updateLatency ? `${updateLatency}ms` : ""}
          />
        </Grid>
      </Grid>
    </Card>
  );
};

const MetricDisplay: React.FC<{ title: string; value: string }> = ({
  title,
  value,
}) => {
  return (
    <Card
      sx={{
        width: 300,
      }}
    >
      <CardContent sx={{ alignItems: "center", textAlign: "center" }}>
        <Typography level="h1">{title}</Typography>
        <Typography level="body-lg">{value}</Typography>
      </CardContent>
    </Card>
  );
};

export default QueryMetrics;
