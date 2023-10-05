import { ConnectionInfo } from "../Types";
import React from "react";
import { Card, Select, Typography, Option, Stack, Checkbox } from "@mui/joy";

import connectionInfo from "../connectionInfo.json";

interface Props {
  onConnectionInfoSelect: (connectionInfo: ConnectionInfo | null) => void;
  isFollowerReadsEnabled: boolean | null;
}

const ConnectionSelector: React.FC<Props> = ({
  onConnectionInfoSelect,
  isFollowerReadsEnabled,
}) => {
  return (
    <Card>
      <Typography level="h1">Connection Selection</Typography>
      <Typography level="h4">Choose a region to connect to</Typography>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Select
          placeholder="Choose one..."
          onChange={(_, newValue: ConnectionInfo | null) =>
            onConnectionInfoSelect(newValue)
          }
        >
          {connectionInfo.map((info: ConnectionInfo, index: number) => {
            return (
              <Option value={info} key={index}>
                {info.region} {info.flag}
              </Option>
            );
          })}
        </Select>
        <Checkbox
          disabled={isFollowerReadsEnabled === null}
          checked={isFollowerReadsEnabled ?? false}
          onChange={window.databaseApi.toggleFollowerReads}
          label="Enable Follower Reads"
          readOnly={true}
        />
      </Stack>
    </Card>
  );
};

export default ConnectionSelector;
