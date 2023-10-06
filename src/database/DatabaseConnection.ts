import { ConnectionInfo } from "../Types";

// For some reason this needs a require instead of an import.
// eslint-disable-next-line @typescript-eslint/no-var-requires
const knex = require("knex");

// This is an import to support types when instantiating from the require above.
import { Knex } from "knex";

class DatabaseConnection {
  readonly connectionInfo: ConnectionInfo;
  started: boolean = false;
  readonly knex: Knex;

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
    this.started = true;
  }

  async stop() {
    this.started = false;
    await this.knex.destroy();
  }
}

export default DatabaseConnection;
