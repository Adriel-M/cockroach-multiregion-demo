import React, { useCallback, useEffect, useState } from "react";
import { Card, CardContent, Stack, Typography } from "@mui/joy";
import {
  PollingQueryChangedEvent,
  UpdateQueryChangedEvent,
} from "../events/CustomEvents";
import { addEventListener, removeEventListener } from "../events/EventApi";

const QueryDisplay: React.FC = () => {
  const [pollingQuery, setPollingQuery] = useState<string>("");

  const pollingQueryEventHandler = useCallback(
    (event: PollingQueryChangedEvent) => {
      setPollingQuery(event.detail);
    },
    [setPollingQuery],
  );
  useEffect(() => {
    addEventListener(PollingQueryChangedEvent, pollingQueryEventHandler);

    return () => {
      removeEventListener(PollingQueryChangedEvent, pollingQueryEventHandler);
    };
  }, [pollingQueryEventHandler]);

  const [updateQuery, setUpdateQuery] = useState<string>("");
  const updateQueryEventHandler = useCallback(
    (event: UpdateQueryChangedEvent) => {
      setUpdateQuery(event.detail);
    },
    [setUpdateQuery],
  );

  useEffect(() => {
    addEventListener(UpdateQueryChangedEvent, updateQueryEventHandler);

    return () => {
      removeEventListener(UpdateQueryChangedEvent, updateQueryEventHandler);
    };
  }, [updateQueryEventHandler]);

  return (
    <Card>
      <Typography level="h1">Queries</Typography>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Query title="Select Query" value={pollingQuery} />
        <Query title="Update Query" value={updateQuery} />
      </Stack>
    </Card>
  );
};

const Query: React.FC<{ title: string; value: string }> = ({
  title,
  value,
}) => {
  return (
    <Card
      sx={{
        width: 300,
        minHeight: 100,
      }}
    >
      <CardContent sx={{ alignItems: "center", textAlign: "center" }}>
        <Typography level="h1">{title}</Typography>
        <Typography level="body-lg" sx={{ fontFamily: "monospace" }}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default QueryDisplay;
