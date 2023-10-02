// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron';
import {PreloadArguments} from "./Arguments";

interface PreloadArgs {
    receiveData: (func: (arg: PreloadArguments) => void) => void;
}

declare global {
    interface Window {
        preloadArgs: PreloadArgs,
    }
}

contextBridge.exposeInMainWorld('preloadArgs', {
    receiveData: (func: (arg: PreloadArguments) => void) => {
        ipcRenderer.on('preload-args', (event, arg) => func(arg));
    }
});
