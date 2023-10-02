export enum WindowType {
    empty,
    Main,
    DatabaseClient,
}
export interface PreloadArguments {
    windowType: WindowType,
}
