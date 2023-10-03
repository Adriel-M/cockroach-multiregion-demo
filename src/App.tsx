import React, { useEffect, useState } from "react";
import { WindowType } from "./Arguments";
import DatabaseClientWindow from "./DatabaseClientWindow";
import MainWindow from "./MainWindow";

import "@fontsource/inter";
import { CircularProgress, CssVarsProvider, Sheet } from "@mui/joy";

interface AppInfo {
  windowType: WindowType;
}

declare global {
  interface Window {
    appInfo: AppInfo;
  }
}

const App: React.FC = () => {
  const [windowType, setWindowType] = useState<WindowType | null>(null);

  useEffect(() => {
    setWindowType(window.appInfo.windowType);
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
