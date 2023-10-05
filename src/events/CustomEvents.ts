export class ColorChangedEvent extends CustomEvent<string> {
  static channel = "color-changed";
  constructor(color: string) {
    super(ColorChangedEvent.channel, { detail: color });
  }
}
