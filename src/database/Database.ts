import { ConnectionInfo } from "../Types";

// For some reason this needs a require instead of an import.
// eslint-disable-next-line @typescript-eslint/no-var-requires
const knex = require("knex");

// This is an import to support types when instantiating from the require above.
import { Knex } from "knex";

const DELAY_MS_BETWEEN_CALLS = 1000;

class Database {
  readonly connectionInfo: ConnectionInfo;
  private started: boolean = false;
  private pollingFunction: NodeJS.Timeout | null = null;
  private knex: Knex;

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
      const test = await this.knex("color").first();
      console.log(test);
      this.runPollingTick();
    }
  }

  async stop() {
    this.started = false;
    clearTimeout(this.pollingFunction);
  }
}

export default Database;
