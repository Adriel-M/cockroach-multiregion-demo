import React, { ChangeEvent, useCallback, useEffect } from "react";
import { DemoTable } from "../database/DemoTable";
import { Card, FormControl, FormLabel, Radio, RadioGroup } from "@mui/joy";

const LocalitySelector: React.FC = () => {
  const [localityIndex, setLocalityIndex] = React.useState("0");

  const demoTableChangedHandler = useCallback(
    (demoTable: DemoTable) => {
      const index = regionSelections.findIndex(
        (x) => x.table.tableName == demoTable.tableName,
      );
      setLocalityIndex(index.toString());
    },
    [setLocalityIndex],
  );

  useEffect(() => {
    window.demoTableApi.subscribeDemoTableUpdate(demoTableChangedHandler);

    return () => {
      window.demoTableApi.unsubscribeDemoTableUpdate(demoTableChangedHandler);
    };
  }, [demoTableChangedHandler]);
  return (
    <Card>
      <FormControl>
        <FormLabel>Choose a Locality mode</FormLabel>
        <RadioGroup
          defaultValue="female"
          name="controlled-radio-buttons-group"
          value={localityIndex}
          onChange={handleChange}
          sx={{ my: 1 }}
        >
          {regionSelections.map((x, i) => {
            return <Radio value={i.toString()} key={i} label={x.label} />;
          })}
        </RadioGroup>
      </FormControl>
    </Card>
  );
};

const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
  const index = parseInt(event.target.value);
  const demoTable = regionSelections[index].table;
  window.demoTableApi.setDemoTable(demoTable);
};

export default LocalitySelector;

interface LocalitySelectorProps {
  label: string;
  table: DemoTable;
}

const regionSelections: LocalitySelectorProps[] = [
  {
    label: "Regional By Table (us-east1)",
    table: DemoTable.ColorRegionalUsEast1,
  },
  {
    label: "Regional By Table (us-west1)",
    table: DemoTable.ColorRegionalUsWest1,
  },
  {
    label: "Regional By Table (europe-west1)",
    table: DemoTable.ColorRegionalEuWest1,
  },
  {
    label: "Global",
    table: DemoTable.ColorGlobal,
  },
];
