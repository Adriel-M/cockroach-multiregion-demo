import React, {useEffect, useState} from "react";
import {PreloadArguments, WindowType} from "./Arguments";
import DatabaseClientWindow from "./DatabaseClientWindow";
import MainWindow from "./MainWindow";

import '@fontsource/inter';

const App: React.FC = () => {
    const [data, setData] = useState<PreloadArguments | null>(null);

    useEffect(() => {
        window.preloadArgs.receiveData((preloadArguments: PreloadArguments) => {
            setData(preloadArguments);
        });

        return () => {
            window.preloadArgs.receiveData(null);
        }
    }, []);

    // Setting up
    if (!data || !data.windowType) {
        return <h2>Loading...</h2>
    }

    // We're the root window
    if (data.windowType == WindowType.Main) {
        return <MainWindow />
    }

    // We are the DatabaseClientWindow
    return <DatabaseClientWindow />
}

export default App;
