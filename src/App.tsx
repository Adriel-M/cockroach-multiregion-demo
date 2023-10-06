import React, { useEffect, useState } from "react";
import { WindowType } from "./Types";

import "@fontsource/inter";
import { CircularProgress, CssVarsProvider, Sheet } from "@mui/joy";
import MainWindow from "./main-window/MainWindow";
import DatabaseClientWindow from "./database-client-window/DatabaseClientWindow";

declare global {
  interface Window {
    windowType: WindowType;
  }
}

const App: React.FC = () => {
  const [windowType, setWindowType] = useState<WindowType | null>(null);

  useEffect(() => {
    setWindowType(window.windowType);
  }, []);

  let child = <CircularProgress />;

  if (windowType == WindowType.Main) {
    child = <MainWindow />;
  } else if (windowType === WindowType.DatabaseClient) {
    child = <DatabaseClientWindow />;
  }

  return (
    <CssVarsProvider>
      <Sheet>{child}</Sheet>
    </CssVarsProvider>
  );
};

export default App;
