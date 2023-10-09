import DatabaseConnection from "../database/DatabaseConnection";
import {
  ColorChangedEvent,
  FollowerReadChangedEvent,
  SelectLatencyEvent,
  UpdateLatencyEvent,
} from "../events/CustomEvents";
import { v4 as uuidv4 } from "uuid";
import { ConnectionInfo } from "../Types";
import { measureTimeMillis } from "../Utils";
import Queries from "../database/Queries";
import { dispatchEvent } from "../events/EventApi";
import { DemoTable } from "../database/DemoTable";

const DELAY_MS_BETWEEN_POLL = 100;

class DatabaseClientDatabaseManager {
  private databaseConnection: DatabaseConnection | null = null;
  private pollingFunctions: { [key: string]: NodeJS.Timeout } = {};
  isFollowerReadsEnabled: boolean = false;
  demoTable: DemoTable = DemoTable.ColorRegionalUsEast1;

  toggleFollowerReads() {
    this.isFollowerReadsEnabled = !this.isFollowerReadsEnabled;
    dispatchEvent(new FollowerReadChangedEvent(this.isFollowerReadsEnabled));
  }

  async setupAndStartDatabaseConnection(connectionInfo: ConnectionInfo) {
    await this.preSwitchConnection();
    this.databaseConnection = new DatabaseConnection(connectionInfo);
    dispatchEvent(new FollowerReadChangedEvent(this.isFollowerReadsEnabled));
  }

  private async preSwitchConnection() {
    for (const key in this.pollingFunctions) {
      clearTimeout(this.pollingFunctions[key]);
      delete this.pollingFunctions[key];
    }
    if (this.databaseConnection) {
      await this.databaseConnection.stop();
    }
  }

  private schedulePollingFunction(fn: () => Promise<void>, delayMs: number) {
    const key = uuidv4();
    const pollingTick = async () => {
      await fn();
      this.pollingFunctions[key] = setTimeout(pollingTick, delayMs);
    };
    this.pollingFunctions[key] = setTimeout(pollingTick, delayMs);
  }

  startColorPolling() {
    if (!this.databaseConnection.started) return;

    this.schedulePollingFunction(async () => {
      if (this.databaseConnection && this.databaseConnection.started) {
        const [colorRow, millis] = await measureTimeMillis(async () => {
          return await Queries.getColorRow(
            this.databaseConnection.knex,
            this.demoTable,
            this.isFollowerReadsEnabled,
          );
        });
        dispatchEvent(new ColorChangedEvent(colorRow?.color));
        dispatchEvent(new SelectLatencyEvent(millis));
      }
    }, DELAY_MS_BETWEEN_POLL);
  }

  async updateColor(color: string) {
    const [, millis] = await measureTimeMillis(async () => {
      return await Queries.updateColor(
        this.databaseConnection.knex,
        this.demoTable,
        color,
      );
    });
    dispatchEvent(new UpdateLatencyEvent(millis));
  }
}

export default new DatabaseClientDatabaseManager();
