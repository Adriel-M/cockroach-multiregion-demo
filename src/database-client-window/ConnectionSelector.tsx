import { ConnectionInfo } from "../Types";
import React from "react";
import { Card, Select, Typography, Option } from "@mui/joy";

import connectionInfo from "../connectionInfo.json";

interface Props {
  onConnectionInfoSelect: (connectionInfo: ConnectionInfo | null) => void;
}

const ConnectionSelector: React.FC<Props> = ({ onConnectionInfoSelect }) => {
  return (
    <Card>
      <Typography level="h1">Connection Selection</Typography>
      <Typography level="h4">Choose a region to connect to</Typography>
      <Select
        placeholder="Choose one..."
        onChange={(_, newValue: ConnectionInfo | null) =>
          onConnectionInfoSelect(newValue)
        }
      >
        {connectionInfo.map((info: ConnectionInfo, index: number) => {
          return (
            <Option value={info} key={index}>
              {info.region}
            </Option>
          );
        })}
      </Select>
    </Card>
  );
};

export default ConnectionSelector;
