import React, { useCallback, useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/joy";
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
      <Query title="Select Query" value={pollingQuery} />
      <Query title="Update Query" value={updateQuery} />
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
      }}
    >
      <CardContent sx={{ alignItems: "center", textAlign: "center" }}>
        <Typography level="h1">{title}</Typography>
        <Typography level="body-lg">{value}</Typography>
      </CardContent>
    </Card>
  );
};

export default QueryDisplay;
