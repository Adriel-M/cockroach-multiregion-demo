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

export class UpdateLatencyEvent extends CustomEvent<number> {
  static channel = "update-latency";
  constructor(latency: number) {
    super(UpdateLatencyEvent.channel, { detail: latency });
  }
}

export class FollowerReadChangedEvent extends CustomEvent<boolean> {
  static channel = "follower-read-changed";
  constructor(followerRead: boolean) {
    super(FollowerReadChangedEvent.channel, { detail: followerRead });
  }
}

export class DatabaseInitializedEvent extends CustomEvent<boolean> {
  static channel = "database-initialized";
  constructor(databaseInitialized: boolean) {
    super(DatabaseInitializedEvent.channel, { detail: databaseInitialized });
  }
}
