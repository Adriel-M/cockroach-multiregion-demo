import React, { useEffect, useState } from "react";
import { PreloadArguments, WindowType } from "./Arguments";
import DatabaseClientWindow from "./DatabaseClientWindow";
import MainWindow from "./MainWindow";

import "@fontsource/inter";
import { CircularProgress, CssVarsProvider, Sheet } from "@mui/joy";

const App: React.FC = () => {
  const [data, setData] = useState<PreloadArguments | null>(null);

  useEffect(() => {
    window.preloadArgs.receiveData((preloadArguments: PreloadArguments) => {
      setData(preloadArguments);
    });

    return () => {
      window.preloadArgs.receiveData(null);
    };
  }, []);

  let child = <CircularProgress />;

  if (data && data.windowType) {
    if (data.windowType == WindowType.Main) {
      child = <MainWindow />;
    } else {
      child = <DatabaseClientWindow />;
    }
  }

  return (
    <CssVarsProvider>
      <Sheet>{child}</Sheet>
    </CssVarsProvider>
  );
};

export default App;
