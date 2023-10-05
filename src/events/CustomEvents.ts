export class ColorChangedEvent extends CustomEvent<string> {
  static channel = "color-changed";
  constructor(color: string) {
    super(ColorChangedEvent.channel, { detail: color });
  }
}

export class SelectLatencyEvent extends CustomEvent<number> {
  static channel = "select-latency";
  constructor(latency: number) {
    super(SelectLatencyEvent.channel, { detail: latency });
  }
}

export class FollowerReadChangedEvent extends CustomEvent<boolean> {
  static channel = "follower-read-changed";
  constructor(followerRead: boolean) {
    super(FollowerReadChangedEvent.channel, { detail: followerRead });
  }
}
