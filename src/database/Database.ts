import { ConnectionInfo } from "../Types";

// For some reason this needs a require instead of an import.
// eslint-disable-next-line @typescript-eslint/no-var-requires
const knex = require("knex");

// This is an import to support types when instantiating from the require above.
import { Knex } from "knex";
import Queries from "./Queries";
import { dispatchEvent } from "../events/EventApi";
import {
  ColorChangedEvent,
  FollowerReadChangedEvent,
  SelectLatencyEvent,
  UpdateLatencyEvent,
} from "../events/CustomEvents";
import { measureTimeMillis } from "../Utils";

const DELAY_MS_BETWEEN_CALLS = 100;

class Database {
  readonly connectionInfo: ConnectionInfo;
  private started: boolean = false;
  private pollingFunction: NodeJS.Timeout | null = null;
  private readonly knex: Knex;
  isFollowerReadsEnabled: boolean;

  constructor(connectionInfo: ConnectionInfo) {
    this.connectionInfo = connectionInfo;
    this.knex = knex({
      client: "cockroachdb",
      connection: {
        host: connectionInfo.host,
        port: connectionInfo.port,
        user: "root",
        database: "defaultdb",
        ssl: false,
      },
    });
    this.setFollowerReadsMode(false);
  }

  setFollowerReadsMode(isEnabled: boolean) {
    this.isFollowerReadsEnabled = isEnabled;
    dispatchEvent(new FollowerReadChangedEvent(isEnabled));
  }

  async start() {
    this.started = true;
    this.runPollingTick();
  }

  private runPollingTick() {
    this.pollingFunction = setTimeout(
      this.pollingTick.bind(this),
      DELAY_MS_BETWEEN_CALLS,
    );
  }

  private async pollingTick() {
    if (this.started) {
      const [colorRow, millis] = await measureTimeMillis(async () => {
        return await Queries.getColorRow(
          this.knex,
          this.isFollowerReadsEnabled,
        );
      });
      dispatchEvent(new ColorChangedEvent(colorRow?.color));
      dispatchEvent(new SelectLatencyEvent(millis));
      this.runPollingTick();
    }
  }

  async stop() {
    this.started = false;
    clearTimeout(this.pollingFunction);
    await this.knex.destroy();
  }

  async updateColor(color: string) {
    const [, millis] = await measureTimeMillis(async () => {
      return await Queries.updateColor(this.knex, color);
    });
    dispatchEvent(new UpdateLatencyEvent(millis));
  }
}

export default Database;
